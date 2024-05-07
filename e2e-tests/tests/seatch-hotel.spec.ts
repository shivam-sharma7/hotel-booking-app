import { test, expect } from "@playwright/test";

const FRONTEND_URL = "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
  await page.goto(FRONTEND_URL);

  // get sign in button
  await page.getByRole("link", { name: "Sign in" }).click();

  // Expects page to have a heading with the name of Sign In.
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator('[name="email"]').fill("me11@gmail.com");
  await page.locator('[name="password"]').fill("12345678");

  // Click the sign in button.
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("You signed in successfully")).toBeVisible();
});


test("should show hotel search results", async({page})=> {
    await page.goto(`${FRONTEND_URL}search-hotels`)
    await page.getByPlaceholder("Destination").fill("London");
    await page.getByRole("button", { name: "Search" }).click();

})