import * as React from 'react';
// import clsx from "clsx";
import { ROOT_PATH } from '@/routers/path';
// import { IMAGE_WARM_LEAVE_80x80 } from '@/constants/image';
import tokens from '@/tokens/base';
// import { useAppSelector } from "@/hooks/useReduxSlice";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
// import { useRequest } from "alova/client";
// import { smalLogout } from "@/modules/auth/api";
// import { Icon } from "@iconify/react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  FolderGit2,
  ListChecks,
  UserStar,
  CalendarDays,
  NotebookPen,
  LayoutDashboard,
} from 'lucide-react';
import Box from '@mui/material/Box';
import Stack, { type StackProps } from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Sidebar from "@/components/layout/Sidebar";
// import VIcon from "@/components/atoms/VIcon";
// import LanguagePicker from "@/components/molecules/Pickers/LanguagePicker";
// import FontSizePicker from "@/components/molecules/Pickers/FontSizePicker";
import IllustrationCard from '../molecules/IllustrationCard';
// import PersonalProfile from "@/modules/auth/components/PersonalProfile";
// import NotificationPanel from "@/modules/notification/components/NotificationPanel";
// import { getPersonalInfo } from "@/modules/staff/api";
// import { usePermission } from '@/hooks/usePermission';
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "@/stores";
// import {
//   fetchNotificationCount,
//   fetchNotificationList,
//   resetNotifications,
//   markAllNotificationsRead,
//   checkNotificationUnreadIn7Days,
// } from "@/stores/slices/notificationSlice";
// import { setTaskId } from "@/stores/slices/taskSlice";
// import { logoutHandler } from '@/modules/auth/shared';
// import LoadingModal from '@/components/molecules/Loading/LoadingModal';

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
  // const navigate = useNavigate();
  // const location = useLocation();

  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [openLogoutModal, setopenLogoutModal] = React.useState<boolean>(false);
  const [isPersonalProfileDrawerOpen, setIsPersonalProfileDrawerOpen] =
    React.useState<boolean>(false);
  const [isNotificationDrawerOpen] = React.useState<boolean>(false);

  // const dispatch = useDispatch<AppDispatch>();
  // const { hasUnread } = useSelector((state: RootState) => state.notification);

  // const handleNotificationDrawerClose = React.useCallback(() => {
  //   dispatch(markAllNotificationsRead());
  //   setIsNotificationDrawerOpen(false);
  //   dispatch(resetNotifications());
  // }, [dispatch]);

  // const handleNotificationClick = async () => {
  //   try {
  //     setIsLoadingNotifications(true);
  //     await dispatch(fetchNotificationList({ page: 1 })).unwrap();
  //     await dispatch(fetchNotificationCount()).unwrap();
  //     setIsNotificationDrawerOpen(true);
  //   } catch (error) {
  //     console.error("Failed to fetch notifications", error);
  //   } finally {
  //     setIsLoadingNotifications(false);
  //   }
  // };

  // React.useEffect(() => {
  //   dispatch(checkNotificationUnreadIn7Days());

  //   const intervalId = setInterval(() => {
  //     dispatch(checkNotificationUnreadIn7Days());
  //   }, 10000);

  //   return () => clearInterval(intervalId);
  // }, [dispatch]);

  // const { loading, send: logout } = useRequest(
  //   (sessionId) => smalLogout({ sessionId }),
  //   { immediate: false }
  // );

  // const {
  //   data: personInfo,
  //   loading: fetchPersonalInfoLoading,
  //   send: fetchPersonalInfo
  // } = useRequest(
  //   (id: string) => getPersonalInfo(id),
  //   { immediate: false }
  // )
  //   .onSuccess(() => {
  //     setIsPersonalProfileDrawerOpen(true);
  //   });

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
            // onClick={handleNotificationClick}
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
            {/* <VIcon
              color={tokens.colorIconOnColor}
              icon={hasUnread ? "icon-24:bell_on" : "icon-24:bell"}
              width={24}
              height={24}
            /> */}
          </IconButton>
          <IconButton
            // onClick={() => {
            //   if (permission?.isSystemAdmin) {
            //     navigate("/setting/userRoles");
            //   }
            //   if (!permission?.isSystemAdmin && permission?.isAaAdmin) {
            //     navigate("/setting/contracts");
            //   }
            //   if (!permission?.isSystemAdmin && !permission?.isAaAdmin) {
            //     navigate("/setting/companies");
            //   }
            // }}
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
            {/* <VIcon
              color={tokens.colorIconOnColor}
              icon="icon-24:setting"
              width={24}
              height={24}
            /> */}
          </IconButton>
          {/* {!lg && (
            <>
              <LanguagePicker />
              <FontSizePicker />
            </>
          )} */}
          <Typography
            component="h6"
            noWrap
            color="text.onColor"
            variant="body1Highlight"
            sx={{
              marginLeft: '8px',
              cursor: 'pointer',
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            // onClick={() => {
            //   if (auth?.userSnapshot?.userId) {
            //     fetchPersonalInfo(auth?.userSnapshot?.userId);
            //   }
            // }}
          >
            {/* {
              i18n.language === 'en'
                ? auth?.userSnapshot?.personalInfo?.name
                : auth?.userSnapshot?.personalInfo?.chineseName || auth?.userSnapshot?.personalInfo?.name
            } */}
            System Admin
          </Typography>
          <IconButton
            onClick={() => setopenLogoutModal(true)}
            sx={{
              borderRadius: tokens.borderRadiusGeneralAllRound,
              '&:hover': {
                backgroundColor: tokens.colorFilledPrimaryHover,
              },
              '&:active': {
                backgroundColor: tokens.colorFilledPrimaryPressed,
              },
            }}
          >
            {/* <VIcon
              color={tokens.colorIconOnColor}
              icon="icon-24:chevron_down"
              width={24}
              height={24}
            /> */}
          </IconButton>
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
          // onOk={() => {
          //   const sessionId = localStorage.getItem('sessionId') ?? '';
          //   logout(sessionId)
          //     .then((res) => {
          //       if (res?.data?.redirectUrl) {
          //         window.location.href = res.data.redirectUrl;
          //       } else {
          //         navigate("/login", { replace: true });
          //       }
          //     })
          //     .catch((e) => {
          //       console.log(e);
          //       logoutHandler(() => {
          //         window.location.href = '/login';
          //       });
          //     })
          //     .finally(() => {
          //       setopenLogoutModal(false);
          //     })
          // }}
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
