import { test, expect } from "@playwright/test";

const FRONTEND_URL = "http://localhost:3000/";

// Sign up test
test("Should allow the user to sign in", async ({ page }) => {
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
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

// Register test
test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 9000)+ 10000}@test.com`
  await page.goto(FRONTEND_URL);

  // get sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  // Fill in the form
  await page.locator('[name="firstName"]').fill("test_firstName");
  await page.locator('[name="lastName"]').fill("test_lastName");
  await page.locator('[name="email"]').fill(testEmail);
  await page.locator('[name="password"]').fill("12345678");
  await page.locator('[name="confirmPassword"]').fill("12345678");

  // Click the sign in button.
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("You registered successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
