import * as React from 'react';
import tokens from '@/tokens/base';
import Grid from '@mui/material/Grid';
import Box, { type BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import { SortOrder } from '@/constants/enum';
import { ArrowDownUp, ArrowUpDown } from 'lucide-react';

export interface IColumn<T = Record<string, unknown>> {
  /** Data field key used to access row data */
  key: string;
  /** Column header text */
  title: string;
  /**
   * Column width via MUI Grid `size` prop.
   * Accepts 1-12 (fraction of 12-column grid), "auto", "grow", or responsive object.
   * Defaults to "grow" (fills remaining space) when omitted.
   */
  size?: number | 'auto' | 'grow' | { [breakpoint: string]: number | undefined };
  /** Cell content horizontal alignment */
  align?: 'left' | 'center' | 'right';
  /** Enable sort on this column */
  sortable?: boolean;
  /**
   * Custom cell renderer. Receives (value, row, rowIndex).
   * When omitted, renders String(value) with text overflow ellipsis.
   */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface ITableProps<T = Record<string, unknown>> extends Omit<BoxProps, 'children'> {
  /** Column definitions */
  columns: IColumn<T>[];
  /** Data rows */
  data: T[];
  /** When true, renders skeleton placeholder rows instead of data */
  loading?: boolean;
  /** Number of skeleton rows to show during loading (default: 5) */
  loadingRows?: number;
  /** Text shown when data is empty and not loading */
  emptyText?: string;
  /** Custom empty state content, overrides emptyText */
  emptyContent?: React.ReactNode;
  /** Stable row key: field name (e.g. "id") or (row, index) => key. Falls back to index. */
  rowKey?: string | ((row: T, index: number) => string | number);
  /** Hide the header row */
  hideHeader?: boolean;
  /** Currently sorted column key */
  sortKey?: string;
  /** Sort direction */
  sortOrder?: SortOrder;
  /** Called when a sortable column header is clicked */
  onSort?: (key: string) => void;
}

/* -------------------------------------------------------------------------- */
/*  HeaderCell                                                               */
/* -------------------------------------------------------------------------- */

interface IHeaderCellProps {
  column: Pick<IColumn, 'key' | 'title' | 'align' | 'sortable'>;
  sortKey?: string;
  sortOrder?: SortOrder;
  onSort?: (key: string) => void;
}

const SORT_ICON_SIZE = 16;

const HeaderCell: React.FC<IHeaderCellProps> = ({ column, sortKey, sortOrder, onSort }) => {
  const isActive = column.sortable && sortKey === column.key;
  const isAsc = isActive && sortOrder === SortOrder.ASC;
  const isDesc = isActive && sortOrder === SortOrder.DESC;

  const handleClick = React.useCallback(() => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  }, [column.sortable, column.key, onSort]);

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        cursor: column.sortable ? 'pointer' : 'default',
        pointerEvents: column.sortable ? undefined : 'none',
        userSelect: 'none',
        px: tokens.spaceComponentTablePaddingXL,
        py: tokens.spaceComponentTablePaddingYL,
        textAlign: column.align ?? 'left',
        color: isActive ? tokens.colorTextButton : tokens.colorTextDescription,
        fontWeight: isActive ? tokens.fontWeightSemibold : tokens.fontWeightRegular,
        '&:hover': {
          color: isActive ? '' : tokens.colorTextButtonHover,
        },
        '&:active': {
          color: isActive ? '' : tokens.colorTextButtonPressed,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 'inherit',
          lineHeight: 'unset',
          color: 'inherit',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {column.title}
      </Typography>
      {column.sortable && (
        <>
          {isAsc && <ArrowUpDown color={tokens.colorTextButton} size={SORT_ICON_SIZE} />}
          {isDesc && <ArrowDownUp color={tokens.colorTextButton} size={SORT_ICON_SIZE} />}
        </>
      )}
    </Box>
  );
};

HeaderCell.displayName = 'HeaderCell';

/* -------------------------------------------------------------------------- */
/*  BodyCell                                                                 */
/* -------------------------------------------------------------------------- */

interface IBodyCellProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  /** Raw text value used for Tooltip (only when children is a plain string) */
  tooltipText?: string;
}

