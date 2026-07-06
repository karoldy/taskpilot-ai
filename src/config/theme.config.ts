import { createTheme } from '@mui/material/styles';
import { type ThemeOptions } from '@mui/material/styles';
import tokens from '@/tokens/base';

export const muiThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1560,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      dark: tokens.colorCtaBlue60,
      main: tokens.colorCtaBlue60,
      light: tokens.colorCtaBlue60,
      contrastText: tokens.colorNeutralWhite100,
    },
    secondary: {
      dark: tokens.colorBrandBlue70,
      main: tokens.colorBrandBlue60,
      light: tokens.colorBrandBlue50,
      contrastText: tokens.colorNeutralWhite100,
    },
    error: {
      dark: tokens.colorErrorRed80,
      main: tokens.colorErrorRed60,
      light: tokens.colorErrorRed50,
      contrastText: tokens.colorNeutralWhite100,
    },
    warning: {
      dark: tokens.colorWarningYellow70,
      main: tokens.colorWarningYellow60,
      light: tokens.colorWarningYellow50,
      contrastText: tokens.colorGrey100,
    },
    info: {
      dark: tokens.colorBrandWisdomBlue70,
      main: tokens.colorBrandWisdomBlue60,
      light: tokens.colorBrandWisdomBlue50,
      contrastText: tokens.colorNeutralWhite100,
    },
    success: {
      dark: tokens.colorSuccessGreen70,
      main: tokens.colorSuccessGreen60,
      light: tokens.colorSuccessGreen50,
      contrastText: tokens.colorNeutralWhite100,
    },
    // text: {
    //   primary: tokens.colorTextPrimary,
    //   secondary: tokens.colorTextSecondary,
    //   description: tokens.colorTextDescription,
    //   placeholder: tokens.colorTextPlaceholder,
    //   disabled: tokens.colorTextDisabled,
    //   onColor: tokens.colorTextOnColor,
    //   highlight: tokens.colorTextHighlight,
    //   highlightHover: tokens.colorTextHighlightHover,
    //   highlightPressed: tokens.colorTextHighlightPressed,
    //   visitedLink: tokens.colorTextVisitedLink,
    //   button: tokens.colorTextButton,
    //   buttonHover: tokens.colorTextButtonHover,
    //   buttonPressed: tokens.colorTextButtonPressed,
    //   error: tokens.colorTextError,
    //   errorHover: tokens.colorTextErrorHover,
    //   errorPressed: tokens.colorTextErrorPressed,
    // },
    // background: {
    //   primary: tokens.colorBackgroundComponentPrimary,
    //   disabled: tokens.colorBackgroundComponentDisabled,
    //   highlight: tokens.colorBackgroundComponentHighlight,
    //   semanticInfo: tokens.colorBackgroundComponentSemanticInfo,
    // },
  },
  // typography: {
  //   fontFamily: tokens.fontFamilyBody,
  //   heading1: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "2.25rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   heading2: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "2rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   subtitle1: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.75rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   subtitle2: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.5rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   subtitle3: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.25rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   body1: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.125rem",
  //     fontWeight: tokens.fontWeightRegular,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   body1Highlight: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.125rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   body2: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1rem",
  //     fontWeight: tokens.fontWeightRegular,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   body2Highlight: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   body3: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "0.875rem",
  //     fontWeight: tokens.fontWeightRegular,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   body3Highlight: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "0.875rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   ctaButton1: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.125rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   ctaButton2: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   ctaIconButton: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.125rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   ctaLink: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.125rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   tabHighlight: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.25rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   tabDefault: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.125rem",
  //     fontWeight: tokens.fontWeightRegular,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   inputFieldTitle: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1rem",
  //     fontWeight: tokens.fontWeightRegular,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   inputFieldPlaceholder: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.125rem",
  //     fontWeight: tokens.fontWeightRegular,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   label1: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1.125rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   label2: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1rem",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   label3: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "1rem",
  //     fontWeight: tokens.fontWeightRegular,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  //   searchHighlight: {
  //     fontFamily: tokens.fontFamilyBody,
  //     fontSize: "inherit",
  //     fontWeight: tokens.fontWeightSemibold,
  //     lineHeight: tokens.lineHeight120,
  //     letterSpacing: 0,
  //   },
  // },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: {
  //       body: {
  //         height: "100dvh",
  //         backgroundColor: tokens.colorBackgroundPagePrimary,
  //       },
  //     },
  //   },
  //   MuiTypography: {
  //     defaultProps: {
  //       variantMapping: {
  //         heading1: "h1",
  //         heading2: "h2",
  //         body1: "span",
  //         body2: "span",
  //         inputFieldTitle: "label",
  //       },
  //     },
  //   },
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: "none",
  //       },
  //     },
  //   },
  //   MuiInputBase: {
  //     styleOverrides: {
  //       input: {
  //         padding: "12px 0",
  //         fontSize: "1.125rem",
  //         "&::placeholder": {
  //           color: tokens.colorTextPlaceholder,
  //           fontSize: "1.125rem",
  //           fontFamily: tokens.fontFamilyBody,
  //           fontWeight: tokens.fontWeightRegular,
  //           opacity: 1,
  //         },
  //       },
  //     },
  //   },
  //   MuiDialog: {
  //     styleOverrides: {
  //       root: {
  //         "& .MuiDialog-paper": {
  //           borderRadius: "16px",
  //         },
  //       },
  //     },
  //   },
  //   MuiDialogTitle: {
  //     styleOverrides: {
  //       root: {
  //         fontFamily: tokens.fontFamilyBody,
  //         fontSize: "2.25rem",
  //         fontWeight: tokens.fontWeightSemibold,
  //         lineHeight: tokens.lineHeight120,
  //       },
  //     },
  //   },
  //   MuiMenuItem: {
  //     styleOverrides: {
  //       root: {
  //         maxWidth: "500px",
  //         overflow: "hidden",
  //         textOverflow: "ellipsis",
  //       },
  //     },
  //   },
  // },
};

export default createTheme(muiThemeOptions);
