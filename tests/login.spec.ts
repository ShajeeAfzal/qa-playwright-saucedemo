import { buildCreateUserPayload } from '../api/data/user.factory';
import { expect, test } from '../fixtures/apiTestFixtures';
import { INVALID_USER, LOCKED_OUT_USER, STANDARD_USER } from '../test-data/users';

test('valid user can log in successfully', async ({ page, loginPage, inventoryPage, usersApi }) => {
  const seededUserPayload = buildCreateUserPayload({ job: 'standard_user' });
  const { data: seededUser } = await usersApi.createUser(seededUserPayload);

  await loginPage.goto();
  await loginPage.verifyLoginPageLoaded();
  await loginPage.login(seededUser.job, STANDARD_USER.password);
  await inventoryPage.verifyInventoryLoaded();
  await expect(page).toHaveURL(/inventory.html/);
  await expect
    .soft(seededUser.name, 'API-seeded user name should be available to the UI test flow')
    .toContain('ui-seed-user-');
});

const loginErrorScenarios = [
  {
    name: 'shows an error for invalid credentials',
    username: INVALID_USER.username,
    password: INVALID_USER.password,
    expectedMessage: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'shows a locked out message for locked user',
    username: LOCKED_OUT_USER.username,
    password: LOCKED_OUT_USER.password,
    expectedMessage: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    name: 'shows a validation error for missing password',
    username: STANDARD_USER.username,
    password: '',
    expectedMessage: 'Epic sadface: Password is required',
  },
];

for (const scenario of loginErrorScenarios) {
  test(scenario.name, async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(scenario.username, scenario.password);

    await loginPage.verifyErrorMessage(scenario.expectedMessage);
  });
}
