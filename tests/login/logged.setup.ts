import { config } from '../../config/env.config';
import { test as setup, expect } from '../../fixtures/page-fixtures';

setup('Setup to login with valid credentials and store the context', async ({ page, homePage, loginPage }) => {
  await loginPage.navigateToLoginPage();

  await loginPage.login(
    process.env.USER_EMAIL || config.user.username,
    process.env.USER_PASSWORD || config.user.password,
  );

  await expect(homePage.homeHeading).toBeVisible();
  await page.context().storageState({ path: '.auth/authenticated-chrome.json' });
});
