import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Feature: Dashboard Navigation and Widgets', () => {
  test('User can search for menu items in side menu', async ({ authenticatedHomePage }) => {
    // Step 1: Verify user is on Dashboard as default landing page
    await test.step('User is on Dashboard as default landing page', async () => {
      const dashboardSelected = await authenticatedHomePage.sideMenu.isMenuItemSelected('Dashboard');
      expect(dashboardSelected).toBeTruthy();
    });

    // Step 2: Search for a menu item
    await test.step('User searches for a specific menu item', async () => {
      // Type "Leave" in the search box
      await authenticatedHomePage.sideMenu.searchInput.fill('Leave');

      // Wait for page to
      await authenticatedHomePage.sideMenu.waitForPageLoad();

      // Verify Leave menu item is visible after search
      const leaveMenuItem = authenticatedHomePage.sideMenu.menuItems.filter({ hasText: 'Leave' });
      await expect(leaveMenuItem).toBeVisible();
    });

    // Step 3: Click on search result
    await test.step('Navigate to search result', async () => {
      // Click on Leave menu item
      await authenticatedHomePage.navigateToSection('Leave');

      // Verify Leave is now selected
      const leaveSelected = await authenticatedHomePage.sideMenu.isMenuItemSelected('Leave');
      expect(leaveSelected).toBeTruthy();
    });
  });
});
