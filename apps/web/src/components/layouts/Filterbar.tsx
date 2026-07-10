import { type FC } from 'react';
import tokens from '@/tokens/base';
import Box, { type BoxProps } from "@mui/material/Box";
import Stack from '@mui/material/Stack';

const Filterbar: FC<BoxProps> = ({
  children,
  ...rest
}) => {
  return (
    <Box
      {...rest}
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: 1,
        paddingInline: tokens.spaceGobalScale16,
        // transform: `translateY(${filterBarHeight / 2}px)`,
        transition: "all 0.2s ease-in-out",
        ...rest?.sx,
      }}
    >
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: tokens.spaceGeneralGapS,
          padding: tokens.spaceGeneralPaddingM,
          boxShadow: tokens.shadowDepth3,
          borderRadius: tokens.borderRadiusGeneralS,
          backgroundColor: tokens.colorBackgroundComponentPrimary,
        }}
      >
        {children}
      </Stack>
    </Box>
  );
}

Filterbar.displayName = 'Filterbar';
export default Filterbar;
