# QA Playwright SauceDemo Project

This is a beginner-friendly UI automation project built with Playwright and JavaScript.
It demonstrates Page Object Model design, basic regression coverage, and GitHub-ready project structure.

## Tech Stack
- Playwright
- JavaScript
- Node.js
- VS Code

## Project Structure
- `pages/` - page object classes
- `tests/` - UI test specs
- `playwright.config.js` - test runner configuration

## Test Scenarios
1. Valid login with standard user
2. Add item to cart from inventory page
3. Verify selected item appears in cart

## Installation
```bash
npm install
npx playwright install
```

## Run Tests
```bash
npx playwright test
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
- UI assertions
- simple regression flow coverage
