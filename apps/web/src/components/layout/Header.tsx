import * as React from 'react';
import Box, { type BoxProps } from '@mui/material/Box';

const NAVBAR_HEIGHT = 64;

interface IHeaderProps extends Omit<BoxProps, 'children'> {
  children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children, ...rest }) => {
  return (
    <Box
      {...rest}
      component="header"
      className="header"
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: `${NAVBAR_HEIGHT}px`,
        userSelect: 'none',
        ...rest.sx,
      }}
    >
      <img
        className="bg-header"
        src={new URL('@/assets/images/bg_1440x295_Header.webp', import.meta.url).href}
        alt="bg_1440x295_Header"
      />
      {children}
    </Box>
  );
};

Header.displayName = 'Header';
export default Header;
