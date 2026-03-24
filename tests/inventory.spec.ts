import { test } from '../fixtures/uiFixtures';

test('user can add backpack to cart from inventory page', async ({ inventoryPage, loginAsStandardUser }) => {
  await loginAsStandardUser();
  await inventoryPage.verifyInventoryLoaded();
  await inventoryPage.addBackpackToCart();
  await inventoryPage.verifyCartCount(1);
});
