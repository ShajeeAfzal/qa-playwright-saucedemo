import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly backpackAddToCart: Locator;
  readonly backpackRemoveButton: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.backpackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack');
    this.backpackRemoveButton = page.locator('#remove-sauce-labs-backpack');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async verifyInventoryLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  async addBackpackToCart(): Promise<void> {
    await this.backpackAddToCart.click();
  }

  async removeBackpackFromCart(): Promise<void> {
    await this.backpackRemoveButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async verifyCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartBadge).toHaveCount(0);
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}
