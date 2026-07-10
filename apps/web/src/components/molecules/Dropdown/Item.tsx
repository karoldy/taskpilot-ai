import * as React from 'react';
import tokens from '@/tokens/base';
import Stack, { type StackProps } from '@mui/material/Stack';

export interface DropdownItemProps extends Omit<StackProps, 'children'> {
  primary?: boolean;
  children?: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  primary,
  children,
  ...rest
}) => {
  return (
    <Stack
      {...rest}
        direction="row"
      sx={{
        alignItems: "center",
        gap: tokens.spaceComponentCheckboxGapIconToTextS,
        paddingBlock: tokens.spaceComponentCheckboxPaddingYL,
        paddingInline: tokens.spaceComponentCheckboxPaddingXL,
        backgroundColor: primary
          ? tokens.colorBackgroundComponentHighlight
          : tokens.colorBackgroundComponentPrimary,
        cursor: primary ? 'default' : 'pointer',
        '&:hover': {
          backgroundColor: primary
            ? ''
            : tokens.colorBackgroundComponentPrimaryHover
        },
        '&:active': {
          backgroundColor: primary
            ? ''
            : tokens.colorBackgroundComponentPrimaryPressed
        }
      }}
    >
      {children}
    </Stack>
  );
}

DropdownItem.displayName = 'DropdownItem';
export default DropdownItem;
