export const colors = {
  // Backgrounds
  background: "#212121",
  surface: "#2F2F2F",
  surfaceElevated: "#343434",
  sidebar: "#171717",

  // Borders
  border: "#424242",

  // Text
  textPrimary: "#ECECEC",
  textSecondary: "#AFAFAF",
  textMuted: "#8E8E8E",

  // Core
  white: "#FFFFFF",
  black: "#000000",

  // Accent
  accent: "#10A37F",
  accentDark: "#0D8A6A",
  accentSoft: "rgba(16, 163, 127, 0.15)",

  // Semantic
  success: "#10A37F",
  successBg: "rgba(16, 163, 127, 0.12)",
  warning: "#EAB308",
  warningBg: "rgba(234, 179, 8, 0.12)",
  error: "#EF4444",
  errorBg: "rgba(239, 68, 68, 0.12)",
  info: "#3B82F6",
  infoBg: "rgba(59, 130, 246, 0.12)",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const typography = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
  },
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700" as const,
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600" as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400" as const,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400" as const,
    color: colors.textMuted,
  },
  code: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Courier",
  },
} as const;
