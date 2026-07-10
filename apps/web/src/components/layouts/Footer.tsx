import * as React from 'react';
import tokens from '@/tokens/base';
import { typography } from "@/tokens/style";
import { useTranslation } from 'react-i18next';
import Box, { type BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IFooterProps extends Omit<BoxProps, 'children'> {
  children?: React.ReactNode;
}

const Footer: React.FC<IFooterProps> = ({ children, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Box
      {...rest}
      component="footer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBlock: tokens.spaceGeneralPaddingL,
        paddingInline: tokens.spaceGeneralPaddingXl,
        backgroundColor: tokens.colorBackgroundComponentHighlight,
        zIndex: 1,
        ...rest?.sx,
      }}
    >
      {children}
      <Typography
        component="span"
        sx={{
          ...typography.body3,
          color: tokens.colorTextOnColor,
          cursor: 'default'
        }}
      >
        {t('web_footer__terms')}
      </Typography>
    </Box>
  );
};

Footer.displayName = 'Footer';
export default Footer;
