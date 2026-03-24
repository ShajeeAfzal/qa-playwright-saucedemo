import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly backpackAddToCart: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.backpackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async verifyInventoryLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  async addBackpackToCart(): Promise<void> {
    await this.backpackAddToCart.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async verifyCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
