import { useState, useEffect, useCallback } from 'react';
import tokens from '@/tokens/base';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IllustrationCard from '@/components/molecules/IllustrationCard';
import type { IllustrationType } from '@/components/molecules/IllustrationCard';
import emitter from '@/lib/eventBus';
import type { AppEvents } from '@/lib/eventBus';

type GraphQLErrorEvent = Extract<
  keyof AppEvents,
  'graphql:error:forbidden' | 'graphql:error:server' | 'graphql:error:network'
>;

interface ErrorState {
  open: boolean;
  type: IllustrationType;
  name: string;
  size: number;
  title: string;
  variant: 'info' | 'error';
}

const ERROR_EVENTS: readonly GraphQLErrorEvent[] = [
  'graphql:error:forbidden',
  'graphql:error:server',
  'graphql:error:network',
] as const;

const ERROR_CONFIG: Record<
  GraphQLErrorEvent,
  Pick<ErrorState, 'type' | 'name' | 'size' | 'variant'>
> = {
  'graphql:error:forbidden': {
    type: 'Error',
    name: 'Identity',
    size: 80,
    variant: 'error',
  },
  'graphql:error:server': {
    type: 'Error',
    name: 'Server',
    size: 80,
    variant: 'error',
  },
  'graphql:error:network': {
    type: 'Error',
    name: 'Internet',
    size: 80,
    variant: 'error',
  },
};

export default function GraphQLErrorDialog() {
  const { t } = useTranslation();
  const [error, setError] = useState<ErrorState>({
    open: false,
    type: 'Error',
    name: 'Server',
    size: 80,
    title: '',
    variant: 'error',
  });

  const handleClose = useCallback(() => {
    setError((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    const handlers = ERROR_EVENTS.map((event) => {
      const handler = (payload: { message: string }) => {
        setError({
          open: true,
          ...ERROR_CONFIG[event],
          title: payload.message,
        });
      };
      emitter.on(event, handler);
      return { event, handler };
    });

    return () => {
      for (const { event, handler } of handlers) {
        emitter.off(event, handler);
      }
    };
  }, []);

  return (
    <Dialog
      open={error.open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: tokens.borderRadiusGeneralXxxl,
            maxWidth: 420,
            width: '100%',
          },
        },
      }}
    >
      <DialogContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
        <IllustrationCard
          type={error.type}
          name={error.name}
          size={error.size}
          title={t('web_graphql_error__title')}
          subtitle={error.title}
          variant={error.variant}
          okText={t('web_graphql_error__ok')}
          onOk={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
