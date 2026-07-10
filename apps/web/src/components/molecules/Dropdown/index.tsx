import React from 'react';
import tokens from '@/tokens/base';
import { typography } from "@/tokens/style";
import { isEmpty } from 'lodash-es';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  type Placement
} from '@floating-ui/react';
import { useTranslation } from 'react-i18next';
import { List, useListRef } from "react-window";
import Box, { type BoxProps } from '@mui/material/Box';
import Stack, { type StackProps } from '@mui/material/Stack';
// import VIcon from '@/components/atoms/VIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Typography from '@/components/atoms/Typography';
import SearchInput, { type ISearchInputProps } from '@/components/molecules/SearchInput';
import DropdownItem, { type DropdownItemProps } from '@/components/molecules/Dropdown/Item';


function getWidth(fullWidth: number | undefined, rectsWidth: number, widthSearch?: boolean): string {
  if (widthSearch) return '343px';
  if (fullWidth) return `${fullWidth}px`;
  return `${rectsWidth}px`;
}

export interface IDropdownProps extends Omit<BoxProps,  'onChange' | 'children'> {
  placement?: Placement;
  value?: Array<string> | string;
  items?: Array<{icon?: string; value?: string; label?: string;helperText?: string}>;
  fullWidth?: number;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  widthSearch?: boolean;
  searchValue?: string;
  onChange?: (v: Array<string> | string) => void;
  children?: React.ReactNode | (({ open, close }: { open?: boolean, close?: () => void, onOpen?: () => void; }) => React.ReactNode);
  slotProps?: {
    popup?: StackProps,
    search?: ISearchInputProps,
    menu?: StackProps,
    menuItem?: DropdownItemProps
  }
}

interface VirtualListProps extends Omit<StackProps, 'onChange'> {
  value?: Array<string> | string;
  items?: Array<{icon?: string; value?: string; label?: string;helperText?: string}>;
  search?: string;
  multiple?: boolean;
  onChange?: (v?: any) => void;
  slotProps?: {
    popup?: StackProps,
    search?: ISearchInputProps,
    menu?: StackProps,
    menuItem?: DropdownItemProps
  },
}

const VirtualList: React.FC<VirtualListProps> = ({
  value,
  items,
  search,
  multiple,
  onChange,
  ...rest
}) => {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useListRef(null);

  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (multiple) {
        const index = items?.findIndex(n => n?.value === value?.at(0));
        if ((index !== undefined) && (index > -1)) {
          listRef?.current?.scrollToRow({index, behavior: 'smooth', align: 'start'})
        }
      } else {
        const index = items?.findIndex(n => n?.value === value);
        if ((index !== undefined) && (index > -1)) {
          listRef?.current?.scrollToRow({index, behavior: 'smooth', align: 'start'});
        }
      }
    }, 100);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [multiple, listRef?.current, timerRef.current]);

  return (
    <List
      listRef={listRef}
      rowHeight={56}
      rowCount={items?.length??0}
      rowProps={{}}
      overscanCount={5}
      rowComponent={(props) => {
        const item = items?.[props.index];
        let isSelected = false;
        let textColor = 'text.primary';
        let displayValue = search || '';
        if (item?.value) {
          if (multiple) {
            isSelected = Array.isArray(value) && value.includes(item.value);
          } else {
            isSelected = value === item.value;
          }
        }
        if (!multiple && isSelected) {
          displayValue = '';
        }
        if (isSelected) {
          textColor = multiple ? 'text.button' : 'text.onColor';
        }
        return (
          <DropdownItem
            {...rest?.slotProps?.menuItem}
            id={item?.value}
            key={props.index}
            style={props.style}
            primary={multiple ? false : isSelected}
            onClick={() => {
              onChange?.(item?.value??'');
            }}
          >
            {/* {item?.icon && (
              <span className='shrink-0'>
                <VIcon
                  icon={item.icon}
                  color={isSelected ? tokens.colorIconOnColor : tokens.colorIconDescription}
                  width={24}
                  height={24}
                />
              </span>
            )} */}
            {multiple && (
              <Checkbox
                checked={isSelected}
                sx={{padding: 0}}
              />
            )}
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                gap: tokens.spaceGeneralGapS,
                width: "100%"
              }}
            >
              <Typography
                className='break-all line-clamp-2'
                search={displayValue}
                // variant={isSelected ? 'label2' : 'label3'}
                sx={{
                  lineHeight: 'unset',
                }}
                color={textColor}
              >
                {item?.label}
              </Typography>
              {item?.helperText && (
                <Typography
                  className='truncate'
                  color={
                    isSelected
                      ? tokens.colorTextOnColor
                      : tokens.colorTextDescription
                  }
                  sx={{
                    ...typography.label3
                  }}
                >
                  {item?.helperText}
                </Typography>
              )}
            </Stack>
          </DropdownItem>
        );
      }}
    />
  );
}

