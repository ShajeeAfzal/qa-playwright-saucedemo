const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test('valid user can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.verifyLoginPageLoaded();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.verifyInventoryLoaded();
  await expect(page).toHaveURL(/inventory.html/);
});
