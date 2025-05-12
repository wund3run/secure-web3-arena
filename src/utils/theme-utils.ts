
import { useTheme } from "@/contexts/ThemeContext";

export function useThemeValue<T>(lightValue: T, darkValue: T): T {
  const { theme } = useTheme();
  return theme === "light" ? lightValue : darkValue;
}

export function getThemeValue<T>(theme: string, lightValue: T, darkValue: T): T {
  return theme === "light" ? lightValue : darkValue;
}
