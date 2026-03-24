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

test('shows an error for invalid credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(INVALID_USER.username, INVALID_USER.password);

  await loginPage.verifyErrorMessage(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('shows a locked out message for locked user', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(LOCKED_OUT_USER.username, LOCKED_OUT_USER.password);

  await loginPage.verifyErrorMessage(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});

test('shows a validation error for missing password', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(STANDARD_USER.username, '');

  await loginPage.verifyErrorMessage('Epic sadface: Password is required');
});
