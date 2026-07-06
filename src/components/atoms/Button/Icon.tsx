import { useMemo } from 'react';
import tokens from '@/tokens/base';
import { ButtonStyles } from '@/config/style.config';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';

function getState(active?: boolean, primary?: boolean) {
  if (active) return 'active';
  if (primary) return 'primary';
  return 'default';
}

interface IIconButtonProps extends Omit<IconButtonProps, 'size' | 'color' | 'children'> {
  size?: 'normal' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  error?: boolean;
  active?: boolean;
  primary?: boolean;
  children?: React.ReactNode;
}

export default function (props: IIconButtonProps) {
  const { size, variant = 'text', error, active, primary, children, ...rest } = props;

  const sx = useMemo(() => {
    const state = getState(active, primary);

    const errorState = error ? 'error' : 'default';

    return {
      width: size === 'normal' ? '40px' : '48px',
      height: size === 'normal' ? '40px' : '48px',
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
    <IconButton {...rest} sx={sx}>
      {children}
    </IconButton>
  );
}
