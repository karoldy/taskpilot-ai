
import tokens from '@/tokens/base';
import { Search, CircleX } from 'lucide-react';
import Box from '@mui/material/Box';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

export interface ISearchInputProps extends Omit<TextFieldProps, 'className'> {
  className?: string;
  clear?: boolean;
  loading?: boolean;
  onClear?: () => void;
}

const SearchInput: React.FC<ISearchInputProps> = (props) => {
  const {
    clear,
    loading,
    onClear,
    ...rest
  } = props;

  return (
    <TextField
      variant="standard"
      {...rest}
      slotProps={{
        input: {
          ...props.slotProps?.input,
          startAdornment: (
            <Box
              key="search"
              component="span"
              sx={{
                mr: '4px'
              }}
            >
              {loading && <CircularProgress size={24} />}
              {!loading && <Search color={tokens.colorIconSecondary} />}
            </Box>
          ),
          endAdornment: clear ? (
            <Box
              component="span"
              sx={{
                flexShrink: 0,
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClear?.()
              }}
            >
              <CircleX
                size={16}
                color={tokens.colorIconSecondary}
              />
            </Box>
          ) : null
        }
      }}
    />
  );
}

SearchInput.displayName = 'SearchInput';
export default SearchInput;