const VirtualDropdown: React.FC<IDropdownProps> = ({
  placement = 'bottom-start',
  value,
  items,
  fullWidth,
  multiple,
  disabled,
  readOnly,
  widthSearch,
  searchValue,
  onChange,
  children,
  ...rest
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>();

  React.useEffect(() => {
    if (!open && widthSearch) {
      setSearch(undefined);
    }
  }, [open, widthSearch]);

  React.useEffect(() => {
    const fun = () => {
      if (open) setOpen(false);
    }

    window.addEventListener('scroll', fun);
    return () => {
      window.removeEventListener('scroll', fun);
    }
  }, [open]);

  const {
    refs,
    floatingStyles,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement,
    middleware: [
      offset(6),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: getWidth(fullWidth, rects.reference.width, widthSearch),
            maxHeight: widthSearch
              ? '320px'
              : '260px'
          });
        }
      })
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    enabled: !disabled || !readOnly
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const filterItems = widthSearch
    ? items?.filter((n) => n.label?.toLocaleLowerCase()?.includes(search?.toLowerCase()??''))
    : items;

  const handleChange = (v: string | number | boolean) => {
    if (disabled || readOnly) return;

    if (multiple) {
      let val: string[];

      if (Array.isArray(value)) {
        if (value.includes(v as string)) {
          val = value.filter(n => n !== v);
        } else {
          val = [...value, v as string];
        }
      } else {
        val = [v as string];
      }

      onChange?.(val);
      return;
    }

    onChange?.(v as string);
    setOpen(false);
  };

  return (
    <>
      <Box
        {...rest}
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => {
          if (disabled) return;
          setOpen(prev => !prev);
        }}
        sx={{
          outline: 'none',
          ...rest?.sx
        }}
      >
        {typeof children === 'function' ? children({ open, close: () => setOpen(false), onOpen: () => setOpen(true)  }) : children}
      </Box>
      {open && (
        <FloatingPortal>
          <Stack
            {...rest?.slotProps?.popup}
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{...floatingStyles, ...rest?.slotProps?.popup?.style}}
            sx={(theme) => {
              return {
                borderRadius: tokens.borderRadiusComponentDropdownMenu,
                boxShadow: tokens.shadowDepth1,
                overflow: "hidden",
                backgroundColor: tokens.colorBackgroundComponentPrimary,
                zIndex: theme.zIndex.modal + 1,
                outline: 'none'
              }
            }}
          >
            {widthSearch && (
              <SearchInput
                {...rest?.slotProps?.search}
                type='text'
                fullWidth
                autoComplete='off'
                value={search??''}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={rest?.slotProps?.search?.placeholder || t('web_taskmange_search__title')}
                sx={{
                  paddingBlock: tokens.spaceComponentCheckboxPaddingYL,
                  paddingInline: tokens.spaceComponentCheckboxPaddingXL
                }}
              />
            )}
            {isEmpty(filterItems) && (
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: tokens.spaceGeneralGapS,
                  width: "100%",
                  height: "100%",
                  paddingTop: widthSearch ? undefined : tokens.spaceGobalScale16,
                  paddingBottom: tokens.spaceGobalScale16
                }}
              >
                <img
                  style={{ width: 56, height: 56 }}
                  src={new URL('@/assets/Illustration/Empty/Img_56x56_Empty_Search.svg', import.meta.url).href}
                  alt="no result"
                />
                <Typography variant="body2" color="text.description">
                  {t('web_doc_no_record_title')}
                </Typography>
              </Stack>
            )}
            {!isEmpty(filterItems) && (
              <VirtualList
                value={value}
                items={filterItems}
                search={search || searchValue}
                multiple={multiple}
                slotProps={rest?.slotProps}
                onChange={handleChange}
              />
            )}
          </Stack>
        </FloatingPortal>
      )}
    </>
  );
}

VirtualDropdown.displayName = 'VirtualDropdown';
export default React.memo(VirtualDropdown);
