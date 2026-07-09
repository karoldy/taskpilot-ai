import { z } from 'zod';

// ==============================
// Base field schemas (rules only, no custom messages)
// ==============================

const emailField = z.email('web_login__error_email_invalid').min(1);

const loginPasswordField = z.string().min(1, 'web_login__error_password_required').min(6, 'web_login__error_password_min');

const registerPasswordField = z.string().min(1, 'web_login__error_password_required').min(8, 'web_login__error_password_min');

const nameField = z.string().min(1, 'web_auth__error_name_required');

const usernameField = z.string().min(1, 'web_auth__error_username_required');

// ==============================
// Form schemas
// ==============================

export const loginSchema = z.object({
  email: emailField,
  password: loginPasswordField,
  remember: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export const registerSchema = z
  .object({
    name: nameField,
    username: usernameField,
    email: emailField,
    password: registerPasswordField,
    confirmPassword: z.string().min(1, 'web_auth__error_confirm_password_required'),
    agreedTerms: z.boolean().refine((v) => v === true, {
      message: 'web_auth__error_terms_required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'web_auth__error_password_mismatch',
    path: ['confirmPassword'],
  });

// ==============================
// Inferred types
// ==============================

export type LoginFormValues = z.infer<typeof loginSchema>;

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export type RegisterFormValues = z.infer<typeof registerSchema>;
