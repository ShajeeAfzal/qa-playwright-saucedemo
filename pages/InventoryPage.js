const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.backpackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async verifyInventoryLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addBackpackToCart() {
    await this.backpackAddToCart.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async verifyCartCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}

module.exports = { InventoryPage };
