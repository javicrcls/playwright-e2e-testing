import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Page object for the notification component
 * Handles interaction with the notification center and notification items
 */
export class NotificationPage extends BasePage {
  readonly notificationBell: Locator;
  readonly notificationItems: Locator;

  constructor(page: Page) {
    super(page);
    this.notificationBell = page.locator('[data-testid="notification-bell"]');
    this.notificationItems = page.locator('[data-testid="notification-item"]');
  }

  /**
   * Opens the notification panel by clicking the notification bell
   * @returns Promise that resolves when the notification panel is visible
   */
  async openNotifications(): Promise<void> {
    await this.notificationBell.click();
    await this.page.waitForSelector('[data-testid="notification-panel"]', { state: 'visible' });
  }

  /**
   * Gets the first notification in the notification panel
   * @returns Promise that resolves to the first notification locator
   */
  async getFirstNotification(): Promise<Locator> {
    return this.notificationItems.first();
  }

  /**
   * Gets a notification by its text content
   * @param text - The text to search for in the notification
   * @returns Promise that resolves to the notification locator
   */
  async getNotificationByText(text: string): Promise<Locator> {
    return this.page.locator(`[data-testid="notification-item"]:has-text("${text}")`);
  }
}
