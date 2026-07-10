import { useEffect } from 'react';
import tokens from '@/tokens/base';
import { typography } from '@/tokens/style';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '@/lib/auth';
import { useAuthStore } from '@/stores';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Footer from '@/components/layouts/Footer';
import LoginForm from "@/components/organisms/LoginForm";
import DesktopPageLogin from '@/assets/images/BG_1440x980_Desktop_Page_Login.webp';

export default function Page() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
      return;
    }
    useAuthStore.getState().clearUser();
  }, []);

  return (
    <>
      <Stack
        sx={{
          position: 'relative',
          flexGrow: 1,
        }}
      >
        <img
          alt="Desktop_Page_Login"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={DesktopPageLogin}
        />
        <Stack
          sx={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: tokens.spaceGobalScale24,
            zIndex: 1,
          }}
        >
          <Stack
            sx={{
              gap: tokens.spaceGeneralPaddingXxxl,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: 500,
              padding: tokens.spaceGeneralPaddingXxxl,
              borderRadius: tokens.borderRadiusGeneralXxxl,
              background: `linear-gradient(138.92deg, #FFFFFF 43.65%, #E4F5F6 89.73%)`,
            }}
          >
            <LoginForm />
            <Typography
              sx={{
                ...typography.body3,
                color: tokens.colorTextDescription
              }}
            >
              {t('web_version_no', { '0': __APP_VERSION__ || '1.0.0' })}
            </Typography>
          </Stack>
        </Stack>
        <Footer />
      </Stack>
    </>
  );
}
