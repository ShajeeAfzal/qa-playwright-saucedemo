const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTitle = page.locator('.title');
    this.itemName = page.locator('.inventory_item_name');
  }

  async verifyCartPageLoaded() {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async verifyBackpackInCart() {
    await expect(this.itemName).toContainText('Sauce Labs Backpack');
  }
}

module.exports = { CartPage };
