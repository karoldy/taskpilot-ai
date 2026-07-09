import { useState, useEffect, useCallback } from 'react';
import tokens from '@/tokens/base';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema, forgotPasswordSchema, registerSchema } from '@taskpilot/common';
import type {
  LoginFormValues,
  ForgotPasswordFormValues,
  RegisterFormValues,
} from '@taskpilot/common';
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
} from '@/generated/graphql';
import emitter from '@/lib/eventBus';

type AuthTab = 'login' | 'forgot';

// ==============================
// Shared Styles
// ==============================

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: tokens.borderRadiusGeneralM,
    backgroundColor: tokens.colorBackgroundComponentPrimary,
    '& .MuiOutlinedInput-input': {
      padding: `${tokens.spaceComponentFieldPaddingYM} ${tokens.spaceComponentFieldPaddingX}`,
      fontSize: tokens.fontSizeXxs,
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
  '& .MuiFormHelperText-root': {
    fontSize: tokens.fontSizeXxs,
    marginLeft: 0,
    marginRight: 0,
  },
};

const fieldLabelSx = {
  fontSize: tokens.fontSizeXxs,
  fontWeight: tokens.fontWeightSemibold,
  color: tokens.colorTextDescription,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  mb: tokens.spaceGeneralGapXs,
};

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

const checkboxSx = {
  color: tokens.colorBorderFuncational,
  '&.Mui-checked': {
    color: tokens.colorBackgroundComponentHighlight,
  },
};

const submitButtonSx = {
  py: tokens.spaceComponentButtonPaddingYM,
  borderRadius: tokens.borderRadiusGeneralM,
  fontSize: tokens.fontSizeXxs,
  fontWeight: tokens.fontWeightSemibold,
  textTransform: 'none',
  bgcolor: tokens.colorBackgroundComponentHighlight,
  '&:hover': {
    bgcolor: tokens.colorBackgroundComponentHighlightHover,
  },
};

// ==============================
// Helpers
// ==============================

function fieldHelperText(
  error: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined,
  t: (key: string) => string,
): string {
  return error?.message ? t(String(error.message)) : ' ';
}

// ==============================
// Inline SVG Icons
// ==============================

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20}>
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  );
}

function OrDivider({ t }: { t: (key: string) => string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spaceGeneralGapL,
        my: tokens.spaceGeneralGapXs,
      }}
    >
      <Box sx={{ flex: 1, height: 1, bgcolor: tokens.colorBorderDecorativeGrey }} />
      <Typography
        variant="body3"
        sx={{ color: tokens.colorTextPlaceholder, textTransform: 'lowercase' }}
      >
        {t('web_auth__divider_or')}
      </Typography>
      <Box sx={{ flex: 1, height: 1, bgcolor: tokens.colorBorderDecorativeGrey }} />
    </Box>
  );
}

function OAuthButtons({ t }: { t: (key: string) => string }) {
  return (
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
  );
}

// ==============================
// Brand Panel
// ==============================

