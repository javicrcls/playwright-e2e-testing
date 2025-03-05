# 🎭 Playwright E2E Testing Framework

![CircleCI](https://img.shields.io/badge/CircleCI-passing-brightgreen)
[![Playwright](https://img.shields.io/badge/tested%20with-playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.3.5-blue)](https://www.typescriptlang.org/)
[![Slack](https://img.shields.io/badge/Slack-reporting-4A154B?logo=slack&logoColor=white)](https://slack.com)
[![Docker](https://img.shields.io/badge/Docker-containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

This project is a robust and scalable end-to-end UI automation framework built with Playwright and TypeScript. It follows modern design patterns and best practices (such as the Page Object Model and Fixtures) to ensure your tests are maintainable, reusable, and easy to understand.

Preparation for the approach:
[[Miro Board]](https://miro.com/app/board/uXjVMKPYtB0=/?share_link_id=479794801380)

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [CI/CD Integration](#cicd-integration)
- [Slack Integration](#slack-integration)
- [Running the Project](#running-the-project)
- [Best Practices](#best-practices)
- [Getting Started](#getting-started)

## Project Overview

This framework demonstrates UI test automation using Playwright with an emphasis on:
- Clean code organization
- Reusable page components (Page Object Model)
- Effective use of Playwright fixtures
- API and UI test integration
- CI/CD pipelines with CircleCI and on-demand testing
- Real-time notifications via Slack

This project is ideal for showcasing your test automation skills during technical interviews.

## Key Features

- **Page Object Model (POM):**  
  - Encapsulates page behaviors in classes within a dedicated `pages/` directory.
  - Utilizes base components like `BasePage.ts`, making it easier to extend and maintain.

- **Fixtures Approach:**  
  - Uses Playwright fixtures (`fixtures/page-fixtures.ts` and `fixtures/employee-fixtures.ts`) to create and reuse page objects, API helpers, and test data factories for complex tests.
  - Minimizes duplication and ensures proper test setup and teardown.

- **User-first locator strategy:**  
  - Enhanced our element selection approach by implementing user-first locators that are more resilient and maintainable. As demonstrated in `LoginPage.ts`, we've moved from XPath-based selectors to Playwright's recommended user-centric locators

- **Storage state feature:**  
  - Implemented Playwright's storage state feature to maintain authentication between test runs, improving efficiency and reducing test execution time: (`tests/login/logged.setup.ts` and `tests/home/dashboard-storage-example.spec.ts`)
  - 
   ```sh
     npm run test:storaged

- **CI/CD Integration with CircleCI:**  
  - Configuration files in the `.circleci/` directory define jobs for running tests and building the project.
  - Available jobs include running specific test sets on-demand (e.g., smoke, regression, health) via parameterized pipelines.

- **Slack Notifications:**  
  - Integrates with Slack to provide real-time notifications for test failures and build statuses.
  - Customizable messages include test details, build URLs, and on-call notifications.

- **Cross-browser Testing:**  
  - Supports running tests on multiple browsers such as Chromium (Desktop) and mobile views via Playwright's device emulation.

## Technology Stack 

- **Playwright & TypeScript:** For E2E test automation.
- **Node.js:** JavaScript runtime.
- **CircleCI:** For Continuous Integration and automated testing.
- **Docker:** Containerizing tests and builds.
- **Slack:** Notifications for build and test statuses.
- **Prettier:** Ensures consistent code formatting.

## CI/CD Integration 

The project integrates seamlessly with CircleCI:
- **Jobs:**  
  - The main test job (`test`) is defined in `.circleci/config.yml` and uses a Playwright Docker image.  
  - A build job (`build-and-push`) builds the Docker image, pushes it, and sends notifications.

    <img width="681" alt="Screenshot 2025-03-05 at 16 47 41" src="https://github.com/user-attachments/assets/c9837648-afca-4a3e-befb-7f516c8c1444" />

- **On-Demand Test Sets:**  
  - A parameterized pipeline (`scheduled-pipeline.yml`) allows running different test sets (such as smoke, regression, and health) on-demand with customizable parameters like test-set and base URL.
    
 ![Screenshot 2025-03-05 at 16 48 26](https://github.com/user-attachments/assets/0c96a102-7e46-4c67-ba77-5947ad3058b1)

    
- **Artifacts & Reporting:**  
  - Test results and Playwright reports are stored as artifacts and can be reviewed after each run.
    ![Screenshot 2025-03-05 at 16 50 14](https://github.com/user-attachments/assets/f5d642ac-6ab9-4b43-9910-67481e9593ef)

    ![Screenshot 2025-03-05 at 16 49 10](https://github.com/user-attachments/assets/8f3f1708-2565-482a-b843-16f132914693)

## Slack Integration

- **Real-Time Feedback:**  
  The configuration uses the `circleci/slack` orb to instantly notify the team on both test failures and successful builds.
- **Customizable Messages:**  
  Slack notifications include detailed build information, test sets executed, branch name, and quick links to build details and generated reports.

<img width="303" alt="Screenshot 2025-03-05 at 16 45 36" src="https://github.com/user-attachments/assets/972cecb0-8719-4725-afb2-83f4fed007e8" />

<img width="325" alt="Screenshot 2025-03-05 at 16 46 39" src="https://github.com/user-attachments/assets/6211b990-bae3-49c1-92d7-4eb6d04b55b6" />


## Running the Project

### Local Execution

1. **Install Dependencies:**
   ```sh
   npm install
   ```

2. **Run Tests:**
   - Run all tests:
     ```sh
     npm run test
     ```
   - Run specific test sets:
     ```sh
     npm run test:smoke     # Run smoke tests only
     npm run test:regression # Run regression tests only
     npm run test:dashboard  # Run dashboard-related tests only
     npm run test:failset # Run this to check how failures are reported
     ```

3. **View Test Report:**
   ```sh
   npx playwright show-report
   ```

### Using Docker

- **Run via Docker Compose:**
  ```sh
  docker-compose up --build
  ```

## Best Practices

- **Modular Code:**  
  Use page objects and fixtures to keep tests clean and maintainable.
- **Reuse & Extend:**  
  Leverage shared helpers and components to avoid code duplication.
- **Descriptive Tests:**  
  Write tests that clearly communicate user intent and behavior.
- **Automate Everything:**  
  Integrate CI/CD pipelines and notifications to catch issues early and keep your team informed.
- **Consistent Formatting:**  
  Use Prettier for a consistent code style across the project.

## Getting Started

1. **Clone the repository.**
2. **Set up Environment Variables:**  
   Create a copy of `config/env.config.ts` and update with your environment values (e.g., `BASE_URL`, `USER_EMAIL`, `USER_PASSWORD`, etc.).

    + default BASE_URL = 'https://opensource-demo.orangehrmlive.com'
    + default USER_EMAIL = 'Admin'
    + default USER_PASSWORD = 'admin123'
    
3. **Install Dependencies:**  
   ```sh
   npm install
   ```
4. **Run Tests Locally or via Docker.**
5. **Review CI/CD Logs:**  
   Check CircleCI dashboards and Slack notifications to monitor test results.

---
