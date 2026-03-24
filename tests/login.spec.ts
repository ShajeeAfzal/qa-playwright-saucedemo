import { expect, test } from '@playwright/test';
import { createReqResContext } from '../api/client/createReqResContext';
import { buildCreateUserPayload } from '../api/data/user.factory';
import { UsersApi } from '../api/endpoints/UsersApi';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

test('valid user can log in successfully', async ({ page }) => {
  const apiContext = await createReqResContext();
  const usersApi = new UsersApi(apiContext);
  const seededUserPayload = buildCreateUserPayload({ job: 'standard_user' });
  const { data: seededUser } = await usersApi.createUser(seededUserPayload);

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.verifyLoginPageLoaded();
  await loginPage.login(seededUser.job, 'secret_sauce');
  await inventoryPage.verifyInventoryLoaded();
  await expect(page).toHaveURL(/inventory.html/);
  await expect
    .soft(seededUser.name, 'API-seeded user name should be available to the UI test flow')
    .toContain('ui-seed-user-');

  await apiContext.dispose();
});
