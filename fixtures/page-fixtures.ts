import { test as base } from '@playwright/test';
import { HomePage } from '../pages/Home/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/env.config';
import { DashboardPage } from '../pages/Home/Sections/DashboardPage';

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  authenticatedHomePage: HomePage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  authenticatedHomePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigateToLoginPage();

    const username = process.env.USER_EMAIL || config.user.username;
    const password = process.env.USER_PASSWORD || config.user.password;

    await loginPage.login(username, password);
    await dashboardPage.waitForDashboardLoad();
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
