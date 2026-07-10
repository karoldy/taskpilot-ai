import * as React from 'react';
import tokens from '@/tokens/base';
import { typography } from "@/tokens/style";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  useClick,
  useDismiss,
  autoUpdate,
  useInteractions,
  FloatingPortal
} from '@floating-ui/react';
import { useTranslation } from 'react-i18next'
import { Locale } from '@/constants/enum';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LanguagePicker: React.FC<{
  className?: string;
  showSubtitle?: boolean;
  onChange?: (v?: Locale) => void;
  children?: React.ReactNode;
}> = ({
  showSubtitle = true,
  children
}) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);

  // const { loading, send } = useRequest((d) => updatePersonalPreferences(d), { immediate: false });

  const {
    refs,
    floatingStyles,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-end',
    middleware: [
      offset(6),
      flip(),
      shift(),
      size({
        apply({ elements }) {
          Object.assign(elements.floating.style, {
            minWidth: '221px'
          });
        }
      })
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const locale = e.currentTarget.dataset.id
    i18n.changeLanguage(locale);
    setOpen(false);
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   send({
    //     webLang: locale
    //   })
    //     .then(() => {
    //       i18n.changeLanguage(locale);
    //       localStorage.setItem('locale', locale);
    //       onChange?.(locale);
    //       setOpen(false);
    //     })
    // } else {
    //   i18n.changeLanguage(locale);
    //   localStorage.setItem('locale', locale);
    //   onChange?.(locale);
    //   setOpen(false);
    // }
  }

  return (
    <>
      <Box
        ref={refs.setReference}
        {...getReferenceProps()}
        sx={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: tokens.spaceComponentNavGapS,
          minHeight: 40,
          paddingBlock: tokens.spaceComponentNavPaddingChipsY,
          paddingInline: tokens.spaceComponentNavPaddingChipsX,
          borderRadius: tokens.borderRadiusComponentButtonDefault,
          backgroundColor: open
            ? tokens.colorFilledPrimaryPressed
            : tokens.colorFilledPrimaryEnabled,
          '&:hover': {
            backgroundColor: open ? undefined : tokens.colorFilledPrimaryHover
          },
          '&:active': {
            backgroundColor: open ? undefined : tokens.colorFilledPrimaryPressed
          }
        }}
      >
        <Typography
          sx={{
            ...typography.body1Highlight,
            color: tokens.colorTextOnColor
          }}
        >
          {t(`${i18n.language}_thumbnail`)}
        </Typography>
        {open
          ? <ChevronUp color={tokens.colorIconOnColor} />
          : <ChevronDown color={tokens.colorIconOnColor} />
        }
      </Box>
      {/* <LoadingModal loading={loading} /> */}
      {open && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: tokens.spaceGeneralPaddingL,
              borderRadius: tokens.borderRadiusComponentDropdownMenu,
              backgroundColor: tokens.colorBackgroundComponentPrimary,
              boxShadow: tokens.shadowDepth3,
              outline: 0,
              overflow: 'hidden',
              zIndex: 1300
            }}
          >
            {showSubtitle && (
              <Typography
                sx={{
                  ...typography.body3,
                  color: tokens.colorTextSecondary
                }}
              >
                {t('web_setting_language')}
              </Typography>
            )}
            {Object.values(Locale)?.map((locale) => {
              const isSelected = i18n.language === locale;
              return (
                <Box
                  key={locale}
                  data-id={locale}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: tokens.spaceComponentFieldGapIconToTextS,
                    height: 56,
                    borderRadius: tokens.borderRadiusGeneralS,
                    cursor: isSelected ? 'default' : 'pointer',
                    '&:hover': {
                      backgroundColor: isSelected
                        ? undefined
                        : tokens.colorBackgroundComponentPrimaryHover
                    },
                    '&:active': {
                      backgroundColor: isSelected
                        ? undefined
                        : tokens.colorBackgroundComponentPrimaryPressed
                    }
                  }}
                  onClick={handleChange}
                >
                  <Box
                    component="span"
                    sx={{
                      flexShrink: 0,
                      width: 24,
                      height: 24,
                      opacity: isSelected ? '100' : '0'
                    }}
                  >
                    <Check
                      color={tokens.colorIconButton}
                    />
                  </Box>
                  <Typography
                    component="span"
                    sx={
                      isSelected
                        ? { ...typography.label2, color: isSelected ? tokens.colorTextButton : tokens.colorTextSecondary }
                        : { ...typography.label3, color: isSelected ? tokens.colorTextButton : tokens.colorTextSecondary }
                    }
                  >
                    {t(locale)}
                  </Typography>
                </Box>
              );
            })}
            {children}
          </Box>
        </FloatingPortal>
      )}
    </>
  );
}

LanguagePicker.displayName = 'LanguagePicker';
export default LanguagePicker;
