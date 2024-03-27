import { test, expect } from "@playwright/test";
import path from "path";

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

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${FRONTEND_URL}add-hotels`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("London");
  await page.locator('[name="country"]').fill("London");
  await page.locator('[name="description"]').fill("Test hotel");
  await page.locator('[name="pricePerNight"]').fill("1000");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByText("Romantic").click();

  await page.getByLabel("Free Wi-Fi").check();
  await page.getByLabel("Nice meal").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("3");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "hotel.png"),
  ]);

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Hotel added successfully")).toBeVisible({timeout: 30000});
});

test("should display hotels", async({page})=> {
  await page.goto(`${FRONTEND_URL}my-hotels`)

  await expect(page.getByRole("heading", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotels" })).toBeVisible();

})
