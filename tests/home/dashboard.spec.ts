import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Feature: Dashboard', () => {
  test(
    'User can see Time at Work widget in dashboard page',
    { tag: ['@smoke', '@dashboard', '@regression'] },
    async ({ authenticatedHomePage }) => {
      await expect(await authenticatedHomePage.getTitle()).toHaveText('Dashboard');

      await expect(await authenticatedHomePage.dashboardPage.isWidgetVisible('Time at Work')).toBe(true);
    },
  );

  test(
    'User can navigate to Assign Leave from dashboard',
    { tag: ['@smoke', '@dashboard', '@regression'] },
    async ({ authenticatedHomePage }) => {
      await authenticatedHomePage.dashboardPage.navigateToWidgetActionByName('Assign Leave');

      await expect(await authenticatedHomePage.getTitle()).toHaveText('Leave');
    },
  );
});
