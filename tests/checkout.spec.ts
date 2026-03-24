import { expect, test } from '../fixtures/uiFixtures';

test('user can complete checkout successfully', async ({
  page,
  inventoryPage,
  cartPage,
  checkoutPage,
  loginAsStandardUser,
}) => {
  await test.step('Log in and add an item to the cart', async () => {
    await loginAsStandardUser();
    await inventoryPage.verifyInventoryLoaded();
    await inventoryPage.addBackpackToCart();
    await inventoryPage.verifyCartCount(1);
  });

  await test.step('Proceed through checkout information and overview', async () => {
    await inventoryPage.openCart();
    await cartPage.verifyCartPageLoaded();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyCheckoutInformationLoaded();
    await checkoutPage.completeCustomerInformation('Shajee', 'Afzal', '75001');
    await checkoutPage.verifyCheckoutOverviewLoaded();
  });

  await test.step('Finish the order', async () => {
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderComplete();
    await expect(page).toHaveURL(/checkout-complete.html/);
  });
});

test('user sees validation error when checkout info is incomplete', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
  loginAsStandardUser,
}) => {
  await loginAsStandardUser();
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.verifyCheckoutInformationLoaded();

  await checkoutPage.completeCustomerInformation('', 'Afzal', '75001');
  await checkoutPage.verifyErrorMessage('Error: First Name is required');
});
