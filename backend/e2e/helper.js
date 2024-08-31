const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "create Blog" }).click();
  await page.getByPlaceholder("write title").fill(title);
  await page.getByPlaceholder("write author").fill(author);
  await page.getByPlaceholder("write url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
  await page.getByText(`${title} / ${author}`).waitFor();
};
const showBtn = async (page, text) => {
  const btn = await page
    .locator("p")
    .filter({ hasText: text })
    .getByTestId("show details");
  await btn.click();
};

const likeBtn = async (page, text) => {
  const btn = await page
    .locator("div")
    .filter({ hasText: text })
    .getByTestId("like btn");
  await btn.click();
};
export { loginWith, createBlog, likeBtn, showBtn };
