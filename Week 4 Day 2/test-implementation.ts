import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber'; 

import { Browser, BrowserContext, Page, expect } from '@playwright/test'; 

import { chromium } from '@playwright/test'; 

 

let browser: Browser; 

let context: BrowserContext; 

let page: Page; 

 

BeforeAll(async () => { 

    browser = await chromium.launch({ headless: false }); 

    context = await browser.newContext(); 

    page = await context.newPage(); 

}); 

 

AfterAll(async () => { 

    await context.close(); 

    await browser.close(); 

}); 

 

Given('I open the login page', async () => { 

    await page.goto('https://leaftaps.com/opentaps/control/main'); 

}); 

 

When('I type {string} into the Username field', async (username: string) => { 

    await page.getByLabel(/username/i).fill(username); 

}); 

 

When('I type {string} into the Password field', async (password: string) => { 

    await page.getByLabel(/password/i).fill(password); 

}); 

 

When('I click the Login button', async () => { 

    await page.getByRole('button', { name: /login/i }).click(); 

}); 

 

Then('I should be logged in successfully', async () => { 

    const successMessage = page.locator('.success, [data-testid="success"]'); 

    await expect(successMessage).toBeVisible(); 

}); 