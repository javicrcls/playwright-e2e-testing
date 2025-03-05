import { APIRequestContext } from '@playwright/test';

/**
 * Factory for creating test data
 */
export class TestDataFactory {
  constructor(private request?: APIRequestContext) {}

  /**
   * Create a test employee
   */
  createEmployee(overrides: Partial<Employee> = {}): Employee {
    const timestamp = Date.now();
    return {
      name: `Test Employee ${timestamp}`,
      email: `test.employee.${timestamp}@example.com`,
      department: 'General',
      jobTitle: 'Staff',
      location: 'Office',
      hireDate: new Date().toISOString().split('T')[0],
      ...overrides,
    };
  }

  /**
   * Create a skill set with proficiency levels
   */
  createSkillSet(skillsWithLevels: Record<string, string>): SkillSet {
    return {
      skills: Object.entries(skillsWithLevels).map(([skill, level]) => ({
        name: skill,
        proficiency: level,
      })),
    };
  }

  /**
   * Create test leave request
   */
  createLeaveRequest(overrides: Partial<LeaveRequest> = {}): LeaveRequest {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 5);

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      reason: 'Vacation',
      type: 'annual',
      ...overrides,
    };
  }
}

// Types
interface Employee {
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  location: string;
  hireDate: string;
}

interface SkillSet {
  skills: Array<{
    name: string;
    proficiency: string;
  }>;
}

interface LeaveRequest {
  startDate: string;
  endDate: string;
  reason: string;
  type: string;
}
