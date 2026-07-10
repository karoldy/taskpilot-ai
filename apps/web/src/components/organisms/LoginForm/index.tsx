import { type FC, useState, useCallback } from "react";
import tokens from '@/tokens/base';
import { textField, oauthButton, containedButton, typography } from '@/tokens/style';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import emitter from '@/lib/eventBus';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLoginMutation } from '@/generated/graphql';
import { setAuthTokens } from '@/lib/auth';
import { useAuthStore } from '@/stores';
import { Eye, EyeOff } from 'lucide-react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import GoogleIcon from '@/components/atoms/GoogleIcon';
import GitHubIcon from '@/components/atoms/GitHubIcon';
import LanguagePicker from "@/components/molecules/Pickers/LanguagePicker";

const loginSchema = z.object({
  email: z
    .email('web_login__error_email_invalid')
    .min(1, 'web_login__error_email_required'),
  password: z
    .string()
    .min(1, 'web_login__error_password_required')
    .min(6, 'web_login__error_password_min'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userStore = useAuthStore.getState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { loading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(p => !p);
  }, []);

  const onSubmit = useCallback(
    async (data: LoginFormValues) => {
      const variables = {
        input: {
          email: data.email,
          password: data.password,
        },
      };
      const result = await login({ variables });
      if (result?.data?.login) {
        const { accessToken, refreshToken, user } = result.data.login;
        setAuthTokens({ accessToken, refreshToken });
        userStore.setUser(user);
        navigate('/');
      }
    },
    [],
  );

  return (
    <Stack
      sx={{
        gap: tokens.spaceGeneralGapXxl,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%'
        }}
      >
        <LanguagePicker />
      </Box>
      <Typography
        align="center"
        sx={{
          ...typography.heading1,
          color: tokens.colorTextPrimary
        }}
      >
        Workforce Management System
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          gap: tokens.spaceGeneralGapL,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          fullWidth
          label={t('web_form_field_email_label')}
          placeholder={t('web_form_field_email_placeholder')}
          type="email"
          sx={textField}
          {...register('email')}
          autoComplete="off"
          error={!!errors.email}
          helperText={errors.email?.message ? t(errors.email.message) : undefined}
        />
        <TextField
          fullWidth
          label={t('web_form_field_password_label')}
          placeholder={t('web_form_field_password_placeholder')}
          type={showPassword ? 'text' : 'password'}
          sx={textField}
          {...register('password')}
          autoComplete="off"
          error={!!errors.password}
          helperText={errors.password?.message ? t(errors.password.message) : undefined}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
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
            {t('web_link_forget_password')}
          </Box>
        </Box>
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          disableRipple
          loading={loading}
          loadingPosition="start"
          sx={containedButton}
        >
          {t('web_cta_login')}
        </Button>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', gap: tokens.spaceGeneralGapS }}>
          <Button
            fullWidth
            variant="outlined"
            disableRipple
            startIcon={<GoogleIcon />}
            sx={oauthButton}
            onClick={() => {
              emitter.emit('function:stay:show', {
                title: t('web_title_function_is_currently_under_development'),
                subtitle: t('web_subtitle_stay_tuned'),
                variant: 'info',
              });
            }}
          >
            {t('web_cta_oauth_google')}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            disableRipple
            startIcon={<GitHubIcon />}
            sx={oauthButton}
            onClick={() => {
              emitter.emit('function:stay:show', {
                title: t('web_title_function_is_currently_under_development'),
                subtitle: t('web_subtitle_stay_tuned'),
                variant: 'info',
              });
            }}
          >
            {t('web_cta_oauth_github')}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}

LoginForm.displayName = 'LoginForm';
export default LoginForm;