function BrandPanel({ t }: { t: (key: string) => string }) {
  return (
    <Box
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: tokens.spaceGeneralPaddingXxxl,
        position: 'relative',
        overflow: 'hidden',
        borderRight: `1px solid ${tokens.colorBorderDecorativeGrey}`,
        background: `radial-gradient(ellipse at 60% 40%, ${tokens.colorBackgroundComponentSemanticOngoing} 0%, transparent 60%),
                      radial-gradient(ellipse at 40% 70%, ${tokens.colorBackgroundComponentPrimaryHover} 0%, transparent 50%),
                      ${tokens.colorBackgroundComponentPrimary}`,
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          left: -40,
          width: 200,
          height: 200,
          borderRadius: tokens.borderRadiusGeneralAllRound,
          bgcolor: tokens.colorBackgroundComponentHighlight,
          opacity: 0.08,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 80,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: tokens.borderRadiusGeneralAllRound,
          bgcolor: tokens.colorTextHighlight,
          opacity: 0.08,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 200,
          right: 80,
          width: 60,
          height: 60,
          borderRadius: tokens.borderRadiusGeneralAllRound,
          bgcolor: tokens.colorTextButton,
          opacity: 0.08,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 420 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            mx: 'auto',
            mb: tokens.spaceGeneralGapXl,
            bgcolor: tokens.colorBackgroundComponentHighlight,
            borderRadius: tokens.borderRadiusGeneralXl,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: tokens.fontWeightBold,
            fontSize: tokens.fontSizeMl,
            color: tokens.colorNeutralWhite100,
            boxShadow: `0 0 60px ${tokens.colorBackgroundComponentHighlight}4d`,
          }}
        >
          T
        </Box>

        <Typography
          variant="heading1"
          sx={{ mb: tokens.spaceGeneralGapS, fontWeight: tokens.fontWeightBold }}
        >
          {t('web_auth__brand_title')}{' '}
          <Box component="span" sx={{ color: tokens.colorTextButton }}>
            {t('web_auth__brand_title_highlight')}
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: tokens.spaceGeneralGapXxxl,
            color: tokens.colorTextSecondary,
            lineHeight: tokens.lineHeight120,
          }}
        >
          {t('web_auth__brand_desc')}
        </Typography>

        <Stack sx={{ gap: tokens.spaceGeneralGapL, textAlign: 'left' }}>
          <FeatureItem
            emoji="📋"
            bgColor={`${tokens.colorBackgroundComponentHighlight}26`}
            title={t('web_auth__feature_1_title')}
            desc={t('web_auth__feature_1_desc')}
          />
          <FeatureItem
            emoji="📊"
            bgColor={`${tokens.colorSuccessGreen50}26`}
            title={t('web_auth__feature_2_title')}
            desc={t('web_auth__feature_2_desc')}
          />
          <FeatureItem
            emoji="🤖"
            bgColor={`${tokens.colorBackgroundComponentHighlight}26`}
            title={t('web_auth__feature_3_title')}
            desc={t('web_auth__feature_3_desc')}
          />
        </Stack>
      </Box>
    </Box>
  );
}

