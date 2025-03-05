import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/env.config';

/**
 * Page object for the login page
 * Handles authentication functionality
 */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  readonly usernameInputimproved: Locator;
  readonly passwordInputimproved: Locator;
  readonly loginButtonimproved: Locator;
  readonly errorMessageimproved: Locator;

  constructor(page: Page) {
    super(page);

    // Poorly written locators
    this.usernameInput = page.locator('//input[@placeholder="Username"]');
    this.passwordInput = page.locator('//input[@placeholder="Password"]');
    this.loginButton = page.locator('//button[@type="submit"]');
    this.errorMessage = page.locator('//div[@class="orangehrm-login-error"]//p[text()="Invalid credentials"]');

    // Improved locators
    this.usernameInputimproved = page.getByPlaceholder('Username').filter({ hasText: 'Username' });
    this.passwordInputimproved = page.getByPlaceholder('Password').filter({ hasText: 'Password' });
    this.loginButtonimproved = page.getByRole('button', { name: 'Login' });
    this.errorMessageimproved = page.getByRole('alert').and(page.getByText('Invalid credentials'));
  }

  /**
   * Login with the provided credentials or use default credentials
   * @param username - Optional username to use for login
   * @param password - Optional password to use for login
   * @returns Promise that resolves when login is complete
   */
  async login(username?: string, password?: string): Promise<void> {
    const userUsername = username || process.env.USER_USERNAME || config.user.username;
    const userPassword = password || process.env.USER_PASSWORD || config.user.password;

    await this.fill(this.usernameInput, userUsername);
    await this.fill(this.passwordInput, userPassword);
    await this.click(this.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the login page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('/web/index.php/auth/login');
  }
}
