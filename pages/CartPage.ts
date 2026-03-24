import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly itemName: Locator;
  readonly checkoutButton: Locator;
  readonly removeBackpackButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.locator('.title');
    this.itemName = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('#checkout');
    this.removeBackpackButton = page.locator('#remove-sauce-labs-backpack');
    this.cartItems = page.locator('.cart_item');
  }

  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async verifyBackpackInCart(): Promise<void> {
    await expect(this.itemName).toContainText('Sauce Labs Backpack');
  }

  async removeBackpack(): Promise<void> {
    await this.removeBackpackButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}
