import { test as base } from '@playwright/test';
import { ApiHelper } from '../helpers/api-helper';
import { EmployeePage } from '../pages/Home/Sections/EmployeePage';
import { TestDataFactory } from '../helpers/test-data-factory';
import { config } from '../config/env.config';

type EmployeeFixtures = {
  employeeId?: string;
  authToken?: string;
};

export const test = base.extend<{
  apiHelper: ApiHelper;
  testDataFactory: TestDataFactory;
  employeePage: EmployeePage;
  employeeTest: EmployeeFixtures;
}>({
  apiHelper: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request);
    await use(apiHelper);
  },

  testDataFactory: async ({}, use) => {
    const testDataFactory = new TestDataFactory();
    await use(testDataFactory);
  },

  employeePage: async ({ page }, use) => {
    const employeePage = new EmployeePage(page);
    await use(employeePage);
  },

  // Fixture for employee tests with api and test data helpers
  employeeTest: async ({ apiHelper, testDataFactory }, use) => {
    const testData: EmployeeFixtures = {};

    // Setup code - runs before the test
    const userUsername = process.env.USER_USERNAME || config.user.username;
    const userPassword = process.env.USER_PASSWORD || config.user.password;
    testData.authToken = await apiHelper.getAuthToken(userUsername, userPassword);

    // Create test employee data
    const testEmployee = testDataFactory.createEmployee({
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      location: 'Remote',
    });

    // Use API to create the employee in the system
    const response = await apiHelper.post('/api/employees', testEmployee, {
      Authorization: `Bearer ${testData.authToken}`,
    });

    const data = await response.json();
    testData.employeeId = data.id;

    // This passes the testData to the test and PAUSES HERE until the test completes
    await use(testData);

    // Cleanup code - runs after the test completes
    if (testData.employeeId) {
      await apiHelper.delete(`/api/employees/${testData.employeeId}`, {
        Authorization: `Bearer ${testData.authToken}`,
      });
    }
  },
});

export { expect } from '@playwright/test';
