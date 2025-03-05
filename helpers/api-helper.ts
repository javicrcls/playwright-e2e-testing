import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Helper class for API interactions
 * Used for test setup/teardown and backend verifications
 */
export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  /**
   * Get request
   * @param url - The URL to send the request to
   * @param headers - Optional headers to include in the request
   * @returns Promise that resolves to the API response
   */
  async get(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(url, { headers });
  }

  /**
   * Post request
   * @param url - The URL to send the request to
   * @param data - Optional data to include in the request
   * @param headers - Optional headers to include in the request
   * @returns Promise that resolves to the API response
   */
  async post(url: string, data?: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.post(url, {
      data,
      headers,
    });
  }

  /**
   * Put request
   * @param url - The URL to send the request to
   * @param data - Optional data to include in the request
   * @param headers - Optional headers to include in the request
   * @returns Promise that resolves to the API response
   */
  async put(url: string, data?: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.put(url, {
      data,
      headers,
    });
  }

  /**
   * Delete request
   * @param url - The URL to send the request to
   * @param headers - Optional headers to include in the request
   * @returns Promise that resolves to the API response
   */
  async delete(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(url, { headers });
  }

  /**
   * Get authentication token
   * @param username - Username
   * @param password - Password
   */
  async getAuthToken(username: string, password: string): Promise<string> {
    const response = await this.post('/auth/login', {
      username,
      password,
    });

    const data = await response.json();
    return data.token;
  }

  /**
   * Create test data
   * @param token - Auth token
   * @param data - Data to create
   */
  async createTestData(token: string, data: any): Promise<any> {
    const response = await this.post('/data', data, {
      Authorization: `Bearer ${token}`,
    });

    return await response.json();
  }

  /**
   * Clean up test data
   * @param token - Auth token
   * @param id - ID of data to delete
   */
  async cleanupTestData(token: string, id: string): Promise<void> {
    await this.delete(`/data/${id}`, {
      Authorization: `Bearer ${token}`,
    });
  }
}
