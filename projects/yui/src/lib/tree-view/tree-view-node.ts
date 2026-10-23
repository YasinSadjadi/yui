export interface TreeViewNode {
  /** Stable unique identifier, also used to track expansion state. */
  id: string;
  label: string;
  icon?: string;
  children?: TreeViewNode[];
  /** Angular route to navigate to when this item is activated. */
  routerLink?: string | unknown[];
  /** External or plain href to navigate to when this item is activated. */
  href?: string;
  disabled?: boolean;
}
