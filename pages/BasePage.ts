import { Page, Locator } from '@playwright/test';
import { config } from '../config/env.config';

/**
 * Base Page class that all page objects inherit from
 * Contains common methods and properties used across all pages
 */
export class BasePage {
  readonly page: Page;
  baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL || config.baseUrl;
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for element to be visible
   * @param locator - The element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Check if element is visible
   * @param locator - The element locator
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<Locator> {
    return this.page.locator('(//header[@class="oxd-topbar"]//h6)[1]');
  }

  /**
   * Take screenshot
   * @param name - Screenshot name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }

  /**
   * Fill a form field with text
   * @param locator - The locator for the form field
   * @param text - The text to enter
   * @returns Promise that resolves when the field is filled
   */
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Click on an element
   * @param locator - The locator for the element to click
   * @returns Promise that resolves when the click is complete
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Wait for navigation to complete
   * @returns Promise that resolves when navigation is complete
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  /**
   * Gets the text content of an element
   * @param locator - The locator for the element
   * @returns Promise that resolves to the text content
   */
  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }

  /**
   * Checks if an element is visible
   * @param locator - The locator for the element
   * @returns Promise that resolves to true if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }
}
