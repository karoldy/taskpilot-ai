import * as React from 'react';
import tokens from '@/tokens/base';
import { containedButton, typography } from "@/tokens/style";
import Box from '@mui/material/Box';
import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export type IllustrationType = 'Complete' | 'Empty' | 'Error' | 'Warm' | 'TaskDescriptionCard';

export interface IIllustrationCardProps extends Omit<StackProps, 'children'> {
  variant?: 'info' | 'success' | 'error';
  type?: IllustrationType;
  size?: number;
  name?: string;
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
  type = 'Error',
  size = 80,
  name,
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
  const imgSrc = name
    ? new URL(
        `../../../assets/Illustration/${type}/Img_${size}x${size}_${name}.svg`,
        import.meta.url,
      ).href
    : undefined;

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
      {imgSrc && (
        <img
          style={{
            width: size,
            height: size,
            marginBottom: tokens.spaceGeneralGapL,
          }}
          src={imgSrc}
          alt={name}
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
            // variant="subtitle1"
            component="div"
            // color="text.primary"
            align="center"
            sx={{
              ...typography.subtitle1,
              color: tokens.colorTextPrimary
            }}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            align="center"
            sx={{
              ...typography.body2,
              color: tokens.colorTextSecondary
            }}
          >
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
            sx={containedButton}
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
                sx={{ borderRadius: tokens.borderRadiusGeneralAllRound }}
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
                sx={containedButton}
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
                sx={{ borderRadius: tokens.borderRadiusGeneralAllRound }}
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            )}
            {okText && (
              <Button
                variant="outlined"
                fullWidth
                color="error"
                size="large"
                disableElevation
                loading={loading}
                loadingPosition="start"
                sx={{ borderRadius: tokens.borderRadiusGeneralAllRound }}
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
