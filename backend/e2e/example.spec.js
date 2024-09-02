const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, showBtn, createBlog, likeBtn } = require("./helper");
const config = require("../utils/config");
describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "mohammed ibrahim",
        username: "stbs",
        password: "stbs",
      },
    });

    await page.goto("http://localhost:3003/");
  });

  test("Login form is shown", async ({ page }) => {
    expect(page.getByText("log in to application")).toBeVisible();
  });
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      loginWith(page, "stbs", "stbs");
      await expect(page.getByText("mohammed ibrahim logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("wrong");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();
      await expect(
        page.getByText("mohammed ibrahim logged in"),
      ).not.toBeVisible();
    });
  });
  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      loginWith(page, "stbs", "stbs");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "helloxx", "me", "www.x.com");
      await expect(page.getByText("helloxx / me")).toBeVisible();
    });
    describe("when blog exists", () => {
      beforeEach(async ({ page }) => {
        createBlog(page, "hello", "me", "www.x.com");
      });

      test("a blog can be liked", async ({ page }) => {
        await page.getByTestId("show details").click();
        await page.getByTestId("like btn").click();
        await expect(page.getByText("1")).toBeVisible();
      });
    });
  });
});
7;
