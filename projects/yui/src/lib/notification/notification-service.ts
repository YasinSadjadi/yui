// notifications.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationModel } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: NotificationModel[] = [];
  private notify$ = new BehaviorSubject<NotificationModel[]>([]);
  private idCounter = 0;

  getNotifications() {
    return this.notify$.asObservable();
  }

  private add(notification: Omit<NotificationModel, 'id'>): void {
    const newNotification = { ...notification, id: ++this.idCounter };
    this.notifications = [...this.notifications, newNotification as NotificationModel];
    this.notify$.next(this.notifications);
  }

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.add({ message, type });
  }

  // Method to show a warning notification
  warning(message: string) {
    this.show(message, 'warning');
  }

  // Method to show an info notification
  info(message: string) {
    this.show(message, 'info');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  success(message: string) {
    this.show(message, 'success');
  }

  remove(id: number): void {
    this.notifications = this.notifications.filter((notification) => notification.id !== id);
    this.notify$.next(this.notifications);
  }
}
