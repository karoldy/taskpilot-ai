import * as React from 'react';
import { ROOT_PATH } from '@/routers/path';
import tokens from '@/tokens/base';
import { typography } from "@/tokens/style";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '@/stores';
import { clearAuthTokens } from '@/lib/auth';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  FolderGit2,
  ListChecks,
  UserStar,
  CalendarDays,
  NotebookPen,
  LayoutDashboard,
  Settings,
  Bell,
} from 'lucide-react';
import Box from '@mui/material/Box';
import Stack, { type StackProps } from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IllustrationCard from '../molecules/IllustrationCard';

const IconMap = {
  project: FolderGit2,
  task: ListChecks,
  staff: UserStar,
  schedule: CalendarDays,
  note: NotebookPen,
  dashboard: LayoutDashboard,
} as const;

interface INavbarProps extends Omit<StackProps, 'className' | 'children'> {
  children?: React.ReactNode;
}

const Navbar: React.FC<INavbarProps> = ({ children, ...rest }) => {
  const { t } = useTranslation();
  // const { permission } = usePermission();
  // const auth = useAppSelector((s) => s.auth);
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const userInitials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : null;

  const handleLogout = () => {
    clearAuthTokens();
    navigate('/login', { replace: true });
  };
  // const location = useLocation();

  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [openLogoutModal, setopenLogoutModal] = React.useState<boolean>(false);
  const [isPersonalProfileDrawerOpen, setIsPersonalProfileDrawerOpen] =
    React.useState<boolean>(false);
  const [isNotificationDrawerOpen] = React.useState<boolean>(false);

  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      const progress = Math.min(window.scrollY / scrollThreshold, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Stack
        {...rest}
        component="nav"
        direction="row"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          gap: tokens.spaceGeneralGapS,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBlock: tokens.spaceComponentNavPaddingYL,
          paddingInline: tokens.spaceComponentNavPaddingXXl,
          borderBottom: '1px solid',
          borderColor: `rgba(255, 255, 255, ${0.15 * scrollProgress})`,
          zIndex: 1100,
          minWidth: 0,
          width: '100%',
          overflow: 'hidden',
          background: `linear-gradient(109.88deg, rgba(19, 87, 154, ${
            0.92 * scrollProgress
          }) 6.43%, rgba(46, 120, 255, ${0.92 * scrollProgress}) 83.44%)`,
          backdropFilter:
            scrollProgress > 0
              ? `blur(${20 * scrollProgress}px) saturate(${100 + 80 * scrollProgress}%)`
              : 'none',
          WebkitBackdropFilter:
            scrollProgress > 0
              ? `blur(${20 * scrollProgress}px) saturate(${100 + 80 * scrollProgress}%)`
              : 'none',
          boxShadow:
            scrollProgress > 0
              ? `0 4px 30px rgba(0, 0, 0, ${
                  0.15 * scrollProgress
                }), 0 1px 3px rgba(0, 0, 0, ${0.1 * scrollProgress})`
              : 'none',
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: tokens.spaceGeneralGapS,
            minWidth: 0,
            flexShrink: 1,
            overflow: 'hidden',
          }}
        >
          {lg && (
            <IconButton
              size="large"
              onClick={() => setOpenDrawer(true)}
              sx={{ minHeight: '40px', padding: '0' }}
            >
              {/* <Icon
                icon="ri:menu-unfold-2-line"
                style={{ fontSize: "inherit" }}
                color={tokens.colorIconOnColor}
                width="24"
                height="24"
              /> */}
            </IconButton>
          )}
          {!lg && (
            <>
              {ROOT_PATH.map((item) => {
                const pathSegments = item.path.split('/');
                const pathnameSegments = location?.pathname?.split('/').filter(Boolean) || [];
                const active = pathSegments?.some((n) => pathnameSegments?.includes(n));
                const iconId = item.id;
                const Icon =
                  iconId in IconMap ? IconMap[iconId as keyof typeof IconMap] : undefined;
                return (
                  <Stack
                    key={item.id}
                    component={Link}
                    to={`/${item.path}`}
                    direction="row"
                    sx={{
                      alignItems: 'center',
                      gap: tokens.spaceGeneralGapS,
                      paddingBlock: tokens.spaceComponentNavPaddingChipsY,
                      paddingInline: tokens.spaceComponentNavPaddingChipsX,
                      borderRadius: tokens.borderRadiusGeneralAllRound,
                      color: active ? tokens.colorTextHighlight : tokens.colorTextOnColor,
                      fontWeight: active ? tokens.fontWeightSemibold : tokens.fontWeightRegular,
                      backgroundColor: active
                        ? tokens.colorBackgroundComponentPrimary
                        : 'transparent',
                      lineHeight: tokens.lineHeight120,
                      letterSpacing: 0,
                      fontSize: '1.125rem',
                      '&:hover': {
                        color: active ? '' : tokens.colorTextHighlight,
                        fontWeight: active ? '' : tokens.fontWeightSemibold,
                        backgroundColor: active ? '' : tokens.colorBackgroundComponentPrimaryHover,
                      },
                      '&:active': {
                        color: active ? '' : tokens.colorTextHighlight,
                        fontWeight: active ? '' : tokens.fontWeightSemibold,
                        backgroundColor: active
                          ? ''
                          : tokens.colorBackgroundComponentPrimaryPressed,
                      },
                    }}
                  >
                    {Icon && (
                      <Icon
                        className="shrink-0"
                        style={{ color: 'inherit', fontSize: 'inherit' }}
                        size={20}
                      />
                    )}
                    <Box
                      className="route-name"
                      sx={{
                        display: {
                          xxl: 'none',
                        },
                      }}
                    >
                      {t(item?.key ?? '')}
                    </Box>
                  </Stack>
                );
              })}
            </>
          )}
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: tokens.spaceGeneralGapS,
            minWidth: 0,
            flexShrink: 0,
          }}
        >
          <IconButton
            size="medium"
            sx={{
              borderRadius: tokens.borderRadiusGeneralAllRound,
              backgroundColor: tokens.colorFilledPrimaryEnabled,
              '&:hover': {
                backgroundColor: tokens.colorFilledPrimaryHover,
              },
              '&:active': {
                backgroundColor: tokens.colorFilledPrimaryPressed,
              },
            }}
          >
            <Bell color={tokens.colorIconOnColor} />
          </IconButton>
          <IconButton
            size="medium"
            sx={{
              borderRadius: tokens.borderRadiusGeneralAllRound,
              backgroundColor: tokens.colorFilledPrimaryEnabled,
              '&:hover': {
                backgroundColor: tokens.colorFilledPrimaryHover,
              },
              '&:active': {
                backgroundColor: tokens.colorFilledPrimaryPressed,
              },
            }}
          >
            <Settings color={tokens.colorIconOnColor} />
          </IconButton>
          {/* {!lg && (
            <>
              <LanguagePicker />
              <FontSizePicker />
            </>
          )} */}
          <Avatar
            onClick={() => setopenLogoutModal(true)}
            sx={{
              bgcolor: '#094dcc',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                ...typography.body2Highlight,
                color: tokens.colorTextOnColor
              }}
            >
              {userInitials ?? '?'}
            </Typography>
          </Avatar>
        </Stack>
        {children}
      </Stack>
      <Drawer open={openDrawer} anchor="right" onClose={() => setOpenDrawer(false)}>
        {/* <Sidebar /> */}
      </Drawer>
      <Dialog
        open={openLogoutModal}
        onClose={() => setopenLogoutModal(false)}
        fullWidth
        slotProps={{
          paper: {
            sx: {
              maxWidth: {
                xs: 'unset',
                md: '458px',
              },
            },
          },
        }}
      >
        <IllustrationCard
          variant="error"
          // src={IMAGE_WARM_LEAVE_80x80}
          title={t('dialog__logout_title')}
          // loading={loading}
          okText={t('dialog__logout_cta_logout')}
          cancelText={t('dialog__exit_cta_cancle')}
          onCancel={() => setopenLogoutModal(false)}
          onOk={() => {
            setopenLogoutModal(false);
            handleLogout();
          }}
        />
      </Dialog>
      {/* <LoadingModal loading={isLoadingNotifications || fetchPersonalInfoLoading} /> */}
      <Drawer
        anchor="right"
        open={isNotificationDrawerOpen}
        // onClose={handleNotificationDrawerClose}
        slotProps={{
          paper: {
            className: 'rounded-tl-general-l rounded-bl-general-l',
            sx: { width: '475px' },
          },
        }}
      >
        {/* <NotificationPanel
          onClose={handleNotificationDrawerClose}
          onViewTask={(taskId) => {
            dispatch(setTaskId(taskId));
          }}
        /> */}
      </Drawer>
      <Drawer
        anchor="right"
        open={isPersonalProfileDrawerOpen}
        onClose={() => setIsPersonalProfileDrawerOpen(false)}
        slotProps={{
          paper: {
            className: 'rounded-tl-general-l rounded-bl-general-l',
            sx: { width: '475px' },
          },
        }}
      >
        {/* <PersonalProfile
          onClose={() => setIsPersonalProfileDrawerOpen(false)}
          staff={personInfo?.data}
          onPersonalUpdated={() => {
            fetchPersonalInfo(auth?.userSnapshot?.userId??'');
          }}
          onLogoutClick={() => setopenLogoutModal(true)}
        /> */}
      </Drawer>
    </>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
