import { config } from '../../config/env.config';
import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Feature: Login', () => {
  test(
    'User is able to login with valid credentials',
    { tag: ['@health', '@user', '@mobile'] },
    async ({ homePage, loginPage }) => {
      await loginPage.navigateToLoginPage();

      await loginPage.login(
        process.env.USER_EMAIL || config.user.username,
        process.env.USER_PASSWORD || config.user.password,
      );

      await expect(homePage.homeHeading).toBeVisible();
    },
  );

  test(
    'User is able to see an error when introducing invalid credentials',
    { tag: ['@smoke', '@user'] },
    async ({ loginPage }) => {
      await loginPage.navigateToLoginPage();

      await loginPage.login('invalid@example.com', 'wrongpassword');

      await expect(loginPage.errorMessage).toBeVisible();
    },
  );
});