const BodyCell: React.FC<IBodyCellProps> = ({ children, align = 'left', tooltipText }) => {
  const textRef = React.useRef<HTMLElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  }, [children, tooltipText]);

  const cell = (
    <Typography
      ref={textRef}
      variant="body2"
      color="text.secondary"
      noWrap
      sx={{ display: 'block', width: '100%' }}
    >
      {children}
    </Typography>
  );

  const showTooltip = tooltipText != null && tooltipText !== '' && isOverflowing;

  return (
    <Box
      sx={{
        px: tokens.spaceComponentTablePaddingXL,
        py: tokens.spaceComponentTablePaddingYXl,
        textAlign: align,
        minWidth: 0,
      }}
    >
      {showTooltip ? (
        <Tooltip title={tooltipText} arrow placement="top">
          {cell}
        </Tooltip>
      ) : (
        cell
      )}
    </Box>
  );
};

BodyCell.displayName = 'BodyCell';

/* -------------------------------------------------------------------------- */
/*  Table                                                                    */
/* -------------------------------------------------------------------------- */

/** Shared row styles: background + hover + active + border-radius */
const ROW_SX = {
  borderRadius: tokens.borderRadiusComponentTableDefault,
  backgroundColor: tokens.colorBackgroundPagePrimary,
  '&:hover': { backgroundColor: tokens.colorBackgroundComponentPrimaryHover },
  '&:active': { backgroundColor: tokens.colorBackgroundComponentPrimaryPressed },
} as const;

const Table = <T,>({
  columns,
  data,
  loading = false,
  loadingRows = 5,
  emptyText,
  emptyContent,
  rowKey,
  hideHeader = false,
  sortKey,
  sortOrder,
  onSort,
  sx,
  ...rest
}: ITableProps<T>): React.ReactElement | null => {
  const getRowKey = React.useCallback(
    (row: T, index: number): string | number => {
      if (typeof rowKey === 'function') return rowKey(row, index);
      if (typeof rowKey === 'string')
        return String((row as Record<string, unknown>)[rowKey] ?? index);
      return index;
    },
    [rowKey],
  );

  const getCellContent = React.useCallback(
    (column: IColumn<T>, row: T, index: number): React.ReactNode => {
      const value = (row as Record<string, unknown>)[column.key];
      if (column.render) return column.render(value, row, index);
      if (value == null) return '';
      return String(value);
    },
    [],
  );

  const getCellTooltipText = React.useCallback(
    (column: IColumn<T>, row: T, _index: number): string | undefined => {
      if (column.render) return undefined;
      const value = (row as Record<string, unknown>)[column.key];
      if (value == null) return undefined;
      return String(value);
    },
    [],
  );

  /** Renders a single Grid row with BodyCells */
  const renderRow = React.useCallback(
    (cells: React.ReactNode[], key: string | number): React.ReactElement => (
      <Box key={key} sx={ROW_SX}>
        <Grid container columns={12}>
          {columns.map((col, ci) => (
            <Grid key={col.key} size={col.size ?? ('grow' as const)}>
              {cells[ci]}
            </Grid>
          ))}
        </Grid>
      </Box>
    ),
    [columns],
  );

  if (columns.length === 0) {
    return <Box sx={sx} {...rest} />;
  }

  return (
    <Box sx={sx} {...rest}>
      {/* Header row */}
      {!hideHeader && (
        <Grid container columns={12}>
          {columns.map((col) => (
            <Grid key={col.key} size={col.size ?? ('grow' as const)}>
              <HeaderCell column={col} sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
            </Grid>
          ))}
        </Grid>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: tokens.spaceComponentTableGapL }}>
          {Array.from({ length: loadingRows }).map((_, rowIndex) =>
            renderRow(
              columns.map((col) => (
                <Box
                  key={col.key}
                  sx={{
                    px: tokens.spaceComponentTablePaddingXL,
                    py: tokens.spaceComponentTablePaddingYL,
                  }}
                >
                  <Skeleton variant="text" width="80%" />
                </Box>
              )),
              `skeleton-${rowIndex}`,
            ),
          )}
        </Box>
      ) : data.length === 0 ? (
        <Box
          sx={{
            // ...ROW_SX,
            textAlign: 'center',
            py: 6,
            px: tokens.spaceComponentTablePaddingXL,
          }}
        >
          {emptyContent ?? (
            <Typography variant="body2" color="text.secondary">
              {emptyText ?? 'No data available'}
            </Typography>
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: tokens.spaceComponentTableGapL }}>
          {data.map((row, rowIndex) =>
            renderRow(
              columns.map((col) => (
                <BodyCell
                  key={col.key}
                  align={col.align}
                  tooltipText={getCellTooltipText(col, row, rowIndex)}
                >
                  {getCellContent(col, row, rowIndex)}
                </BodyCell>
              )),
              getRowKey(row, rowIndex),
            ),
          )}
        </Box>
      )}
    </Box>
  );
};

Table.displayName = 'Table';
export default Table;
