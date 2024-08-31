import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";
import { expect, test } from "vitest";

test("test blog form", async () => {
  const createBlog = vi.fn();
  const user =userEvent.setup()

  const {container}=render(<BlogForm createBlog={createBlog} />)
  const titleInpt = screen.getByPlaceholderText("write title")
  const authorInpt = screen.getByPlaceholderText("write author")
  const urlInpt = screen.getByPlaceholderText("write url")
  
  const createBlogBtn=container.querySelector(".createBlogBtn")
  await user.type(titleInpt,"hello")
  await user.type(authorInpt,"me")
  await user.type(urlInpt,"www.r.com")

  await user.click(createBlogBtn)
  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("hello")
  expect(createBlog.mock.calls[0][0].author).toBe("me");
  expect(createBlog.mock.calls[0][0].url).toBe("www.r.com");
  
});
