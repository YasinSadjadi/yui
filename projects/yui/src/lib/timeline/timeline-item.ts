export type TimelineItemStatus = 'complete' | 'current' | 'upcoming';

export interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  status?: TimelineItemStatus;
  icon?: string;
}
