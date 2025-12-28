import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator('input[type="email"], input[name*="email" i], input[placeholder*="email" i]').first();
    this.passwordInput = page.locator('input[type="password"], input[name*="pass" i], input[placeholder*="pass" i]').first();

    this.submitButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")').first();
  }

  async open() {
    await this.page.goto('/login');
    await expect(this.submitButton).toBeVisible();
  }

  async submitEmpty() {
    await this.submitButton.click();
  }

  async fillCredentials(email: string, password: string) {
   
    if (await this.emailInput.isVisible().catch(() => false)) await this.emailInput.fill(email);
    if (await this.passwordInput.isVisible().catch(() => false)) await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }
}
