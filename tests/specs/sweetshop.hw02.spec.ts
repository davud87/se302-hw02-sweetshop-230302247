import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NavBar } from '../pages/NavBar';
import { LoginPage } from '../pages/LoginPage';

test.describe('SE302 HW02 - Sweet Shop', () => {

  test('TC01: homepage loads', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(page).toHaveURL(/sweetshop\.netlify\.app/);
  });

  test('TC03: navigation to About and Login works', async ({ page }) => {
    const nav = new NavBar(page);

    await page.goto('/');
    await nav.goToAbout();
    await expect(page).toHaveURL(/\/about/i);

    await nav.goToLogin();
    await expect(page).toHaveURL(/\/login/i);
  });

  test('TC05: add to basket updates basket indicator', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    const before = await home.nav.basketText();
    await home.addFirstProductToBasket();
    const after = await home.nav.basketText();

    
    expect(after).not.toEqual(before);

  
    const beforeCount = before.match(/(\d+)/) ? Number(before.match(/(\d+)/)![1]) : null;
    const afterCount = after.match(/(\d+)/) ? Number(after.match(/(\d+)/)![1]) : null;

    if (beforeCount !== null && afterCount !== null) {
      expect(afterCount).toBe(beforeCount + 1);
    }
  });

  test('TC08: login blocks empty submission (negative)', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.submitEmpty();


    await expect(page).toHaveURL(/\/login/i);
  });

  test('TC10: script-like input does not trigger alert', async ({ page }) => {
    const login = new LoginPage(page);

    let dialogTriggered = false;
    page.on('dialog', async (d) => {
      dialogTriggered = true;
      await d.dismiss();
    });

    await login.open();
    await login.fillCredentials('<script>alert(1)</script>', '<script>alert(1)</script>');
    await login.submit();

    await page.waitForTimeout(800);
    expect(dialogTriggered).toBeFalsy();
  });

});
