import tokens from '@/tokens/base';

export const ButtonStyles = {
  padding: {
    normal: `${tokens.spaceComponentButtonPaddingYS} ${tokens.spaceComponentButtonPaddingXS}`,
    large: `${tokens.spaceComponentButtonPaddingYM} ${tokens.spaceComponentButtonPaddingXM}`,
  },
  contained: {
    background: {
      active: tokens.colorFilledPrimaryPressed,
      primary: tokens.colorFilledPrimaryEnabled,
      default: tokens.colorFilledPrimaryEnabled,
    },
    borderColor: {
      error: 'transparent',
      default: 'transparent',
    },
    hoverBackgroundColor: {
      error: undefined,
      default: tokens.colorFilledPrimaryHover,
    },
    activeBackgroundColor: {
      error: undefined,
      default: tokens.colorFilledPrimaryPressed,
    },
    fontColor: {
      error: undefined,
      default: tokens.colorTextOnColor,
    },
  },
  outlined: {
    background: {
      active: undefined,
      primary: undefined,
      default: undefined,
    },
    borderColor: {
      error: tokens.colorBorderButtonError,
      default: tokens.colorBorderButton,
    },
    hoverBackgroundColor: {
      error: tokens.colorFilledDangerHover,
      default: tokens.colorFilledSecondaryHover,
    },
    activeBackgroundColor: {
      error: tokens.colorFilledDangerPressed,
      default: tokens.colorFilledSecondaryPressed,
    },
    fontColor: {
      error: tokens.colorTextError,
      default: tokens.colorTextButton,
    },
  },
  text: {
    background: {
      active: tokens.colorFilledSecondaryPressed,
      primary: tokens.colorFilledSecondaryHover,
      default: tokens.colorFilledSecondaryEnabled,
    },
    borderColor: {
      error: 'transparent',
      default: 'transparent',
    },
    hoverBackgroundColor: {
      error: undefined,
      default: tokens.colorFilledSecondaryHover,
    },
    activeBackgroundColor: {
      error: undefined,
      default: tokens.colorFilledSecondaryPressed,
    },
    fontColor: {
      error: undefined,
      default: tokens.colorTextButton,
    },
  },
} as const;

export const FilterButtonStyles = {
  borderColor: {
    disabled: 'border border-border-funcational',
    active: 'border border-border-button-pressed',
    primary: 'border border-border-button',
    default:
      'border border-border-funcational hover:border-border-button-hover active:border-border-button-pressed',
  },
  backgroundColor: {
    disabled: 'bg-bg-component-semantic-info',
    active: 'bg-bg-component-semantic-info',
    primary: 'bg-bg-component-primary-hover',
    default: 'bg-bg-component-semantic-info',
  },
  typographyColor: {
    disabled: 'text-text-primary',
    active: 'text-text-button-pressed',
    primary: 'text-text-button',
    default: 'text-text-primary hover:text-text-button-hover active:text-text-button-pressed',
  },
} as const;

export const OptionButtonStyles = {
  borderColor: {
    disabled: 'border border-border-funcational',
    active: 'border border-border-button-pressed',
    primary: 'border border-border-button',
    default:
      'border border-border-funcational hover:border-border-button-hover active:border-border-button-pressed',
  },
  backgroundColor: {
    disabled: 'bg-bg-component-semantic-info',
    active: 'bg-bg-component-semantic-info',
    primary: 'bg-bg-component-primary-hover',
    default: 'bg-bg-component-primary',
  },
  typographyColor: {
    disabled: 'text-text-primary',
    active: 'text-text-button-pressed',
    primary: 'text-text-button',
    default: 'text-text-primary hover:text-text-button-hover active:text-text-button-pressed',
  },
} as const;
