import tokens from '@/tokens/base';
import type { SxProps, Theme } from '@mui/material/styles';

/** MUI TextField 默认样式 — 统一圆角、字体大小、边框颜色 */
export const textField: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: tokens.borderRadiusGeneralM,
    fontSize: tokens.fontSizeXxs,
    '& fieldset': {
      borderColor: tokens.colorBorderFuncational,
    },
    '&:hover fieldset': {
      borderColor: tokens.colorBorderFuncationalPressed,
    },
    '&.Mui-focused fieldset': {
      borderColor: tokens.colorBorderFuncationalPressed,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: tokens.fontSizeXxs,
  },
};
