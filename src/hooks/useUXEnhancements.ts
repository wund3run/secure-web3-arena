import { useState, useEffect } from 'react';
import { wcagValidator, WCAGViolation } from '@/utils/accessibility/wcag-validator';
import { themeSystem } from '@/utils/theme/advanced-theme-system';
import { i18nSystem, useTranslation } from '@/utils/i18n/internationalization-system';
import { realtimeChat, ChatMessage } from '@/utils/realtime/realtime-chat-system';

interface UXEnhancementsState {
  accessibility: {
    violations: WCAGViolation[];
    isValidating: boolean;
    lastValidation: Date | null;
  };
  theme: {
    currentTheme: string;
    availableThemes: string[];
    isDarkMode: boolean;
  };
  i18n: {
    currentLocale: string;
    availableLocales: unknown[];
  };
  chat: {
    isConnected: boolean;
    currentRoom: string;
    typingUsers: string[];
    connectionState: string;
  };
}

export function useUXEnhancements() {
  const [state, setState] = useState<UXEnhancementsState>({
    accessibility: {
      violations: [],
      isValidating: false,
      lastValidation: null
    },
    theme: {
      currentTheme: themeSystem.getCurrentTheme(),
      availableThemes: themeSystem.getAvailableThemes(),
      isDarkMode: false
    },
    i18n: {
      currentLocale: i18nSystem.getCurrentLocale(),
      availableLocales: i18nSystem.getAvailableLocales()
    },
    chat: {
      isConnected: false,
      currentRoom: '',
      typingUsers: [],
      connectionState: 'disconnected'
    }
  });

  const { t, setLocale } = useTranslation();

  // Accessibility functions
  const validateAccessibility = async () => {
    setState(prev => ({
      ...prev,
      accessibility: { ...prev.accessibility, isValidating: true }
    }));

    try {
      const violations = await wcagValidator.validatePage();
      setState(prev => ({
        ...prev,
        accessibility: {
          violations,
          isValidating: false,
          lastValidation: new Date()
        }
      }));
    } catch (error: unknown) {
      console.error('Accessibility validation failed:', error);
      setState(prev => ({
        ...prev,
        accessibility: { ...prev.accessibility, isValidating: false }
      }));
    }
  };

  const generateAccessibilityReport = () => {
    return wcagValidator.generateReport();
  };

  // Theme functions
  const applyTheme = (themeName: string, mode: 'light' | 'dark' = 'dark') => {
    themeSystem.applyTheme(themeName, mode);
    setState(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        currentTheme: themeName,
        isDarkMode: mode === 'dark'
      }
    }));
  };

  const toggleDarkMode = () => {
    const newMode = state.theme.isDarkMode ? 'light' : 'dark';
    applyTheme(state.theme.currentTheme, newMode);
  };

  // Internationalization functions
  const changeLocale = (locale: string) => {
    setLocale(locale);
    setState(prev => ({
      ...prev,
      i18n: { ...prev.i18n, currentLocale: locale }
    }));
  };

  const translateText = async (text: string, targetLocale: string) => {
    return await i18nSystem.translateText(text, targetLocale);
  };

  // Chat functions
  const connectChat = async (userId: string, authToken: string) => {
    const connected = await realtimeChat.connect(userId, authToken);
    setState(prev => ({
      ...prev,
      chat: {
        ...prev.chat,
        isConnected: connected,
        connectionState: realtimeChat.getConnectionState()
      }
    }));
    return connected;
  };

  const joinChatRoom = (roomId: string) => {
    realtimeChat.joinRoom(roomId);
    setState(prev => ({
      ...prev,
      chat: { ...prev.chat, currentRoom: roomId }
    }));
  };

  const sendChatMessage = (content: string) => {
    return realtimeChat.sendMessage(content);
  };

  // Event listeners
  useEffect(() => {
    // Chat event listeners
    const handleChatConnected = () => {
      setState(prev => ({
        ...prev,
        chat: { ...prev.chat, isConnected: true, connectionState: 'connected' }
      }));
    };

    const handleChatDisconnected = () => {
      setState(prev => ({
        ...prev,
        chat: { ...prev.chat, isConnected: false, connectionState: 'disconnected' }
      }));
    };

    const handleTypingChanged = (typingUsers: string[]) => {
      setState(prev => ({
        ...prev,
        chat: { ...prev.chat, typingUsers }
      }));
    };

    realtimeChat.on('connected', handleChatConnected);
    realtimeChat.on('disconnected', handleChatDisconnected);
    realtimeChat.on('typingChanged', handleTypingChanged);

    // Locale change listener
    const handleLocaleChange = (event: CustomEvent) => {
      setState(prev => ({
        ...prev,
        i18n: { ...prev.i18n, currentLocale: event.detail.locale }
      }));
    };

    window.addEventListener('localechange', handleLocaleChange as EventListener);

    return () => {
      realtimeChat.off('connected', handleChatConnected);
      realtimeChat.off('disconnected', handleChatDisconnected);
      realtimeChat.off('typingChanged', handleTypingChanged);
      window.removeEventListener('localechange', handleLocaleChange as EventListener);
    };
  }, [realtimeChat, setState]);

  // Auto-validate accessibility on page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      validateAccessibility();
    }, 2000);

    return () => clearTimeout(timer);
  }, [validateAccessibility]);

  return {
    // State
    ...state,
    
    // Accessibility
    validateAccessibility,
    generateAccessibilityReport,
    
    // Theme
    applyTheme,
    toggleDarkMode,
    
    // i18n
    changeLocale,
    translateText,
    t,
    
    // Chat
    connectChat,
    joinChatRoom,
    sendChatMessage,
    
    // Utils
    formatDate: i18nSystem.formatDate.bind(i18nSystem),
    formatNumber: i18nSystem.formatNumber.bind(i18nSystem),
    formatCurrency: i18nSystem.formatCurrency.bind(i18nSystem)
  };
}
