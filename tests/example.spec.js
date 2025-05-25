// @ts-check
import { test, expect } from "@playwright/test";

test.describe("login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("Should have title", async ({ page }) => {
    await expect(page).toHaveTitle("Vite + React");
    await expect(
      page.getByRole("heading", {
        name: "Sign in to Twitter",
      })
    ).toBeVisible();
  });

  test("Submit login info", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Phone, email address or username")
    ).toBeVisible();
  });
});
