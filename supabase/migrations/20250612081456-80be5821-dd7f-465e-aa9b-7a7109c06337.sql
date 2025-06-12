
-- Create profiles table for better user metadata management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to call the function on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Advanced search database function (RPC)
CREATE OR REPLACE FUNCTION advanced_search(
    search_term TEXT DEFAULT NULL,
    filter_types TEXT[] DEFAULT '{}', -- e.g., '{"article", "tutorial"}'
    filter_tags TEXT[] DEFAULT '{}',
    filter_category TEXT DEFAULT NULL,
    sort_by TEXT DEFAULT 'relevance', -- 'relevance', 'newest', 'rating'
    page_num INT DEFAULT 1,
    page_size INT DEFAULT 20
)
RETURNS TABLE (
    id UUID,
    type TEXT,
    title TEXT,
    slug TEXT,
    excerpt TEXT,
    tags TEXT[],
    author_id UUID,
    author_name TEXT,
    author_avatar_url TEXT,
    relevance_score REAL,
    rating_average DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE,
    total_count BIGINT
)
AS $$
DECLARE
    query_vector tsquery;
    term_with_prefs TEXT;
BEGIN
    -- Handle empty or null search terms
    IF search_term IS NULL OR trim(search_term) = '' THEN
        query_vector := NULL;
    ELSE
        -- Enhance the search term with tags for intelligent matching
        term_with_prefs := search_term || CASE 
            WHEN array_length(filter_tags, 1) > 0 
            THEN ' ' || array_to_string(filter_tags, ' | ')
            ELSE ''
        END;
        query_vector := websearch_to_tsquery('english', term_with_prefs);
    END IF;

    RETURN QUERY
    WITH search_results AS (
        -- Search Knowledge Base
        SELECT
            kb.id,
            'article' AS type,
            kb.title,
            kb.slug,
            kb.excerpt,
            kb.tags,
            kb.author_id,
            COALESCE(p.full_name, 'Unknown Author') AS author_name,
            p.avatar_url AS author_avatar_url,
            CASE 
                WHEN query_vector IS NULL THEN 0.5
                ELSE ts_rank(to_tsvector('english', kb.title || ' ' || kb.content || ' ' || COALESCE(kb.excerpt, '')), query_vector)
            END AS relevance_score,
            NULL::DECIMAL AS rating_average,
            kb.created_at
        FROM public.knowledge_base_articles kb
        LEFT JOIN public.profiles p ON kb.author_id = p.id
        WHERE kb.deleted_at IS NULL AND kb.status = 'published'
          AND (query_vector IS NULL OR query_vector @@ to_tsvector('english', kb.title || ' ' || kb.content || ' ' || COALESCE(kb.excerpt, '')))

        UNION ALL

        -- Search Tutorials
        SELECT
            t.id,
            'tutorial' AS type,
            t.title,
            t.slug,
            t.description AS excerpt,
            t.tags,
            t.author_id,
            COALESCE(p.full_name, 'Unknown Author') AS author_name,
            p.avatar_url AS author_avatar_url,
            CASE 
                WHEN query_vector IS NULL THEN 0.5
                ELSE ts_rank(to_tsvector('english', t.title || ' ' || t.description || ' ' || t.content), query_vector)
            END AS relevance_score,
            t.rating_average,
            t.created_at
        FROM public.tutorials t
        LEFT JOIN public.profiles p ON t.author_id = p.id
        WHERE t.deleted_at IS NULL
          AND (query_vector IS NULL OR query_vector @@ to_tsvector('english', t.title || ' ' || t.description || ' ' || t.content))

        UNION ALL

        -- Search Forum Topics
        SELECT
            ft.id,
            'topic' AS type,
            ft.title,
            ft.slug,
            left(ft.content, 250) AS excerpt,
            '{}'::text[] AS tags,
            ft.author_id,
            COALESCE(p.full_name, 'Unknown Author') AS author_name,
            p.avatar_url AS author_avatar_url,
            CASE 
                WHEN query_vector IS NULL THEN 0.5
                ELSE ts_rank(to_tsvector('english', ft.title || ' ' || ft.content), query_vector)
            END AS relevance_score,
            NULL::DECIMAL AS rating_average,
            ft.created_at
        FROM public.forum_topics ft
        LEFT JOIN public.profiles p ON ft.author_id = p.id
        WHERE ft.deleted_at IS NULL
          AND (query_vector IS NULL OR query_vector @@ to_tsvector('english', ft.title || ' ' || ft.content))
    ),
    filtered_results AS (
      SELECT *, COUNT(*) OVER() as total_count
      FROM search_results
      WHERE
        -- Filter by type (e.g., only 'article', 'tutorial')
        (array_length(filter_types, 1) IS NULL OR type = ANY(filter_types))
        AND
        -- Filter by category (applies to tutorials and articles)
        (filter_category IS NULL OR 
            (type = 'article' AND EXISTS (SELECT 1 FROM knowledge_base_articles kb WHERE kb.id = search_results.id AND kb.category = filter_category)) OR
            (type = 'tutorial' AND EXISTS (SELECT 1 FROM tutorials t WHERE t.id = search_results.id AND t.category = filter_category)) OR
            (type = 'topic' AND EXISTS (SELECT 1 FROM forum_topics ft JOIN forum_categories fc on ft.category_id = fc.id WHERE ft.id = search_results.id AND fc.slug = filter_category))
        )
        AND
        -- Filter by tags (intelligent matching)
        (array_length(filter_tags, 1) IS NULL OR tags && filter_tags)
    )
    SELECT * FROM filtered_results
    ORDER BY
        CASE WHEN sort_by = 'relevance' THEN relevance_score END DESC,
        CASE WHEN sort_by = 'newest' THEN created_at END DESC,
        CASE WHEN sort_by = 'rating' THEN rating_average END DESC NULLS LAST,
        created_at DESC -- Default secondary sort
    LIMIT page_size
    OFFSET (page_num - 1) * page_size;

END;
$$ LANGUAGE plpgsql;

-- Create missing content tables if they don't exist
CREATE TABLE IF NOT EXISTS public.knowledge_base_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    author_id UUID REFERENCES auth.users NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for knowledge base articles
ALTER TABLE public.knowledge_base_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for knowledge base articles
CREATE POLICY "Anyone can view published articles" ON public.knowledge_base_articles 
FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Authors can manage their own articles" ON public.knowledge_base_articles 
FOR ALL USING (auth.uid() = author_id);
