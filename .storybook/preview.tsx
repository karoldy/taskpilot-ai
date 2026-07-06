import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import theme from '@/config/theme.config';
import i18n from '@/locales';
import '@/styles/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    viewport: {
      viewports: {
        xs: { name: 'XS', styles: { width: '375px', height: '100%' } },
        sm: { name: 'SM', styles: { width: '640px', height: '100%' } },
        md: { name: 'MD', styles: { width: '768px', height: '100%' } },
        lg: { name: 'LG', styles: { width: '1024px', height: '100%' } },
        xl: { name: 'XL', styles: { width: '1280px', height: '100%' } },
        xxl: { name: 'XXL', styles: { width: '1560px', height: '100%' } },
      },
    },

    a11y: {
      test: 'todo',
    },
  },

  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </I18nextProvider>
    ),
  ],
};

export default preview;
