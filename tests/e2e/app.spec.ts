import { test, expect } from "@playwright/test";

test.describe("Habit Tracker app", () => {

  // GLOBAL SETUP
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  //  AUTH GATE / ROUTE PROTECTION
  //test 1
  test("shows the splash screen and redirects unauthenticated users to /login", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("splash-screen")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/, { timeout: 8000 });
  });

    //test 2
  test("redirects authenticated users from / to /dashboard", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("test@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-confirm-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 8000 });

    await page.goto("/");
    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 8000 });
  });
 
  // AUTH FLOW (SIGNUP / LOGIN / SESSION)
  //test 3
  test("prevents unauthenticated access to /dashboard", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/login$/, { timeout: 8000 });
  });


  //test 4
  test("signs up a new user and lands on the dashboard", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("newuser@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-confirm-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 8000 });
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  //test 5
  test("logs in an existing user and loads only that user's habits", async ({ page }) => {

    // create user first
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("user@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-confirm-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/);

    // logout
    await page.getByTestId("auth-logout-button").click();
    await expect(page).toHaveURL(/\/login$/);

    // login again
    await page.getByTestId("auth-login-email").fill("user@example.com");
    await page.getByTestId("auth-login-password").fill("password123");
    await page.getByTestId("auth-login-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  // 3. HABIT CRUD
  //test 6
  test("creates a habit from the dashboard", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("creator@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-confirm-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/);

    await page.getByTestId("create-habit-button").click();
    await page.getByTestId("habit-name-input").fill("Drink Water");
    await page.getByTestId("habit-save-button").click();

    await expect(page.getByTestId("habit-card-drink-water")).toBeVisible();
  });

  //test 7
  test("completes a habit for today and updates the streak", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("streak@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-confirm-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/);

    await page.getByTestId("create-habit-button").click();
    await page.getByTestId("habit-name-input").fill("Drink Water");
    await page.getByTestId("habit-save-button").click();

    await page.getByTestId("habit-complete-drink-water").click();

    await expect(page.getByTestId("habit-streak-drink-water")).toContainText("1");
  });

  //test 8
  test("persists session and habits after page reload", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("persist@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-confirm-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/);

    await page.getByTestId("create-habit-button").click();
    await page.getByTestId("habit-name-input").fill("Drink Water");
    await page.getByTestId("habit-save-button").click();

    await page.reload();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId("habit-card-drink-water")).toBeVisible();
  });

  //test 9
  test("logs out and redirects to /login", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("logout@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-confirm-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/);

    await page.getByTestId("auth-logout-button").click();

    await expect(page).toHaveURL(/\/login$/);
  });

  // 4. OFFLINE + SERVICE WORKER
  // test 10
  test("loads the cached app shell when offline after the app has been loaded once", async ({ page, context }) => {

  // 1. Warm up app (this allows SW to install + cache)
  await page.goto("/signup");

  await page.getByTestId("auth-signup-email").fill("offline@example.com");
  await page.getByTestId("auth-signup-password").fill("password123");
  await page.getByTestId("auth-signup-confirm-password").fill("password123");
  await page.getByTestId("auth-signup-submit").click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId("dashboard-page")).toBeVisible();

  // 2. Wait for service worker to fully register + cache
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000); //this gives SW time to finish caching

  // 3. Go offline
  await context.setOffline(true);

  // 4. Reload page while offline
  await page.reload({ waitUntil: "domcontentloaded" });

  // 5. Assert app shell still loads from cache
  await expect(page.getByTestId("dashboard-page")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Network Error");

  // 6. Restore network
  await context.setOffline(false);
});
});