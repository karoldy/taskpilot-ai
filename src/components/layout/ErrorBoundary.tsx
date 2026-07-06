import { useRouteError } from 'react-router';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import IllustrationCard from '@/components/molecules/IllustrationCard';

export default function ErrorBoundary() {
  const { t } = useTranslation();
  const error: unknown = useRouteError();
  console.log('error router', error);

  return (
    <Dialog
      open
      fullWidth
      maxWidth="xs"
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
        variant="info"
        src={new URL('@/assets/Illustration/Warm/Img_80x80_Warm_Action.svg', import.meta.url).href}
        title="Error"
        subtitle={t('dialog__servererror_subtitle')}
        okText={t('dialog__servererror_cta_retry')}
        onOk={() => {
          window.location.reload();
        }}
      />
    </Dialog>
  );
}