function FeatureItem({
  emoji,
  bgColor,
  title,
  desc,
}: {
  emoji: string;
  bgColor: string;
  title: string;
  desc: string;
}) {
  return (
    <Box sx={{ display: 'flex', gap: tokens.spaceGeneralGapL, alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: tokens.borderRadiusGeneralL,
          bgcolor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: tokens.fontSizeS,
        }}
      >
        {emoji}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: tokens.fontWeightSemibold, mb: '2px' }}>
          {title}
        </Typography>
        <Typography
          variant="body3"
          sx={{ color: tokens.colorTextDescription, lineHeight: tokens.lineHeight120 }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

// ==============================
// Password Field
// ==============================

function PasswordField({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  autoComplete,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder: string;
  error?: boolean;
  helperText?: string;
  autoComplete?: string;
  id?: string;
}) {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  return (
    <TextField
      fullWidth
      id={id}
      type={show ? 'text' : 'password'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      helperText={helperText || ' '}
      autoComplete={autoComplete}
      sx={textFieldSx}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShow((prev) => !prev)}
                aria-label={show ? t('web_login__hide_password') : t('web_login__show_password')}
                edge="end"
                size="small"
                sx={{ color: tokens.colorTextPlaceholder }}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

// ==============================
// Register Dialog
// ==============================

function RegisterDialog({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const [registerMut, { loading }] = useRegisterMutation();

  const { control, handleSubmit, reset } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreedTerms: false,
    },
  });

  const onSubmit = useCallback(
    async (data: RegisterFormValues) => {
      try {
        const { data: result } = await registerMut({
          variables: {
            input: {
              displayName: data.name.trim(),
              email: data.email.trim(),
              password: data.password,
            },
          },
        });
        if (result?.register?.accessToken) {
          localStorage.setItem('accessToken', result.register.accessToken);
          emitter.emit('login:success', { accessToken: result.register.accessToken });
          onSuccess();
        }
      } catch {
        // Error handled silently — user can retry
      }
    },
    [registerMut, onSuccess],
  );

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: tokens.borderRadiusGeneralXl,
            bgcolor: tokens.colorBackgroundPagePrimary,
            maxWidth: 440,
          },
        },
      }}
    >
      <DialogContent sx={{ p: tokens.spaceGeneralPaddingXxxl }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack sx={{ gap: tokens.spaceGeneralGapL }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: tokens.fontWeightBold,
                textAlign: 'center',
                mb: tokens.spaceGeneralGapS,
              }}
            >
              {t('web_auth__btn_register')}
            </Typography>

            {/* Name + Username row */}
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spaceGeneralGapL }}
            >
              <Box>
                <Typography sx={fieldLabelSx}>{t('web_auth__label_name')}</Typography>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      fullWidth
                      {...field}
                      placeholder={t('web_auth__placeholder_name')}
                      error={!!fieldState.error}
                      helperText={fieldHelperText(fieldState.error, t)}
                      autoComplete="name"
                      autoFocus
                      sx={textFieldSx}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography sx={fieldLabelSx}>{t('web_auth__label_username')}</Typography>
                <Controller
                  name="username"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      fullWidth
                      {...field}
                      placeholder={t('web_auth__placeholder_username')}
                      error={!!fieldState.error}
                      helperText={fieldHelperText(fieldState.error, t)}
                      autoComplete="username"
                      sx={textFieldSx}
                    />
                  )}
                />
              </Box>
            </Box>

            {/* Email */}
            <Box>
              <Typography sx={fieldLabelSx}>{t('web_login__email_label')}</Typography>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    type="email"
                    {...field}
                    placeholder={t('web_login__email_placeholder')}
                    error={!!fieldState.error}
                    helperText={fieldHelperText(fieldState.error, t)}
                    autoComplete="email"
                    sx={textFieldSx}
                  />
                )}
              />
            </Box>

            {/* Password */}
            <Box>
              <Typography sx={fieldLabelSx}>{t('web_login__password_label')}</Typography>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <PasswordField
                    id="register-dialog-password"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('web_login__password_placeholder')}
                    error={!!fieldState.error}
                    helperText={fieldHelperText(fieldState.error, t)}
                    autoComplete="new-password"
                  />
                )}
              />
            </Box>

            {/* Confirm Password */}
            <Box>
              <Typography sx={fieldLabelSx}>{t('web_auth__label_confirm_password')}</Typography>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    type="password"
                    {...field}
                    placeholder={t('web_auth__placeholder_confirm_password')}
                    error={!!fieldState.error}
                    helperText={fieldHelperText(fieldState.error, t)}
                    autoComplete="new-password"
                    sx={textFieldSx}
                  />
                )}
              />
            </Box>

            {/* Terms checkbox */}
            <Controller
              name="agreedTerms"
              control={control}
              render={({ field }) => (
                <Box
                  component="label"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: tokens.spaceGeneralGapXs,
                    fontSize: tokens.fontSizeXxs,
                    color: tokens.colorTextSecondary,
                    cursor: 'pointer',
                    mb: `-${tokens.spaceGeneralGapS}`,
                  }}
                >
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    size="small"
                    sx={checkboxSx}
                  />
                  {t('web_auth__terms_prefix')}{' '}
                  <Box component="span" sx={{ color: tokens.colorTextButton }}>
                    {t('web_auth__terms_of_service')}
                  </Box>{' '}
                  {t('web_auth__terms_and')}{' '}
                  <Box component="span" sx={{ color: tokens.colorTextButton }}>
                    {t('web_auth__privacy_policy')}
                  </Box>
                </Box>
              )}
            />

            {/* Submit */}
            <Button
              fullWidth
              variant="contained"
              disableRipple
              disabled={loading}
              loading={loading}
              type="submit"
              sx={submitButtonSx}
            >
              {loading ? '' : t('web_auth__btn_register')}
            </Button>

            <OrDivider t={t} />
            <OAuthButtons t={t} />

            <Box
              sx={{
                textAlign: 'center',
                fontSize: tokens.fontSizeXxs,
                color: tokens.colorTextSecondary,
                mt: tokens.spaceGeneralGapXl,
              }}
            >
              {t('web_auth__register_footer')}{' '}
              <Box
                component="span"
                onClick={handleClose}
                sx={{
                  color: tokens.colorTextButton,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {t('web_auth__register_footer_link')}
              </Box>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// ==============================
// Main Page Component
// ==============================

export default function Page() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ---- Tab state ----
  const [tab, setTab] = useState<AuthTab>('login');
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // ---- Mutations ----
  const [loginMut, { loading: loginLoading }] = useLoginMutation();
  const [forgotMut, { loading: forgotLoading }] = useForgotPasswordMutation();

  // ---- Login form (zod) ----
  const { control: loginControl, handleSubmit: handleLoginSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  // ---- Forgot password form (zod) ----
  const { control: forgotControl, handleSubmit: handleForgotSubmit } =
    useForm<ForgotPasswordFormValues>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: { email: '' },
    });

  // ---- Redirect if already logged in ----
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  // ---- Login submit ----
  const onLoginSubmit = useCallback(
    async (data: LoginFormValues) => {
      try {
        const { data: result } = await loginMut({
          variables: {
            input: { email: data.email.trim(), password: data.password },
          },
        });
        if (result?.login?.accessToken) {
          localStorage.setItem('accessToken', result.login.accessToken);
          emitter.emit('login:success', { accessToken: result.login.accessToken });
          navigate('/');
        }
      } catch (_err) {
        const message = _err instanceof Error ? _err.message : String(_err);
        emitter.emit('login:error', { message });
      }
    },
    [loginMut, navigate],
  );

  // ---- Forgot password submit ----
  const onForgotSubmit = useCallback(
    async (data: ForgotPasswordFormValues) => {
      try {
        await forgotMut({
          variables: { input: { email: data.email.trim() } },
        });
        setForgotSuccess(true);
      } catch {
        setForgotSuccess(true);
      }
    },
    [forgotMut],
  );

  // ---- Clear server error on field change ----
  const handleFieldChange = useCallback(() => {
    setServerError(null);
  }, []);

  // ---- Listen for login errors via event bus ----
  useEffect(() => {
    const onLoginError = (payload: { message: string }) => {
      setServerError(payload.message);
    };
    emitter.on('login:error', onLoginError);
    return () => {
      emitter.off('login:error', onLoginError);
    };
  }, []);

  // ---- Tab switch helpers ----
  const switchToForgot = useCallback(() => {
    setServerError(null);
    setForgotSuccess(false);
    setTab('forgot');
  }, []);

  const switchToLogin = useCallback(() => {
    setServerError(null);
    setForgotSuccess(false);
    setTab('login');
  }, []);

  // ---- Render ----

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        bgcolor: tokens.colorBackgroundPagePrimary,
      }}
    >
      <BrandPanel t={t} />

      <Box
        sx={{
          width: { xs: '100%', md: 520 },
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: tokens.spaceGeneralPaddingXxxl,
          bgcolor: tokens.colorBackgroundPagePrimary,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 380 }}>
          {/* ============================
              Login Form
              ============================ */}
          {tab === 'login' && (
            <Box component="form" onSubmit={handleLoginSubmit(onLoginSubmit)}>
              <Stack sx={{ gap: tokens.spaceGeneralGapL }}>
                {serverError && (
                  <Alert
                    severity="error"
                    variant="filled"
                    sx={{ borderRadius: tokens.borderRadiusGeneralS }}
                  >
                    {t('web_login__error_login_failed')}
                  </Alert>
                )}

                {/* Email */}
                <Box>
                  <Typography sx={fieldLabelSx}>{t('web_login__email_label')}</Typography>
                  <Controller
                    name="email"
                    control={loginControl}
                    render={({ field, fieldState }) => (
                      <TextField
                        fullWidth
                        type="email"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange();
                        }}
                        placeholder={t('web_login__email_placeholder')}
                        error={!!fieldState.error}
                        helperText={fieldHelperText(fieldState.error, t)}
                        autoComplete="email"
                        autoFocus
                        sx={textFieldSx}
                      />
                    )}
                  />
                </Box>

                {/* Password */}
                <Box>
                  <Typography sx={fieldLabelSx}>{t('web_login__password_label')}</Typography>
                  <Controller
                    name="password"
                    control={loginControl}
                    render={({ field, fieldState }) => (
                      <PasswordField
                        id="login-password"
                        value={field.value}
                        onChange={(v) => {
                          field.onChange(v);
                          handleFieldChange();
                        }}
                        onBlur={field.onBlur}
                        placeholder={t('web_login__password_placeholder')}
                        error={!!fieldState.error}
                        helperText={fieldHelperText(fieldState.error, t)}
                        autoComplete="current-password"
                      />
                    )}
                  />
                </Box>

                {/* Remember me + Forgot password */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Controller
                    name="remember"
                    control={loginControl}
                    render={({ field }) => (
                      <Box
                        component="label"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: tokens.spaceGeneralGapXs,
                          fontSize: tokens.fontSizeXxs,
                          color: tokens.colorTextSecondary,
                          cursor: 'pointer',
                        }}
                      >
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                          size="small"
                          sx={checkboxSx}
                        />
                        {t('web_auth__remember_me')}
                      </Box>
                    )}
                  />
                  <Box
                    component="button"
                    onClick={switchToForgot}
                    sx={{
                      fontSize: tokens.fontSizeXxs,
                      color: tokens.colorTextButton,
                      bgcolor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: tokens.fontFamilyBody,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {t('web_auth__forgot_password_link')}
                  </Box>
                </Box>

                {/* Submit button */}
                <Button
                  fullWidth
                  variant="contained"
                  disableRipple
                  disabled={loginLoading}
                  loading={loginLoading}
                  type="submit"
                  sx={submitButtonSx}
                >
                  {loginLoading ? '' : t('web_auth__tab_login')}
                </Button>

                <OrDivider t={t} />
                <OAuthButtons t={t} />

                <Box
                  sx={{
                    textAlign: 'center',
                    fontSize: tokens.fontSizeXxs,
                    color: tokens.colorTextSecondary,
                    mt: tokens.spaceGeneralGapXl,
                  }}
                >
                  {t('web_auth__login_footer')}{' '}
                  <Box
                    component="span"
                    onClick={() => setRegisterOpen(true)}
                    sx={{
                      color: tokens.colorTextButton,
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {t('web_auth__login_footer_link')}
                  </Box>
                </Box>
              </Stack>
            </Box>
          )}

          {/* ============================
              Forgot Password Form
              ============================ */}
          {tab === 'forgot' && (
            <Box component="form" onSubmit={handleForgotSubmit(onForgotSubmit)}>
              <Stack sx={{ gap: tokens.spaceGeneralGapL }}>
                {forgotSuccess ? (
                  <Alert
                    severity="success"
                    variant="outlined"
                    icon={
                      <svg
                        viewBox="0 0 18 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        width={18}
                        height={18}
                      >
                        <circle cx="9" cy="9" r="8" />
                        <polyline points="6 9 8 11 12 7" />
                      </svg>
                    }
                    sx={{
                      borderRadius: tokens.borderRadiusGeneralM,
                      borderColor: tokens.colorBorderSemanticSuccess,
                      color: tokens.colorSuccessGreen50,
                      bgcolor: tokens.colorSuccessGreen10,
                    }}
                  >
                    {t('web_auth__forgot_success')}
                  </Alert>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: tokens.fontWeightBold, textAlign: 'center' }}
                    >
                      {t('web_auth__forgot_title')}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: tokens.colorTextSecondary,
                        textAlign: 'center',
                        mb: tokens.spaceGeneralGapL,
                      }}
                    >
                      {t('web_auth__forgot_subtitle')}
                    </Typography>

                    <Box>
                      <Typography sx={fieldLabelSx}>{t('web_login__email_label')}</Typography>
                      <Controller
                        name="email"
                        control={forgotControl}
                        render={({ field, fieldState }) => (
                          <TextField
                            fullWidth
                            type="email"
                            {...field}
                            placeholder={t('web_login__email_placeholder')}
                            error={!!fieldState.error}
                            helperText={fieldHelperText(fieldState.error, t)}
                            autoComplete="email"
                            autoFocus
                            sx={textFieldSx}
                          />
                        )}
                      />
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      disableRipple
                      disabled={forgotLoading}
                      loading={forgotLoading}
                      type="submit"
                      sx={submitButtonSx}
                    >
                      {forgotLoading ? '' : t('web_auth__btn_send_reset')}
                    </Button>
                  </>
                )}

                <Box
                  sx={{
                    textAlign: 'center',
                    fontSize: tokens.fontSizeXxs,
                    color: tokens.colorTextSecondary,
                  }}
                >
                  <Box
                    component="span"
                    onClick={switchToLogin}
                    sx={{
                      color: tokens.colorTextButton,
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    ← {t('web_auth__forgot_back')}
                  </Box>
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>

      <RegisterDialog
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSuccess={() => {
          setRegisterOpen(false);
          navigate('/');
        }}
      />
    </Box>
  );
}
