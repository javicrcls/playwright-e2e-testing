import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Feature: Home Page', () => {
  test(
    'User is able to navigate to the home page',
    { tag: ['@health', '@home', '@regression'] },
    async ({ authenticatedHomePage }) => {
      await expect(authenticatedHomePage.homeHeading).toBeVisible();

      await expect(authenticatedHomePage.sideMenu.menu).toBeVisible();
      await expect(authenticatedHomePage.sideMenu.searchInput).toBeVisible();
      await expect(await authenticatedHomePage.sideMenu.getSelectedMenuItemByName('Dashboard')).toBeVisible();
    },
  );

  test(
    'Mobile user is able to navigate to the home page',
    { tag: ['@mobile', '@home', '@regression'] },
    async ({ authenticatedHomePage }) => {
      await expect(authenticatedHomePage.homeHeading).toBeVisible();

      await expect(authenticatedHomePage.sideMenu.menu).toBeVisible();
    },
  );
});
