import { Subscription } from 'rxjs';

/** Collects subscriptions and releases them together when a component is destroyed. */
export class SubscriptionSink {
  private readonly subscriptions = new Subscription();

  set sink(subscription: Subscription) {
    this.subscriptions.add(subscription);
  }

  unsubscribe(): void {
    this.subscriptions.unsubscribe();
  }
}
