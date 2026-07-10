import tokens from '@/tokens/base';
import type { SxProps, Theme } from '@mui/material/styles';

/** Dialog Paper 默认样式 — 大圆角容器 */
export const dialogPaper: SxProps<Theme> = {
  borderRadius: tokens.borderRadiusGeneralXxxl,
  width: '100%',
};

/** Dialog Paper 组合 helper，合并 default + 自定义 maxWidth */
export const dialogPaperWithMaxWidth = (maxWidth: number): SxProps<Theme> => ({
  ...dialogPaper,
  maxWidth,
});
