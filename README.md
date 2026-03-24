# QA Playwright SauceDemo Framework

Playwright + TypeScript automation framework demonstrating UI testing, API testing, hybrid validation, reusable fixtures, contract assertions, and CI execution.

This repository is structured to reflect how I approach QA automation as a framework design problem, not just a test-writing exercise. The goal is to show maintainable architecture, risk-based coverage, and tooling decisions that help a team scale quality practices over time.

## Why This Framework

This project is designed to demonstrate how a QA automation engineer can build a framework that is:
- maintainable as test coverage grows
- readable for both contributors and reviewers
- flexible enough to support UI, API, and hybrid workflows
- useful in CI with actionable failure artifacts
- aligned to business-critical flows instead of isolated demo tests

The focus is not only on automating happy paths, but also on validating negative scenarios, response contracts, environment configuration, and debugging support.

## Snapshot

| Area | Coverage / Capability |
| --- | --- |
| UI workflows | login, cart, checkout, logout |
| API workflows | create, read, update, delete, negative checks |
| Framework design | POM, fixtures, typed API layer, reusable assertions |
| Quality checks | response time, ISO timestamps, contract validation |
| Configurability | `.env`, `BASE_URL`, API key handling |
| Execution | Chromium, Firefox, WebKit, API-only runs |
| CI/CD | GitHub Actions workflow with report artifact upload |
| Debugging | HTML reports, trace capture, screenshots, video on failure |

## Leadership Signals In This Project

This project reflects how I think about QA automation beyond individual test cases:
- separate framework layers so tests stay readable and easier to maintain
- use fixtures to reduce duplication and support team scalability
- combine UI and API coverage to validate workflows more efficiently
- add negative-path and contract-style checks to improve defect detection
- configure reporting and failure artifacts to shorten debugging time
- document framework intent so the repo is easier for a team to adopt

## Test Strategy

The framework covers multiple validation layers rather than relying on only end-to-end UI tests.

### UI Regression
- successful login
- invalid login handling
- locked-out user validation
- missing password validation
- add item to cart
- verify item in cart
- remove item from cart
- checkout success path
- checkout validation error
- logout flow

### API Validation
- create user
- read existing user
- update user
- delete user
- unknown-user negative path
- missing API key negative path

### Quality and Contract Checks
- response-time validation
- timestamp format validation
- response contract checks for create, read, and update flows
- typed request and response handling

### Hybrid Coverage
- API-backed UI test that seeds data through the API layer before validating the UI path

## Framework Decisions

### Why Page Object Model
POM keeps selectors and reusable workflows out of the specs, which makes tests easier to maintain when the UI changes and easier for a team to read during reviews.

### Why Split Fixtures
The framework separates UI-only fixtures from API-enabled fixtures so tests only pull in the setup they actually need. This keeps the test surface cleaner and makes intent more obvious.

### Why Typed API Helpers
Typed endpoint methods and request/response models make API tests more predictable, safer to refactor, and easier to extend.

### Why Contract Assertions
Status codes alone are not enough. Contract checks improve confidence that the API response shape still matches expectations and help catch breaking changes earlier.

### Why Negative Testing
A strong regression suite needs to validate failure behavior, not just successful flows. That is why this project includes login error handling, unknown-user validation, and missing API key checks.

## Risk-Based Coverage

The current suite is intentionally centered around areas that matter most in a simple commerce-style application:
- authentication reliability
- cart state integrity
- checkout critical path
- session/logout behavior
- API contract stability
- environment and credential configuration

This reflects how I prioritize automation in a real product context: cover the highest business and integration risk first, then expand breadth from there.

## Architecture

```text
qa-playwright-saucedemo/
|
|-- api/
|   |-- client/        # shared API client and ReqRes request context
|   |-- endpoints/     # endpoint-specific helpers
|   |-- data/          # payload builders / factories
|   |-- types/         # request/response types
|   |-- utils/         # reusable API assertions
|
|-- fixtures/          # Playwright fixture composition for UI and API tests
|-- pages/             # page objects for SauceDemo screens
|-- test-data/         # reusable users and static input values
|-- tests/
|   |-- api/           # API specs
|   |-- *.spec.ts      # UI and hybrid specs
|
|-- playwright.config.ts
|-- .github/workflows/playwright.yml
```

## Execution Flow

```text
Environment config
      |
      v
Playwright config
      |
      v
Fixtures
      |
      v
Page objects / API clients
      |
      v
Specs
      |
      v
Reports, traces, screenshots, CI artifacts
```

## Playwright Projects

| Project | Purpose |
| --- | --- |
| `api` | runs API specs from `tests/api/` |
| `chromium` | runs UI specs in Chrome |
| `firefox` | runs UI specs in Firefox |
| `webkit` | runs UI specs in Safari/WebKit |

## Configuration

Create a local `.env` file or set environment variables in your shell.

```bash
BASE_URL=https://www.saucedemo.com/
REQRES_API_KEY=your-reqres-api-key
REQRES_ENV=prod
```

PowerShell example:

```powershell
$env:BASE_URL="https://www.saucedemo.com/"
$env:REQRES_API_KEY="your-reqres-api-key"
$env:REQRES_ENV="prod"
```

### Config Notes
- `BASE_URL` controls the target UI environment
- `REQRES_API_KEY` is required for API-backed testing
- `REQRES_ENV` defaults to `prod` if not provided

## Run The Suite

### Install

```bash
npm install
npx playwright install
```

### Run Everything

```bash
npm test
```

### Run By Scope

```bash
npm run test:api
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:headed
```

### Type Check

```bash
npm run typecheck
```

### Open Report

```bash
npm run test:report
```

## CI Workflow

The GitHub Actions workflow is set up to:
- install dependencies
- install Playwright browsers
- run API tests when `REQRES_API_KEY` is available
- run UI tests across Chromium, Firefox, and WebKit
- upload the Playwright HTML report as a CI artifact

## Production Improvements I Would Add Next

If this framework were adopted by a product team, the next improvements I would prioritize are:
- suite tagging for smoke, regression, and release-gating coverage
- accessibility checks
- visual regression coverage
- network mocking for deterministic UI tests
- flaky test detection and retry trend monitoring
- richer CI outputs such as JUnit reporting and notifications
- environment-aware test data isolation
- dashboard-style reporting for execution health and failure patterns

## Tooling

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Notes

- SauceDemo is used for UI automation practice
- ReqRes is used for API automation examples
- ReqRes create/update/delete endpoints are mock-style examples and are not fully persistent
- current ReqRes `/api/*` access may require `x-api-key`
