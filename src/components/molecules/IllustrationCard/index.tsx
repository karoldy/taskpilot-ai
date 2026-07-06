import * as React from 'react';
import tokens from '@/tokens/base';
import Box from '@mui/material/Box';
import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/components/atoms/Button';

export interface IIllustrationCardProps extends Omit<StackProps, 'children'> {
  variant?: 'info' | 'success' | 'error';
  src?: string;
  size?: number;
  code?: string;
  title?: string;
  subtitle?: string;
  okText?: string;
  cancelText?: string;
  loading?: boolean;
  actions?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}

const IllustrationCard: React.FC<IIllustrationCardProps> = ({
  variant,
  src,
  size = 80,
  code,
  title,
  subtitle,
  okText,
  cancelText,
  loading,
  onOk,
  onCancel,
  actions,
  children,
  ...rest
}) => {
  return (
    <Stack
      {...rest}
      sx={{
        alignItems: 'center',
        padding: tokens.spaceGeneralPaddingXxxl,
        borderRadius: tokens.borderRadiusGeneralL,
        backgroundColor: tokens.colorBackgroundComponentPrimary,
        ...rest?.sx,
      }}
    >
      {src && (
        <img
          style={{
            width: size,
            height: size,
            marginBottom: tokens.spaceGeneralGapL,
          }}
          src={src}
          alt="error"
          loading="lazy"
        />
      )}
      <Stack
        sx={{
          gap: tokens.spaceGeneralGapXs,
          marginBottom: tokens.spaceGeneralGapXl,
        }}
      >
        {title && (
          <Typography
            variant="subtitle1"
            component="div"
            color="text.primary"
            className="text-center"
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="body2" color="text.secondary" className="text-center">
            {subtitle + (code ? `(${code})` : '')}
          </Typography>
        )}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          gap: tokens.spaceGeneralGapXl,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {variant === 'success' && (
          <Button
            disableElevation
            size="large"
            variant="contained"
            loading={loading}
            loadingPosition="start"
            fullWidth
            onClick={onOk}
          >
            {okText}
          </Button>
        )}
        {variant === 'info' && (
          <>
            {cancelText && (
              <Button
                size="large"
                variant="outlined"
                fullWidth
                loadingPosition="start"
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            )}
            {okText && (
              <Button
                disableElevation
                size="large"
                variant="contained"
                loading={loading}
                loadingPosition="start"
                fullWidth
                onClick={onOk}
              >
                {okText}
              </Button>
            )}
          </>
        )}
        {variant === 'error' && (
          <>
            {cancelText && (
              <Button
                size="large"
                variant="outlined"
                fullWidth
                loadingPosition="start"
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            )}
            {okText && (
              <Button
                variant="outlined"
                fullWidth
                error
                size="large"
                disableElevation
                loading={loading}
                loadingPosition="start"
                onClick={onOk}
              >
                {okText}
              </Button>
            )}
          </>
        )}
        {actions}
        {children}
      </Box>
    </Stack>
  );
};

IllustrationCard.displayName = 'IllustrationCard';
export default IllustrationCard;
