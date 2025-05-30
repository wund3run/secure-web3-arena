
import { useNavigate, useLocation } from 'react-router-dom';

export const useSafeRouter = () => {
  try {
    const navigate = useNavigate();
    const location = useLocation();
    
    return {
      navigate,
      location,
      isAvailable: true,
      safeNavigate: (path: string) => navigate(path)
    };
  } catch (error) {
    console.warn('Router context not available, falling back to window navigation');
    
    return {
      navigate: null,
      location: null,
      isAvailable: false,
      safeNavigate: (path: string) => {
        window.location.href = path;
      }
    };
  }
};
