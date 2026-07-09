import * as React from 'react';
import tokens from '@/tokens/base';
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
      <Typography component="span" variant="body3" color="text.onColor" className="cursor-default">
        {t('footer__terms')}
      </Typography>
    </Box>
  );
};

Footer.displayName = 'Footer';
export default Footer;
