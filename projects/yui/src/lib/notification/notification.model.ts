export interface NotificationModel {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  showClose?: boolean;
}
