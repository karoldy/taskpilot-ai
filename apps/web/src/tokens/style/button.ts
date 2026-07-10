import tokens from '@/tokens/base';
import type { SxProps, Theme } from '@mui/material/styles';

/** OAuth / 第三方登录按钮样式 — outline variant，hover 时高亮 */
export const oauthButton: SxProps<Theme> = {
  py: tokens.spaceComponentButtonPaddingYM,
  px: tokens.spaceComponentButtonPaddingXM,
  borderRadius: tokens.borderRadiusGeneralM,
  borderColor: tokens.colorBorderFuncational,
  color: tokens.colorTextSecondary,
  fontSize: tokens.fontSizeXxs,
  fontWeight: tokens.fontWeightSemibold,
  textTransform: 'none',
  '&:hover': {
    bgcolor: tokens.colorBackgroundComponentPrimaryHover,
    color: tokens.colorTextPrimary,
    borderColor: tokens.colorBorderFuncationalPressed,
  },
};

/** 全圆角 contained 按钮 — 适用于主操作 CTA */
export const containedButton: SxProps<Theme> = {
  minHeight: 40,
  paddingBlock: tokens.spaceComponentNavPaddingChipsY,
  paddingInline: tokens.spaceComponentNavPaddingChipsX,
  borderRadius: tokens.borderRadiusGeneralAllRound,
  backgroundColor: tokens.colorFilledPrimaryEnabled,
  '&:hover': {
    backgroundColor: tokens.colorFilledPrimaryHover
  },
  '&:active': {
    backgroundColor: tokens.colorFilledPrimaryPressed
  }
};
