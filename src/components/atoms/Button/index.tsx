import { useMemo } from 'react';
import tokens from '@/tokens/base';
import { ButtonStyles } from '@/config/style.config';
import Button, { type ButtonProps } from '@mui/material/Button';

function getState(active?: boolean, primary?: boolean) {
  if (active) return 'active';
  if (primary) return 'primary';
  return 'default';
}

interface IButtonProps extends Omit<ButtonProps, 'size' | 'color' | 'children'> {
  size?: 'normal' | 'large';
  error?: boolean;
  active?: boolean;
  primary?: boolean;
  children?: React.ReactNode;
}

export default function (props: IButtonProps) {
  const { size = 'normal', error, active, primary, variant, children, ...rest } = props;

  const sx = useMemo(() => {
    const state = getState(active, primary);

    const errorState = error ? 'error' : 'default';

    return {
      minHeight: size === 'normal' ? '40px' : '48px',
      padding: ButtonStyles.padding[size ?? 'normal'],
      background: ButtonStyles[variant ?? 'contained'].background[state],
      border: '1px solid',
      borderColor: ButtonStyles[variant ?? 'contained'].borderColor[errorState],
      borderRadius: tokens.borderRadiusGeneralAllRound,
      fontSize: size === 'large' ? '1.125rem' : '1rem',
      fontWeight: tokens.fontWeightSemibold,
      color: ButtonStyles[variant ?? 'contained'].fontColor[errorState],
      lineHeight: '120%',
      letterSpacing: 0,
      '&:hover': {
        backgroundColor:
          active || primary
            ? ''
            : ButtonStyles[variant ?? 'contained'].hoverBackgroundColor[errorState],
      },
      '&:active': {
        backgroundColor:
          active || primary
            ? ''
            : ButtonStyles[variant ?? 'contained'].activeBackgroundColor[errorState],
      },
      ...rest?.sx,
    };
  }, [size, active, primary, error, rest?.sx]);

  return (
    <Button {...rest} variant={variant} sx={sx}>
      {children}
    </Button>
  );
}
