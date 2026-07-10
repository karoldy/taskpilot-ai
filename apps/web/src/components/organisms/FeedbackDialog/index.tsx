import type { AppEvents } from '@/lib/eventBus';
import { useState, useEffect } from 'react';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IllustrationCard from '@/components/molecules/IllustrationCard';
import type { IIllustrationCardProps } from '@/components/molecules/IllustrationCard';
import emitter from '@/lib/eventBus';
import i18n from "@/locales";

export type FeedbackPayload = Pick<
  IIllustrationCardProps,
  'variant' | 'type' | 'name' | 'size' | 'title' | 'subtitle' | 'okText' | 'cancelText' | 'onOk' | 'onCancel'
>;

type FeedbackEvent = Extract<
  keyof AppEvents,
  'graphql:error:forbidden'
  | 'graphql:error:server'
  | 'graphql:error:network'
  | 'feedback:show'
  | 'function:stay:show'
  | 'login:error'
>;

interface FeedbackState extends FeedbackPayload {
  slotProps?: {
    dialog?: Partial<DialogProps>,
  }
}

const FEEDBACK_EVENTS: readonly FeedbackEvent[] = [
  'graphql:error:forbidden',
  'graphql:error:server',
  'graphql:error:network',
  'feedback:show',
  'function:stay:show',
  'login:error',
] as const;

const FEEDBACK_CONFIG: Record<
  FeedbackEvent,
  Pick<FeedbackPayload, 'type' | 'name' | 'size' | 'variant' | 'okText'>
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
  'feedback:show': {
    type: 'Empty',
    name: 'Empty_Shift',
    size: 80,
    variant: 'info',
    okText: i18n.t('web_cta_confirm')
  },
  'function:stay:show': {
    type: 'Empty',
    name: 'Empty_Shift',
    size: 80,
    variant: 'info',
    okText: i18n.t('web_cta_confirm')
  },
  'login:error': {
    type: 'Error',
    name: 'Error_Action',
    size: 80,
    variant: 'error',
    okText: i18n.t('web_cta_confirm'),
  },
};

export default function FeedbackDialog() {
  // const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | undefined>(undefined);

  const handleOk = async () => {
    setLoading(true);
    try {
      await feedback?.onOk?.();
      setOpen(false);
    } catch (e) {
      console.log(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    feedback?.onCancel?.();
    setFeedback(undefined);
  };

  useEffect(() => {
    const handlers = FEEDBACK_EVENTS.map((event) => {
      const handler = (payload: Partial<FeedbackPayload>) => {
        const config = FEEDBACK_CONFIG[event];
        setFeedback({
          ...config,
          ...payload,
          variant: payload.variant ?? config.variant,
        });
        setOpen(true);
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
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      {...feedback?.slotProps?.dialog}
      slotProps={{
        paper: {
          sx: {
            maxWidth: {
              xs: 'unset',
              md: '458px'
            }
          }
        },
        ...feedback?.slotProps?.dialog?.slotProps,
      }}
    >
      <DialogContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
        <IllustrationCard
          {...feedback}
          loading={loading}
          onOk={handleOk}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}

FeedbackDialog.displayName = 'FeedbackDialog';
