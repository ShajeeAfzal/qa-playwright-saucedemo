# QA Playwright SauceDemo Project

This is a beginner-friendly UI automation project built with Playwright and TypeScript.
It demonstrates Page Object Model design, basic regression coverage, and GitHub-ready project structure.

## Tech Stack
- Playwright
- TypeScript
- Node.js
- VS Code

## Project Structure
- `api/` - API client, typed endpoint helpers, and test data builders
- `pages/` - page object classes
- `tests/` - UI test specs
- `tests/api/` - API CRUD specs
- `playwright.config.ts` - test runner configuration

## Test Scenarios
1. Valid login with standard user
2. Add item to cart from inventory page
3. Verify selected item appears in cart
4. CRUD coverage against a public API in `tests/api/users.api.spec.ts`
5. UI login test seeded with a value returned by the public API

## Installation
```bash
npm install
npx playwright install
```

## Environment Variables
Create a local `.env` or set shell variables before running API-backed tests:

```bash
REQRES_API_KEY=your-reqres-api-key
REQRES_ENV=prod
```

PowerShell example:
```powershell
$env:REQRES_API_KEY="your-reqres-api-key"
$env:REQRES_ENV="prod"
```

## Run Tests
```bash
npx playwright test
```

Or run:
```bash
npm test
```

## Run API Tests Only
```bash
npx playwright test --project=api
```

## Run UI Tests Only
```bash
npx playwright test --project=chromium
```

## Run in Headed Mode
```bash
npx playwright test --headed
```

## Open Report
```bash
npx playwright show-report
```

## Notes
This project was created as hands-on QA automation practice to demonstrate:
- page object model
- reusable locators and methods
- TypeScript-based page objects and test specs
- a separate API test layer with a shared client and typed CRUD helpers
- using API-returned data inside a UI test
- UI assertions
- simple regression flow coverage

Public API choice:
- `https://reqres.in/api/`
- It is useful for CRUD-style automation examples, but create/update/delete responses are mock-style rather than fully persistent.
- Current ReqRes requests may require an `x-api-key`; this project reads that from `REQRES_API_KEY`.

Playwright projects:
- `api` runs the API-only specs from `tests/api/`
- `chromium`, `firefox`, and `webkit` run the UI specs from `tests/`
