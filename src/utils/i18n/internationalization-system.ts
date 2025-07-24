
export interface LocaleData {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  numberFormat: {
    decimal: string;
    thousands: string;
    currency: string;
  };
}

export interface TranslationData {
  [key: string]: string | TranslationData;
}

export class InternationalizationSystem {
  private static instance: InternationalizationSystem;
  private currentLocale: string = 'en';
  private fallbackLocale: string = 'en';
  private translations: Map<string, TranslationData> = new Map();
  private locales: Map<string, LocaleData> = new Map();

  static getInstance(): InternationalizationSystem {
    if (!InternationalizationSystem.instance) {
      InternationalizationSystem.instance = new InternationalizationSystem();
    }
    return InternationalizationSystem.instance;
  }

  constructor() {
    this.initializeLocales();
    this.loadStoredLocale();
  }

  private initializeLocales() {
    const supportedLocales: LocaleData[] = [
      {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        direction: 'ltr',
        dateFormat: 'MM/dd/yyyy',
        numberFormat: { decimal: '.', thousands: ',', currency: '$' }
      },
      {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        direction: 'ltr',
        dateFormat: 'dd/MM/yyyy',
        numberFormat: { decimal: ',', thousands: '.', currency: '€' }
      },
      {
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        direction: 'ltr',
        dateFormat: 'dd/MM/yyyy',
        numberFormat: { decimal: ',', thousands: ' ', currency: '€' }
      },
      {
        code: 'de',
        name: 'German',
        nativeName: 'Deutsch',
        direction: 'ltr',
        dateFormat: 'dd.MM.yyyy',
        numberFormat: { decimal: ',', thousands: '.', currency: '€' }
      },
      {
        code: 'ja',
        name: 'Japanese',
        nativeName: '日本語',
        direction: 'ltr',
        dateFormat: 'yyyy/MM/dd',
        numberFormat: { decimal: '.', thousands: ',', currency: '¥' }
      },
      {
        code: 'ar',
        name: 'Arabic',
        nativeName: 'العربية',
        direction: 'rtl',
        dateFormat: 'dd/MM/yyyy',
        numberFormat: { decimal: '.', thousands: ',', currency: '$' }
      }
    ];

    supportedLocales.forEach(locale => {
      this.locales.set(locale.code, locale);
    });

    // Load default English translations
    this.loadTranslations('en', {
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort'
      },
      nav: {
        home: 'Home',
        dashboard: 'Dashboard',
        marketplace: 'Marketplace',
        audits: 'Audits',
        profile: 'Profile',
        settings: 'Settings',
        signIn: 'Sign In',
        signOut: 'Sign Out',
        signUp: 'Sign Up'
      },
      audit: {
        request: 'Request Audit',
        status: 'Status',
        progress: 'Progress',
        findings: 'Findings',
        report: 'Report',
        completed: 'Completed',
        inProgress: 'In Progress',
        pending: 'Pending',
        failed: 'Failed'
      },
      security: {
        vulnerability: 'Vulnerability',
        critical: 'Critical',
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        fixed: 'Fixed',
        open: 'Open'
      },
      forms: {
        required: 'This field is required',
        invalid: 'Invalid format',
        email: 'Email address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        website: 'Website'
      }
    });
  }

  async loadTranslations(locale: string, translations: TranslationData) {
    this.translations.set(locale, translations);
  }

  async loadTranslationsFromFile(locale: string, file: string) {
    try {
      const response = await fetch(`/locales/${locale}/${file}.json`);
      const translations = await response.json();
      this.loadTranslations(locale, translations);
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
    }
  }

  setLocale(locale: string) {
    if (this.locales.has(locale)) {
      this.currentLocale = locale;
      this.updateDocumentDirection();
      this.saveLocalePreference();
      
      // Trigger locale change event
      window.dispatchEvent(new CustomEvent('localechange', { detail: { locale } }));
    }
  }

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  getAvailableLocales(): LocaleData[] {
    return Array.from(this.locales.values());
  }

  translate(key: string, params?: Record<string, string | number>): string {
    let translation = this.getTranslation(key, this.currentLocale);
    
    // Fallback to default locale
    if (!translation && this.currentLocale !== this.fallbackLocale) {
      translation = this.getTranslation(key, this.fallbackLocale);
    }
    
    // Final fallback to key itself
    if (!translation) {
      translation = key;
    }

    // Replace parameters
    if (params && typeof translation === 'string') {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, String(value));
      });
    }

    return translation;
  }

  private getTranslation(key: string, locale: string): string {
    const translations = this.translations.get(locale);
    if (!translations) return '';

    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return typeof value === 'string' ? value : '';
  }

  formatDate(date: Date, locale?: string): string {
    const targetLocale = locale || this.currentLocale;
    const localeData = this.locales.get(targetLocale);
    
    if (!localeData) return date.toLocaleDateString();

    return new Intl.DateTimeFormat(targetLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  }

  formatNumber(number: number, locale?: string): string {
    const targetLocale = locale || this.currentLocale;
    return new Intl.NumberFormat(targetLocale).format(number);
  }

  formatCurrency(amount: number, locale?: string): string {
    const targetLocale = locale || this.currentLocale;
    const localeData = this.locales.get(targetLocale);
    
    return new Intl.NumberFormat(targetLocale, {
      style: 'currency',
      currency: localeData?.numberFormat.currency === '$' ? 'USD' : 'EUR'
    }).format(amount);
  }

  async translateText(text: string, targetLocale: string): Promise<string> {
    // AI-powered translation using DeepL API
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          target_lang: targetLocale.toUpperCase(),
          source_lang: 'AUTO'
        })
      });

      const result = await response.json();
      return result.translations?.[0]?.text || text;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    }
  }

  async generateTranslations(baseLocale: string, targetLocales: string[]) {
    const baseTranslations = this.translations.get(baseLocale);
    if (!baseTranslations) return;

    for (const locale of targetLocales) {
      const translated = await this.translateObject(baseTranslations, locale);
      this.loadTranslations(locale, translated);
    }
  }

  private async translateObject(obj: TranslationData, targetLocale: string): Promise<TranslationData> {
    const result: TranslationData = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = await this.translateText(value, targetLocale);
      } else if (typeof value === 'object' && value !== null) {
        result[key] = await this.translateObject(value, targetLocale);
      }
    }

    return result;
  }

  private updateDocumentDirection() {
    const locale = this.locales.get(this.currentLocale);
    if (locale) {
      document.documentElement.dir = locale.direction;
      document.documentElement.lang = locale.code;
    }
  }

  private loadStoredLocale() {
    try {
      const stored = localStorage.getItem('hawkly-locale');
      if (stored && this.locales.has(stored)) {
        this.setLocale(stored);
      } else {
        // Detect browser locale
        const browserLocale = navigator.language.split('-')[0];
        if (this.locales.has(browserLocale)) {
          this.setLocale(browserLocale);
        }
      }
    } catch (error) {
      console.warn('Failed to load locale preference:', error);
    }
  }

  private saveLocalePreference() {
    try {
      localStorage.setItem('hawkly-locale', this.currentLocale);
    } catch (error) {
      console.warn('Failed to save locale preference:', error);
    }
  }

  exportTranslations(locale: string): string {
    const translations = this.translations.get(locale);
    return translations ? JSON.stringify(translations, null, 2) : '';
  }

  importTranslations(locale: string, translationsJson: string): boolean {
    try {
      const translations = JSON.parse(translationsJson);
      this.loadTranslations(locale, translations);
      return true;
    } catch (error) {
      console.error('Failed to import translations:', error);
      return false;
    }
  }
}

export const i18nSystem = InternationalizationSystem.getInstance();

// React hook for translations
export function useTranslation() {
  const t = (key: string, params?: Record<string, string | number>) => {
    return i18nSystem.translate(key, params);
  };

  const formatDate = (date: Date) => i18nSystem.formatDate(date);
  const formatNumber = (number: number) => i18nSystem.formatNumber(number);
  const formatCurrency = (amount: number) => i18nSystem.formatCurrency(amount);

  return {
    t,
    formatDate,
    formatNumber,
    formatCurrency,
    currentLocale: i18nSystem.getCurrentLocale(),
    availableLocales: i18nSystem.getAvailableLocales(),
    setLocale: i18nSystem.setLocale.bind(i18nSystem)
  };
}
