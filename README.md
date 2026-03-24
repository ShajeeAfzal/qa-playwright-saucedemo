# QA Playwright SauceDemo Framework

Playwright + TypeScript automation framework covering UI and API testing with reusable fixtures, page objects, typed API helpers, and GitHub Actions execution.

This project is designed as a portfolio-style QA automation framework rather than a single demo script. It shows how to structure maintainable test code, separate UI and API concerns, and grow coverage into a realistic regression suite.

## Snapshot

| Area | What this project demonstrates |
| --- | --- |
| UI Automation | Login, inventory, cart, checkout, logout |
| API Automation | Typed CRUD coverage against ReqRes |
| Framework Design | POM, custom fixtures, reusable test data |
| Validation | Response contracts, timestamps, response-time checks |
| Configurability | `.env` support, `BASE_URL`, API key handling |
| Execution | Chromium, Firefox, WebKit, API-only project |
| CI/CD | GitHub Actions workflow with report artifact upload |
| Debugging | HTML reports, traces, screenshots, video on failure |

## Capabilities

### UI Coverage
- successful login
- negative login validation
- add item to cart
- verify item in cart
- remove item from cart
- complete checkout flow
- checkout form validation
- logout flow

### API Coverage
- create user
- read user
- update user
- delete user
- validate response contracts
- validate response time
- validate timestamp format
- validate negative behavior for unknown users
- validate missing API key behavior

### Framework Features
- Playwright Page Object Model
- custom UI and API fixtures
- hybrid API + UI test capability
- typed API client and endpoint layer
- reusable test data and payload builders
- cross-browser execution
- CI-ready project structure

## Architecture

```text
qa-playwright-saucedemo/
|
|-- api/
|   |-- client/        # shared API client and ReqRes request context
|   |-- endpoints/     # endpoint-specific helpers
|   |-- data/          # payload builders / factories
|   |-- types/         # response and request types
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

## Test Design Highlights

### UI Layer
- page objects keep selectors and workflows out of spec files
- shared fixtures inject page objects and reusable login helpers
- tests use `test.step()` where it improves reporting readability

### API Layer
- `ApiClient` centralizes request logic and timing capture
- `UsersApi` exposes typed endpoint methods
- assertion helpers make contract checks reusable and readable

### Hybrid Testing
- the framework supports API-backed UI scenarios
- one login test seeds data through the API layer before validating the UI flow

## Project Flow

```text
Config (.env / Playwright config)
        |
        v
Fixtures (UI / API)
        |
        v
Page Objects + API Clients
        |
        v
Test Specs
        |
        v
Reports / Traces / CI Artifacts
```

## Playwright Projects

| Project | Purpose |
| --- | --- |
| `api` | runs API specs in `tests/api/` |
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
- `BASE_URL` controls the SauceDemo UI target
- `REQRES_API_KEY` is required for API-backed tests
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

The GitHub Actions workflow:
- installs dependencies
- installs Playwright browsers
- runs API tests when `REQRES_API_KEY` is available
- runs UI tests across Chromium, Firefox, and WebKit
- uploads the Playwright HTML report as a build artifact

## Why This Project Is Useful For QA Roles

This repo shows more than test writing. It demonstrates how a QA automation engineer can:
- design a maintainable automation framework
- separate concerns between UI and API layers
- build reusable fixtures and helpers
- validate more than status codes through contract and quality checks
- support CI execution and failure debugging
- scale a project beyond a single happy-path flow

## Current Tooling

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Notes

- SauceDemo is used for UI automation practice
- ReqRes is used for API automation examples
- ReqRes create/update/delete endpoints are mock-style examples and not fully persistent
- current ReqRes `/api/*` access may require `x-api-key`
