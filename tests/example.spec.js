// @ts-check
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("User registration, login and check user login", async ({ page }) => {
  // step 1. user registration
  await page.goto("http://localhost:5173/");
  await page.click("text=Sign up");

  const randomName = faker.internet.username();
  const randomEmail = faker.internet.email();

  await page.fill('input[name="name"]', randomName);
  await page.fill('input[name="email"]', randomEmail);
  await page.fill('input[name="nickname"]', randomName);
  await page.fill('input[name="password"]', "test123456");
  await page.fill('input[name="confirm_password"]', "test123456");
  await page.fill('input[name="about"]', "Test about");
  await page.fill('input[name="occupation"]', "Test occupation ");
  await page.fill('input[name="home_town"]', "Gothenburg");
  await page.fill('input[name="website"]', "https://x.com/");

  await page.click('button[type="submit"]');

  await expect(page.locator(".MuiAlert-message")).toHaveText("User created", {
    timeout: 5000,
  });

  // step 2. User login
  await page.goto("http://localhost:5173/login");
  await page.fill('input[name="login_user"]', randomEmail);
  await page.click('button[type="submit"]'); // Submit email (step 1)
  await page.fill('input[name="password"]', "test123456");
  await page.click('button[type="submit"]'); // Submit password (step 2)

  // step 3 Check login
  await page.waitForURL(/\/home/); // allow 10s for slow responses
  await expect(page.getByText("Profile")).toBeVisible({ timeout: 5000 });
  await page.click("text=Profile");
  //await page.goto(`http://localhost:5173/profile/${randomName}`);
  await expect(page.locator(".profile-info h2")).toHaveText(randomName, {
    timeout: 5000,
  });
});
