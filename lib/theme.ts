export const theme = {
  colors: {
    primary: {
      50: '#FDF6F0',
      100: '#FAE8D8',
      200: '#F5CDB0',
      300: '#EDAE82',
      400: '#E8954E',
      500: '#D4834A',
      600: '#B86E3C',
      700: '#995A32',
      800: '#7A4828',
      900: '#5C3620',
    },
    dark: {
      bg: '#1e1e1e',
      bgSecondary: '#252525',
      bgCard: '#2a2a2a',
      bgMuted: '#333333',
      border: '#3a3a3a',
      borderLight: '#4a4a4a',
      text: '#f5f5f5',
      textSecondary: '#b0b0b0',
      textMuted: '#808080',
    },
    light: {
      bg: '#ffffff',
      bgSecondary: '#f9fafb',
      bgCard: '#ffffff',
      bgMuted: '#f3f4f6',
      border: '#e5e7eb',
      borderLight: '#d1d5db',
      text: '#111827',
      textSecondary: '#4b5563',
      textMuted: '#9ca3af',
    },
  },
} as const;

export type Theme = typeof theme;
export type ThemeMode = 'dark' | 'light';
