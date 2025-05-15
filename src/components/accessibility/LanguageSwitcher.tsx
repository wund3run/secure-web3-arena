
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
];

interface LanguageSwitcherProps {
  variant?: "minimal" | "standard" | "full";
  align?: "start" | "center" | "end";
  onLanguageChange?: (language: Language) => void;
}

export function LanguageSwitcher({ 
  variant = "standard", 
  align = "end",
  onLanguageChange 
}: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  
  // In a real implementation, this would retrieve the language from a context or local storage
  useEffect(() => {
    const savedLanguageCode = localStorage.getItem("hawkly-language") || "en";
    const savedLanguage = languages.find(lang => lang.code === savedLanguageCode);
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);
  
  const handleLanguageSelect = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem("hawkly-language", language.code);
    
    if (onLanguageChange) {
      onLanguageChange(language);
    }
    
    // In a real implementation, this would update an i18n context/provider
  };
  
  // Render different variants based on the variant prop
  const renderTrigger = () => {
    switch(variant) {
      case "minimal":
        return (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Globe className="h-4 w-4" />
          </Button>
        );
      case "full":
        return (
          <Button variant="outline" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {currentLanguage.flag} {currentLanguage.name}
          </Button>
        );
      case "standard":
      default:
        return (
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Globe className="h-4 w-4 mr-2" />
            {currentLanguage.code.toUpperCase()}
          </Button>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {renderTrigger()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleLanguageSelect(language)}
          >
            <div className="flex items-center gap-2">
              <span className="text-base mr-1">{language.flag}</span>
              <span>{language.name}</span>
              <span className="text-muted-foreground text-xs">
                ({language.nativeName})
              </span>
            </div>
            {currentLanguage.code === language.code && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
