import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Feature: Dashboard using storage', () => {
  test(
    'User can see Time at Work widget in dashboard page using storage',
    { tag: ['@storaged'] },
    async ({ homePage }) => {
      await homePage.dashboardPage.navigateToDashboardPage();
      await expect(await homePage.getTitle()).toHaveText('Dashboard');
      await expect(await homePage.dashboardPage.isWidgetVisible('Time at Work')).toBe(true);
    },
  );
});
