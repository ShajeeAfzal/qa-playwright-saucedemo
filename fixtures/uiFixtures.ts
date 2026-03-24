import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { STANDARD_USER } from '../test-data/users';

type UiFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  loginAsStandardUser: () => Promise<void>;
};

export const test = base.extend<UiFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  loginAsStandardUser: async ({ loginPage }, use) => {
    await use(async () => {
      await loginPage.goto();
      await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);
    });
  },
});

export { expect } from '@playwright/test';
