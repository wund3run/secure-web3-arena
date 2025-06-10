
interface ColorContrastResult {
  ratio: number;
  level: 'AAA' | 'AA' | 'Fail';
  passes: {
    normal: boolean;
    large: boolean;
  };
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export class ColorContrastTester {
  private static instance: ColorContrastTester;

  static getInstance(): ColorContrastTester {
    if (!ColorContrastTester.instance) {
      ColorContrastTester.instance = new ColorContrastTester();
    }
    return ColorContrastTester.instance;
  }

  // Convert hex color to RGB
  private hexToRgb(hex: string): RGBColor | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Convert RGB to relative luminance
  private getLuminance(rgb: RGBColor): number {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Calculate contrast ratio between two colors
  calculateContrastRatio(color1: string, color2: string): ColorContrastResult {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    if (!rgb1 || !rgb2) {
      return {
        ratio: 0,
        level: 'Fail',
        passes: { normal: false, large: false }
      };
    }

    const lum1 = this.getLuminance(rgb1);
    const lum2 = this.getLuminance(rgb2);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);

    return {
      ratio: Math.round(ratio * 100) / 100,
      level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail',
      passes: {
        normal: ratio >= 4.5,
        large: ratio >= 3
      }
    };
  }

  // Test all text elements on the page
  testPageContrast(): Array<{
    element: HTMLElement;
    foreground: string;
    background: string;
    contrast: ColorContrastResult;
    selector: string;
  }> {
    const results: Array<{
      element: HTMLElement;
      foreground: string;
      background: string;
      contrast: ColorContrastResult;
      selector: string;
    }> = [];

    const textElements = document.querySelectorAll('*');
    
    textElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      
      // Skip elements with no text content
      if (!htmlElement.textContent?.trim()) return;
      
      const styles = window.getComputedStyle(htmlElement);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Convert to hex if possible for testing
      const foregroundHex = this.rgbToHex(color);
      const backgroundHex = this.rgbToHex(backgroundColor);
      
      if (foregroundHex && backgroundHex && foregroundHex !== backgroundHex) {
        const contrast = this.calculateContrastRatio(foregroundHex, backgroundHex);
        
        if (!contrast.passes.normal) {
          results.push({
            element: htmlElement,
            foreground: foregroundHex,
            background: backgroundHex,
            contrast,
            selector: this.getElementSelector(htmlElement)
          });
        }
      }
    });

    return results;
  }

  private rgbToHex(rgb: string): string | null {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return null;
    
    const [, r, g, b] = match;
    return '#' + [r, g, b].map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  private getElementSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }
}

export const colorContrastTester = ColorContrastTester.getInstance();
