import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

/**
 * Page object for the Dashboard page
 * Handles dashboard-specific functionality and widgets
 */
export class DashboardPage extends BasePage {
  // Dashboard elements
  readonly dashboardGrid: Locator;
  readonly timeAtWork: Locator;
  readonly widgets: Locator;

  // Widget: Quick Launch elements
  readonly assignLeaveButton: Locator;
  readonly leaveListButton: Locator;
  readonly timeSheetButton: Locator;
  readonly applyLeaveButton: Locator;
  readonly myLeaveButton: Locator;
  readonly myTimesheetButton: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardGrid = page.locator('//div[@class="oxd-grid-3 orangehrm-dashboard-grid"]');
    this.widgets = page.locator(
      '//div[@class="oxd-sheet oxd-sheet--rounded oxd-sheet--white orangehrm-dashboard-widget"]',
    );
    this.assignLeaveButton = page.locator('//p[text()="Assign Leave"]');
    this.leaveListButton = page.locator('//p[text()="Leave List"]');
    this.timeSheetButton = page.locator('//p[text()="Time Sheets"]');
    this.applyLeaveButton = page.locator('//p[text()="Apply Leave"]');
    this.myLeaveButton = page.locator('//p[text()="My Leave"]');
    this.myTimesheetButton = page.locator('//p[text()="My Timesheets"]');
  }

  /**
   * Wait for the dashboard to load
   * @returns Promise that resolves when the dashboard is loaded
   */
  async waitForDashboardLoad(): Promise<void> {
    await this.dashboardGrid.waitFor({ state: 'visible' });
  }

  /**
   * Check if a specific widget is visible
   * @param widgetName - The name of the widget to check
   * @returns Promise that resolves to true if the widget is visible
   */
  async isWidgetVisible(widgetName: string): Promise<boolean> {
    return this.page
      .locator(
        `//div[@class="oxd-sheet oxd-sheet--rounded oxd-sheet--white orangehrm-dashboard-widget"]//p[text()="${widgetName}"]`,
      )
      .isVisible();
  }

  /**
   * Navigate to a specific widget
   * @param widgetName - The name of the widget to navigate to
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToWidget(widgetName: string): Promise<void> {
    await this.page
      .locator(
        `//div[@class="oxd-sheet oxd-sheet--rounded oxd-sheet--white orangehrm-dashboard-widget"]//p[text()="${widgetName}"]`,
      )
      .click();
  }

  /**
   * Navigate to a widget action by name
   * @param name - The name of the widget action
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToWidgetActionByName(name: string): Promise<void> {
    await this.page.locator(`//button[@title="${name}"]`).click();
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the dashboard page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToDashboardPage(): Promise<void> {
    await this.navigateTo('/web/index.php/dashboard/index');
  }
}
