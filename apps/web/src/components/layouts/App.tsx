import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router/dom';
import { ApolloProvider } from '@apollo/client/react';
import FeedbackDialog from '@/components/organisms/FeedbackDialog';
import apolloClient from '@/config/apollo.config';
import theme from '@/config/theme.config';
import i18n from '@/locales';
import routers from '@/routers';
import "@/config/dayjs.config";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={routers} />
          <FeedbackDialog />
        </ThemeProvider>
      </I18nextProvider>
    </ApolloProvider>
  );
}
