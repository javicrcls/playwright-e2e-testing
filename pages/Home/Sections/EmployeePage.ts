import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../../pages/BasePage';
import { ApiHelper } from '../../../helpers/api-helper';

/**
 * Page object for the Employee Directory page
 * Handles employee listing, searching, and filtering functionality
 */
export class EmployeePage extends BasePage {
  readonly searchInput = this.page.locator('[data-testid="employee-search"]');
  readonly employeeList = this.page.locator('[data-testid="employee-list"]');
  readonly employeeCards = this.page.locator('[data-testid="employee-card"]');
  readonly departmentFilter = this.page.locator('[data-testid="department-filter"]');
  readonly loadingIndicator = this.page.locator('[data-testid="loading-indicator"]');

  private apiHelper: ApiHelper;

  constructor(page: Page) {
    super(page);
    this.apiHelper = new ApiHelper(page.request);
  }

  /**
   * Navigates to the employee directory page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToEmployeeDirectory(): Promise<void> {
    await this.page.goto('/employee-directory');
    await this.page.waitForLoadState('load');
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }

  /**
   * Searches for an employee by name
   * @param name - The name to search for
   * @returns Promise that resolves when search is complete
   */
  async searchForEmployee(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.page.keyboard.press('Enter');
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }

  /**
   * Filters employees by department
   * @param department - The department to filter by
   * @returns Promise that resolves when filtering is complete
   */
  async filterByDepartment(department: string): Promise<void> {
    await this.departmentFilter.selectOption(department);
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }

  /**
   * Gets the count of employees displayed in the UI
   * @returns Promise that resolves to the number of employees
   */
  async getEmployeeCount(): Promise<number> {
    return await this.employeeCards.count();
  }

  /**
   * Gets the element for a specific employee
   * @param employeeId - The ID of the employee
   * @returns Promise that resolves to the employee element locator
   */
  async getEmployeeByID(employeeId: string): Promise<Locator> {
    return this.page.locator(`[data-employee-id="${employeeId}"]`);
  }

  /**
   * Checks if an employee is visible in the directory
   * @param employeeId - The ID of the employee
   * @returns Promise that resolves to true if the employee is visible
   */
  async isEmployeeVisible(employeeId: string): Promise<boolean> {
    return await this.page.locator(`[data-employee-id="${employeeId}"]`).isVisible();
  }

  /**
   * Gets employee details via API
   * @param employeeId - The ID of the employee
   * @returns Promise that resolves to the employee details
   */
  async getEmployeeDetailsViaAPI(employeeId: string): Promise<any> {
    const response = await this.apiHelper.get(`/api/employees/${employeeId}`);
    return await response.json();
  }
}
