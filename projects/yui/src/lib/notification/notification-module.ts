import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from './notification';
import { NotificationService } from './notification-service';

@NgModule({
  declarations: [Notification],
  imports: [CommonModule], // Changed to import all necessary directives at once
  providers: [NotificationService],
  exports: [Notification],
})
export class NotificationModule {}
