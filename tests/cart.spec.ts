import { test } from '../fixtures/uiFixtures';

test('user can see added item in cart', async ({ inventoryPage, cartPage, loginAsStandardUser }) => {
  await loginAsStandardUser();
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await cartPage.verifyCartPageLoaded();
  await cartPage.verifyBackpackInCart();
});
