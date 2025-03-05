import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Page object for the side menu component
 * Handles navigation between different sections
 */
export class SideMenuPage extends BasePage {
  readonly menu: Locator;
  readonly menuItems: Locator;
  readonly dashboardMenuItem: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.menu = page.locator('//div[@class="oxd-sidepanel-body"]');
    this.menuItems = page.locator('//ul[@class="oxd-main-menu"]//li');
    this.dashboardMenuItem = page.locator('//span[text()="Dashboard"]');
    this.searchInput = page.locator('//div[@class="oxd-main-menu-search"]');
  }

  /**
   * Get the currently selected menu item by name
   * @param name - The name of the menu item
   * @returns Promise that resolves to the selected menu item locator
   */
  async getSelectedMenuItemByName(name: string): Promise<Locator> {
    return this.menu.locator(`//a[@class="oxd-main-menu-item active"]//span[text()="${name}"]`);
  }

  /**
   * Navigate to a menu item by name
   * @param name - The name of the menu item to navigate to
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToMenuItemByName(name: string): Promise<void> {
    await this.page.locator(`//span[text()="${name}"]`).click();
    await this.waitForPageLoad();
  }

  /**
   * Check if the Dashboard menu item is selected
   * @returns Promise that resolves to true if Dashboard is selected
   */
  async isMenuItemSelected(name: string): Promise<boolean> {
    const dashboardItem = await this.getSelectedMenuItemByName(name);
    return dashboardItem.isVisible();
  }
}
