import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly itemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.locator('.title');
    this.itemName = page.locator('.inventory_item_name');
  }

  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async verifyBackpackInCart(): Promise<void> {
    await expect(this.itemName).toContainText('Sauce Labs Backpack');
  }
}
