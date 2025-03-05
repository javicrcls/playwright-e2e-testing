import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { SideMenuPage } from '../Components/SideMenuPage';
import { DashboardPage } from './Sections/DashboardPage';

/**
 * Page object for the home page
 * Serves as the main landing page after login
 */
export class HomePage extends BasePage {
  readonly homeHeading: Locator;
  readonly homeLogo: Locator;
  readonly dashboardPage: DashboardPage;
  readonly sideMenu: SideMenuPage;

  constructor(page: Page) {
    super(page);
    this.homeHeading = page.locator('(//header[@class="oxd-topbar"]//h6)[1]');
    this.homeLogo = page.locator('//div[@class="oxd-brand-logo"]//img[@alt="client brand logo"]');
    this.sideMenu = new SideMenuPage(page);
    this.dashboardPage = new DashboardPage(page);
  }

  /**
   * Navigate to a specific section using the side menu
   * @param sectionName - The name of the section to navigate to
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToSection(sectionName: string): Promise<void> {
    await this.sideMenu.navigateToMenuItemByName(sectionName);
  }
}
