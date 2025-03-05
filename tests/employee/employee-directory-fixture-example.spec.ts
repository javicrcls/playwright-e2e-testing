import { test, expect } from '../../fixtures/employee-fixtures';

test.describe('Feature: Employee Directory', () => {
  test('Admin can filter employees by department', async ({ employeePage, employeeTest }) => {
    // Ensure we have a valid employee ID
    expect(employeeTest.employeeId).toBeDefined();
    const employeeId = employeeTest.employeeId as string;

    // Perform the proper actions
    await employeePage.navigateToEmployeeDirectory();
    await employeePage.filterByDepartment('Engineering');

    // Verify our test employee is visible
    const employeeElement = await employeePage.getEmployeeByID(employeeId);
    await expect(await employeePage.getEmployeeByID(employeeId)).toBeVisible();
  });

  test('Can search for employee by name', async ({ employeePage, employeeTest }) => {
    // Ensure we have a valid employee ID
    expect(employeeTest.employeeId).toBeDefined();
    const employeeId = employeeTest.employeeId as string;

    // Get employee details from API
    const employeeDetails = await employeePage.getEmployeeDetailsViaAPI(employeeId);

    await employeePage.navigateToEmployeeDirectory();

    // Search for the employee by name
    await employeePage.searchForEmployee(employeeDetails.name);

    // Verify only one result is shown
    expect(await employeePage.getEmployeeCount()).toBe(1);

    // Verify it's our test employee
    const employeeElement = await employeePage.getEmployeeByID(employeeId);
    await expect(employeeElement).toBeVisible();
  });
});
