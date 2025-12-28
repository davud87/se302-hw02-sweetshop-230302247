import { Page, Locator, expect } from '@playwright/test';

export class NavBar {
  readonly page: Page;
  readonly sweetsLink: Locator;
  readonly aboutLink: Locator;
  readonly loginLink: Locator;
  readonly basketLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.sweetsLink = page.getByRole('link', { name: /^sweets$/i });
    this.aboutLink = page.getByRole('link', { name: /^about$/i });
    this.loginLink = page.getByRole('link', { name: /^login$/i });

  
    this.basketLink = page.getByRole('link', { name: /basket/i });
  }

  async goToSweets() {
    await this.sweetsLink.click();
  }

  async goToAbout() {
    await this.aboutLink.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async expectVisible() {
    await expect(this.sweetsLink).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
    await expect(this.loginLink).toBeVisible();
    await expect(this.basketLink).toBeVisible();
  }

  async basketText(): Promise<string> {
    return (await this.basketLink.textContent())?.trim() ?? '';
  }

  
  async basketCount(): Promise<number | null> {
    const txt = await this.basketText();
    const m = txt.match(/(\d+)/);
    return m ? Number(m[1]) : null;
  }
}
