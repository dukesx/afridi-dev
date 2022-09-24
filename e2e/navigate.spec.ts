import { test, expect } from "@playwright/test";

test("Navigate Globally", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto(process.env.PLAYWRIGHT_TEST_BASE_URL);

  // Click header >> text=The
  await page.locator("header >> text=The").click();
  await expect(page).toHaveURL(process.env.PLAYWRIGHT_TEST_BASE_URL);

  // Click text=Creator Studio
  await page.locator("text=Creator Studio").click();
  await expect(page).toHaveURL(
    process.env.PLAYWRIGHT_TEST_BASE_URL + "get-started"
  );

  // Click text=Blog
  await page.locator("text=Blog").click();
  await expect(page).toHaveURL(process.env.PLAYWRIGHT_TEST_BASE_URL);

  // Click nav >> text=posthog
  await page.locator("nav >> text=posthog").click();
  await expect(page).toHaveURL(
    process.env.PLAYWRIGHT_TEST_BASE_URL + "tags/posthog"
  );

  // Click button:has-text("Go back")
  await page.locator('button:has-text("Go back")').click();
  await expect(page).toHaveURL(process.env.PLAYWRIGHT_TEST_BASE_URL);

  // Click text=Muhammad Afzaal Afridi
  await page.locator("text=Muhammad Afzaal Afridi").click();
  await expect(page).toHaveURL(
    process.env.PLAYWRIGHT_TEST_BASE_URL +
      "author/49d746ab-60bf-4b1d-aaab-7524d40bd402"
  );

  // Click text=Home
  await page.locator("text=Home").click();
  await expect(page).toHaveURL(process.env.PLAYWRIGHT_TEST_BASE_URL);

  // Click text=Posthog: The Next Step in Open Source Analytics
  await page
    .locator("text=Posthog: The Next Step in Open Source Analytics")
    .click();
  await expect(page).toHaveURL(
    process.env.PLAYWRIGHT_TEST_BASE_URL +
      "article/44b4c9bb-e9f8-4513-8a98-2ebf7f43b87b"
  );

  // Click text=Home
  await page.locator("text=Home").click();
  await expect(page).toHaveURL(process.env.PLAYWRIGHT_TEST_BASE_URL);
});
