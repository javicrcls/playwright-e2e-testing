import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Page object for the calendar component
 * Handles interactions with the calendar view and date cells
 */
export class CalendarPage extends BasePage {
  readonly monthViewButton: Locator;
  readonly calendarGrid: Locator;

  constructor(page: Page) {
    super(page);
    this.monthViewButton = page.locator('[data-testid="month-view-button"]');
    this.calendarGrid = page.locator('[data-testid="calendar-grid"]');
  }

  /**
   * Navigates to the leave calendar page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToLeaveCalendar(): Promise<void> {
    await this.page.goto('/calendar/leave');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Selects the month view in the calendar
   * @returns Promise that resolves when the month view is displayed
   */
  async selectMonthView(): Promise<void> {
    await this.monthViewButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Gets a calendar cell for a specific date
   * @param dateString - The date in format YYYY-MM-DD
   * @returns Promise that resolves to the date cell locator
   */
  async getDateCell(dateString: string): Promise<Locator> {
    return this.page.locator(`[data-date="${dateString}"]`);
  }

  /**
   * Checks if a date is marked as leave in the calendar
   * @param dateString - The date in format YYYY-MM-DD
   * @returns Promise that resolves to true if the date is marked as leave
   */
  async isDateMarkedAsLeave(dateString: string): Promise<boolean> {
    const cell = await this.getDateCell(dateString);
    const className = await cell.getAttribute('class');
    return className !== null && /leave-day/.test(className);
  }
}
