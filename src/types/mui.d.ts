import type {} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }

  interface TypeText {
    description?: string;
    placeholder?: string;
    onColor?: string;
    highlight?: string;
    highlightHover?: string;
    highlightPressed?: string;
    visitedLink?: string;
    button?: string;
    buttonHover?: string;
    buttonPressed?: string;
    error?: string;
    errorHover?: string;
    errorPressed?: string;
  }

  interface TypeBackground {
    primary?: string;
    disabled?: string;
    highlight?: string;
    semanticInfo?: string;
  }

  interface Palette {
    neutral?: {
      black: string;
      white: string;
      transparent: string;
    };
  }

  interface PaletteOptions {
    neutral?: {
      black?: string;
      white?: string;
      transparent?: string;
    };
  }

  interface TypographyVariants {
    heading1: React.CSSProperties;
    heading2: React.CSSProperties;
    subtitle3: React.CSSProperties;
    body1Highlight: React.CSSProperties;
    body2Highlight: React.CSSProperties;
    body3: React.CSSProperties;
    body3Highlight: React.CSSProperties;
    ctaButton1: React.CSSProperties;
    ctaButton2: React.CSSProperties;
    ctaIconButton: React.CSSProperties;
    ctaLink: React.CSSProperties;
    tabDefault: React.CSSProperties;
    tabHighlight: React.CSSProperties;
    inputFieldTitle: React.CSSProperties;
    inputFieldPlaceholder: React.CSSProperties;
    label1: React.CSSProperties;
    label2: React.CSSProperties;
    label3: React.CSSProperties;
    searchHighlight: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    heading1?: React.CSSProperties;
    heading2?: React.CSSProperties;
    subtitle3?: React.CSSProperties;
    body1Highlight?: React.CSSProperties;
    body2Highlight?: React.CSSProperties;
    body3?: React.CSSProperties;
    body3Highlight?: React.CSSProperties;
    ctaButton1?: React.CSSProperties;
    ctaButton2?: React.CSSProperties;
    ctaIconButton?: React.CSSProperties;
    ctaLink?: React.CSSProperties;
    tabDefault?: React.CSSProperties;
    tabHighlight?: React.CSSProperties;
    inputFieldTitle?: React.CSSProperties;
    inputFieldPlaceholder?: React.CSSProperties;
    label1?: React.CSSProperties;
    label2?: React.CSSProperties;
    label3?: React.CSSProperties;
    searchHighlight?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heading1: true;
    heading2: true;
    subtitle3: true;
    body1Highlight: true;
    body2Highlight: true;
    body3: true;
    body3Highlight: true;
    ctaButton1: true;
    ctaButton2: true;
    ctaIconButton: true;
    ctaLink: true;
    tabDefault: true;
    tabHighlight: true;
    inputFieldTitle: true;
    inputFieldPlaceholder: true;
    label1: true;
    label2: true;
    label3: true;
    searchHighlight: true;
  }
}
