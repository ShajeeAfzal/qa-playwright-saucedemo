import { expect, test } from '../fixtures/uiFixtures';

test('user can remove an item from the cart', async ({
  inventoryPage,
  cartPage,
  loginAsStandardUser,
}) => {
  await loginAsStandardUser();
  await inventoryPage.addBackpackToCart();
  await inventoryPage.verifyCartCount(1);

  await inventoryPage.openCart();
  await cartPage.verifyCartPageLoaded();
  await cartPage.removeBackpack();
  await cartPage.verifyCartIsEmpty();
  await inventoryPage.verifyCartIsEmpty();
});

test('user can log out from the inventory page', async ({ page, inventoryPage, loginPage, loginAsStandardUser }) => {
  await loginAsStandardUser();
  await inventoryPage.verifyInventoryLoaded();

  await inventoryPage.logout();

  await loginPage.verifyLoginPageLoaded();
  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
});
