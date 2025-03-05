import { test, expect } from '../../fixtures/employee-fixtures';

test.describe('Employee Directory with Mocked API', () => {
  test.beforeEach(async ({ page, employeePage }) => {
    await page.route('/api/employees*', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'mock-1',
            name: 'Mock Employee 1',
            department: 'Engineering',
            jobTitle: 'Software Engineer',
          },
        ]),
      }),
    );

    await employeePage.navigateToEmployeeDirectory();
  });

  test('Should show mocked employee data', async ({ employeePage }) => {
    await expect(employeePage.employeeCards).toHaveCount(1);
    await expect(employeePage.employeeCards.first()).toContainText('Mock Employee 1');
  });
});
