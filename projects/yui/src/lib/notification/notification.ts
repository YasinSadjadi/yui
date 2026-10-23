import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NotificationService } from './notification-service';
import { NotificationModel } from './notification.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tasker-notification',
  standalone: false,
  templateUrl: './notification.html',
})
export class Notification {
  notifications = signal<NotificationModel[]>([]);

  private notificationService = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.notificationService.getNotifications()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((notifications: NotificationModel[]) => this.notifications.set(notifications));
  }

  dismiss(notification: NotificationModel): void {
    this.notificationService.remove(notification.id);
  }
}
