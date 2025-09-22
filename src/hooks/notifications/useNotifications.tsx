import * as React from 'react';
import NotificationsContext from './NotificationsContext';

export interface ShowNotificationOptions {
  key?: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
  autoHideDuration?: number;
  actionText?: React.ReactNode;
  onAction?: () => void;
}

export interface ShowNotification {
  (message: React.ReactNode, options?: ShowNotificationOptions): string;
}

export interface CloseNotification {
  (key: string): void;
}

interface UseNotifications {
  show: ShowNotification;
  close: CloseNotification;
}

export default function useNotifications(): UseNotifications {
  const notificationsContext = React.useContext(NotificationsContext);
  if (!notificationsContext) {
    throw new Error('Notifications context was used without a provider.');
  }
  return notificationsContext;
}
