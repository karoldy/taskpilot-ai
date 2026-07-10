import { type ReactNode, type FC } from 'react';
import tokens from '@/tokens/base';
import { typography } from "@/tokens/style";
import { ArrowUpRight } from 'lucide-react';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface IFilterCardProps extends Omit<BoxProps, 'children'> {
  count?: number;
  error?: boolean;
  primary?: boolean;
  borderImageSource?: string;
  loading?: boolean;
  chip?: ReactNode;
  children?: ReactNode;
}

const FilterCard: FC<IFilterCardProps> = ({
  count,
  error,
  primary,
  borderImageSource,
  loading,
  chip,
  children,
  ...rest
}) => {
  return (
    <Box
      {...rest}
      sx={{
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        width: 182,
        minHeight: 152,
        borderRadius: tokens.borderRadiusGeneralS,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: tokens.borderRadiusGeneralS,
          padding: primary ? '2px' : '',
          paddingTop: primary ? '' : '2px',
          background: borderImageSource,
          mask: `
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0)
          `,
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 2,
        },
        ...rest?.sx,
      }}
    >
      <Stack
        sx={{
          position: 'relative',
          gap: tokens.spaceGeneralGapS,
          width: '100%',
          height: '100%',
          paddingBlock: tokens.spaceGeneralDefaultPaddingY,
          paddingInline: tokens.spaceGeneralDefaultPaddingX,
          borderRadius: tokens.borderRadiusGeneralS,
          boxShadow: '0px 4px 24px 0px #0000000d',
          backgroundColor: error
            ? primary
              ? tokens.colorBackgroundComponentGlassRedSelected
              : tokens.colorBackgroundComponentGlassRedDefault
            : primary
              ? tokens.colorBackgroundComponentGlassBlueSelected
              : tokens.colorBackgroundComponentGlassBlueDefault,
          cursor: 'pointer',
          opacity: primary ? 1 : 0.8,
          zIndex: 1,
          backdropFilter: 'blur(24px)',
          '&:hover': {
            backgroundColor: error
              ? primary
                ? ''
                : tokens.colorBackgroundComponentGlassRedHover
              : primary
                ? ''
                : tokens.colorBackgroundComponentGlassBlueHover,
          },
          '&:active': {
            backgroundColor: error
              ? primary
                ? ''
                : tokens.colorBackgroundComponentGlassRedSelected
              : primary
                ? ''
                : tokens.colorBackgroundComponentGlassBlueSelected,
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: tokens.spaceGobalScale8,
            justifyContent: 'space-between',
          }}
        >
          <Stack
            sx={{
              gap: tokens.spaceGobalScale4,
              overflow: 'hidden',
            }}
          >
            {chip}
            <Typography
              sx={{
                ...typography.heading1,
                color: tokens.colorTextOnColor
              }}
            >
              {count}
            </Typography>
          </Stack>
          <Box
            sx={{
              flexShrink: 0,
              width: 40,
              height: 40,
              paddingBlock: tokens.spaceComponentButtonPaddingYS,
              paddingInline: tokens.spaceComponentButtonPaddingXS,
              borderRadius: tokens.borderRadiusComponentButtonDefault,
              border: '1px solid',
              borderColor: tokens.colorBorderOnWhite,
            }}
          >
            <ArrowUpRight color={tokens.colorIconOnColor} size={24} />
          </Box>
        </Stack>
        {children}
      </Stack>
    </Box>
  );
};

FilterCard.displayName = 'FilterCard';
export default FilterCard;
