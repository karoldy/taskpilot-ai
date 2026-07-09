import { useEffect } from 'react';
import tokens from '@/tokens/base';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Footer from '@/components/layouts/Footer';
import GoogleIcon from '@/components/atoms/GoogleIcon';
import GitHubIcon from '@/components/atoms/GitHubIcon';
import DesktopPageLogin from '@/assets/images/BG_1440x980_Desktop_Page_Login.webp';

const oauthButtonSx = {
  py: tokens.spaceComponentButtonPaddingYM,
  px: tokens.spaceComponentButtonPaddingXM,
  borderRadius: tokens.borderRadiusGeneralM,
  borderColor: tokens.colorBorderFuncational,
  color: tokens.colorTextSecondary,
  fontSize: tokens.fontSizeXxs,
  fontWeight: tokens.fontWeightSemibold,
  textTransform: 'none',
  '&:hover': {
    bgcolor: tokens.colorBackgroundComponentPrimaryHover,
    color: tokens.colorTextPrimary,
    borderColor: tokens.colorBorderFuncationalPressed,
  },
};

export default function Page() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/');
      return;
    }
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
          className="absolute top-0 left-0 w-full h-full object-cover"
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
              maxWidth: 700,
              padding: tokens.spaceGeneralPaddingXxxl,
              borderRadius: tokens.borderRadiusGeneralXxxl,
              background: `linear-gradient(138.92deg, #FFFFFF 43.65%, #E4F5F6 89.73%)`,
            }}
          >
            <Stack
              sx={{
                gap: tokens.spaceGeneralGapXxl,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography variant="heading1" color="text.primary" align="center">
                {t('web_login__title')}
              </Typography>
              <Stack
                sx={{
                  gap: tokens.spaceGeneralGapL,
                  width: '100%',
                }}
              >
                <TextField label="账号" />
                <TextField label="密码" />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={t('web_auth__remember_me')}
                  />
                  <Box
                    component="button"
                    sx={{
                      fontSize: tokens.fontSizeXxs,
                      color: tokens.colorTextButton,
                      bgcolor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: tokens.fontFamilyBody,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {t('web_auth__forgot_password_link')}
                  </Box>
                </Box>
                <Button
                  size="large"
                  variant="contained"
                  loadingPosition="start"
                  fullWidth
                  disableRipple
                  sx={{
                    borderRadius: tokens.borderRadiusGeneralAllRound,
                  }}
                >
                  {t('web_login__cta_login')}
                </Button>
                <Box
                  sx={{
                    textAlign: 'center',
                    fontSize: tokens.fontSizeXxs,
                    color: tokens.colorTextSecondary,
                  }}
                >
                  {t('web_auth__login_footer')}{' '}
                  <Box
                    component="span"
                    sx={{
                      color: tokens.colorTextButton,
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {t('web_auth__login_footer_link')}
                  </Box>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: 'flex', gap: tokens.spaceGeneralGapS }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    disableRipple
                    startIcon={<GoogleIcon />}
                    sx={oauthButtonSx}
                  >
                    {t('web_auth__oauth_google')}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    disableRipple
                    startIcon={<GitHubIcon />}
                    sx={oauthButtonSx}
                  >
                    {t('web_auth__oauth_github')}
                  </Button>
                </Box>
              </Stack>
            </Stack>
            <Typography
              variant="body3"
              color="text.description"
              sx={{ fontSize: tokens.fontSizeXxs }}
            >
              {t('web_login__ver_no', { '0': __APP_VERSION__ || '1.0.0' })}
            </Typography>
          </Stack>
        </Stack>
        <Footer />
      </Stack>
    </>
  );
}
