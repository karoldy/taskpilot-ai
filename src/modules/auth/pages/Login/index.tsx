import { useState, useEffect, useCallback } from 'react';
import tokens from '@/tokens/base';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import { Eye, EyeOff, Mail } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { useLoginMutation } from '@/generated/graphql';
import emitter from '@/lib/eventBus';
import DesktopPageLogin from '@/assets/images/BG_1440x980_Desktop_Page_Login.webp';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Page() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  // Login mutation
  const [login, { loading }] = useLoginMutation();

  // Server error state (driven by event bus)
  const [serverError, setServerError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  // Validation
  const emailError =
    touched.email && !email.trim()
      ? t('web_login__error_email_required')
      : touched.email && !EMAIL_REGEX.test(email)
        ? t('web_login__error_email_invalid')
        : '';

  const passwordError =
    touched.password && !password
      ? t('web_login__error_password_required')
      : touched.password && password.length < 6
        ? t('web_login__error_password_min')
        : '';

  const isFormValid =
    !!email.trim() && EMAIL_REGEX.test(email) && !!password && password.length >= 6;

  // Handlers
  const handleBlur = useCallback(
    (field: 'email' | 'password') => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    // Mark all fields as touched to trigger validation display
    setTouched({ email: true, password: true });
    if (!isFormValid) return;

    try {
      const { data } = await login({
        variables: {
          input: { email: email.trim(), password },
        },
      });

      if (data?.login?.accessToken) {
        localStorage.setItem('accessToken', data.login.accessToken);
        emitter.emit('login:success', { accessToken: data.login.accessToken });
        navigate('/');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      emitter.emit('login:error', { message });
    }
  }, [email, password, isFormValid, login, navigate]);

  // Listen for login errors via event bus
  useEffect(() => {
    const onLoginError = (payload: { message: string }) => {
      setServerError(payload.message);
    };
    emitter.on('login:error', onLoginError);
    return () => {
      emitter.off('login:error', onLoginError);
    };
  }, []);

  // Allow Enter key to submit
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !loading) {
        handleSubmit();
      }
    },
    [handleSubmit, loading],
  );

  // Shared text field styling
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: tokens.borderRadiusGeneralXxxl,
      backgroundColor: tokens.colorNeutralWhite100,
      '& .MuiOutlinedInput-input': {
        padding: `${tokens.spaceComponentFieldPaddingYM} ${tokens.spaceComponentFieldPaddingX}`,
        fontSize: tokens.fontSizeS,
        fontFamily: tokens.fontFamilyBody,
        fontWeight: tokens.fontWeightRegular,
        lineHeight: tokens.lineHeight120,
        '&::placeholder': {
          color: tokens.colorTextPlaceholder,
          opacity: 1,
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: tokens.colorBorderFuncational,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: tokens.colorBorderFuncationalPressed,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: tokens.colorBorderFuncationalPressed,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: tokens.colorBorderFunctionalError,
      },
    },
  };

  return (
    <Stack
      sx={{
        position: 'relative',
        flexGrow: 1,
      }}
    >
      {/* Background image */}
      <img
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        alt="Desktop_Page_Login"
        src={DesktopPageLogin}
      />

      {/* Centered login card */}
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
          {/* Title */}
          <Typography variant="heading1" color="text.primary" align="center">
            {t('web_login__title')}
          </Typography>

          {/* Login form */}
          <Stack
            sx={{
              gap: tokens.spaceGeneralGapL,
              width: '100%',
            }}
            onKeyDown={handleKeyDown}
          >
            {/* Server error */}
            {serverError && (
              <Alert
                severity="error"
                variant="filled"
                sx={{ borderRadius: tokens.borderRadiusGeneralS }}
              >
                {t('web_login__error_login_failed')}
              </Alert>
            )}

            {/* Email field */}
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => {
                setServerError(null);
                setEmail(e.target.value);
              }}
              onBlur={handleBlur('email')}
              placeholder={t('web_login__email_placeholder')}
              error={!!emailError}
              helperText={emailError || ' '}
              autoComplete="email"
              autoFocus
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} color={tokens.colorTextPlaceholder} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputSx}
            />

            {/* Password field */}
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setServerError(null);
                setPassword(e.target.value);
              }}
              onBlur={handleBlur('password')}
              placeholder={t('web_login__password_placeholder')}
              error={!!passwordError}
              helperText={passwordError || ' '}
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword
                            ? t('web_login__hide_password')
                            : t('web_login__show_password')
                        }
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputSx}
            />

            {/* Login button */}
            <Button
              size="large"
              variant="contained"
              fullWidth
              disableRipple
              disabled={loading}
              loading={loading}
              loadingPosition="start"
              onClick={handleSubmit}
            >
              {loading ? '' : t('web_login__cta_login')}
            </Button>

            {/* Forget Password */}
            <Button
              size="large"
              variant="text"
              fullWidth
              onClick={() => {
                window.location.href = 'https://sspm.hongkongairport.com/sspr/private/login';
              }}
            >
              {t('web_login__forget_pw')}
            </Button>
          </Stack>

          {/* T&C + Version */}
          <Stack
            sx={{
              gap: tokens.spaceGeneralGapXxs,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: tokens.spaceGeneralGapXxs,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Typography
                className="shrink-0"
                variant="body3"
                color="text.secondary"
                sx={{ fontSize: tokens.fontSizeXxs }}
              >
                {t('web_login__tnc')}
              </Typography>
              <Typography
                variant="body3Highlight"
                className="underline line-clamp-2 cursor-pointer"
                sx={{
                  fontSize: tokens.fontSizeXxs,
                  color: tokens.colorCtaBlue70,
                  '&:hover': {
                    color: tokens.colorCtaBlue80,
                  },
                  '&:active': {
                    color: tokens.colorCtaBlue90,
                  },
                }}
              >
                {t('web_login__tnc_link')}
              </Typography>
            </Box>
            <Typography
              variant="body3"
              color="text.description"
              sx={{ fontSize: tokens.fontSizeXxs }}
            >
              {t('web_login__ver_no', { '0': __APP_VERSION__ })}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Footer />
    </Stack>
  );
}
