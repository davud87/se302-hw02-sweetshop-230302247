import { Page, Locator, expect } from '@playwright/test';
import { NavBar } from './NavBar';

export class HomePage {
  readonly page: Page;
  readonly nav: NavBar;

  readonly headingWelcome: Locator;
  readonly browseSweetsBtn: Locator;
  readonly addToBasketBtns: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavBar(page);

    this.headingWelcome = page.getByRole('heading', { name: /welcome to the sweet shop/i });
    this.browseSweetsBtn = page.getByRole('button', { name: /browse sweets/i });
    this.addToBasketBtns = page.locator('text=/add to basket/i');
  }

  async open() {
    await this.page.goto('/');
    await this.nav.expectVisible();
    await expect(this.headingWelcome).toBeVisible();
  }

  async clickBrowseSweets() {
    await expect(this.browseSweetsBtn).toBeVisible();
    await this.browseSweetsBtn.click();
  }

  async addFirstProductToBasket() {
  const btn = this.addToBasketBtns.first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
}
}