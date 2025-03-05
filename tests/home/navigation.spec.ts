import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Feature: Navigation', () => {
  const sections = [{ name: 'Admin' }, { name: 'PIM' }, { name: 'Leave' }, { name: 'Time' }, { name: 'Dashboard' }];

  for (const { name } of sections) {
    test(
      `User can navigate to ${name} section`,
      { tag: ['@smoke', '@navigation', '@regression'] },
      async ({ authenticatedHomePage }) => {
        await authenticatedHomePage.navigateToSection(name);

        await expect(await authenticatedHomePage.sideMenu.getSelectedMenuItemByName(name)).toHaveText(name);
        await expect(await authenticatedHomePage.getTitle()).toHaveText(name);
        await expect(authenticatedHomePage.homeHeading).toHaveText(name);
      },
    );
  }

  test(
    'User attempts to navigate to non-existent section',
    { tag: ['@navigation', '@dashboard', '@fail'] },
    async ({ authenticatedHomePage }) => {
      await expect(authenticatedHomePage.homeHeading).toBeVisible();

      await authenticatedHomePage.navigateToSection('Non-Existent Section');

      expect(await authenticatedHomePage.sideMenu.isMenuItemSelected('Non-Existent Section')).toBe(true);
    },
  );
});
