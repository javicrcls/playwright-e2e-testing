// Template configuration file - copy to env.config.ts and customize
export const config = {
  // Base URLs - REQUIRED
  baseUrl: process.env.BASE_URL || 'BASE_URL_REQUIRED',
  adminUrl: process.env.ADMIN_URL || 'ADMIN_URL_REQUIRED',
  apiBaseUrl: process.env.API_BASE_URL || 'API_BASE_URL_REQUIRED',

  // User credentials - REQUIRED
  user: {
    username: process.env.USER_EMAIL || 'USER_EMAIL_REQUIRED',
    password: process.env.USER_PASSWORD || 'USER_PASSWORD_REQUIRED',
  },

  // Admin credentials - REQUIRED
  admin: {
    username: process.env.ADMIN_USERNAME || 'ADMIN_USERNAME_REQUIRED',
    password: process.env.ADMIN_PASSWORD || 'ADMIN_PASSWORD_REQUIRED',
  },

  // Test configuration - Optional with defaults
  testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
  retryCount: parseInt(process.env.RETRY_COUNT || '2'),
  slowMo: parseInt(process.env.SLOW_MO || '0'),
};
