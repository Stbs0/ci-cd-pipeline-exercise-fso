import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("displaying blog", () => {
  test("render blog", async () => {
    const blog = {
      title: "hello",
      author: "me",
      url: "www.r.com",
      likes: "2",
    };

    render(<Blog blog={blog} />);

    const title = screen.getByText("hello / me");
    const url = screen.getByText("www.r.com");
    const likes = screen.getByText("2");
    expect(title).toBeDefined();

    expect(url).not.toBeVisible();
    expect(likes).not.toBeVisible();
  });
  test("check when clicked view btn", async () => {
    const blog = {
      title: "hello",
      author: "me",
      url: "www.r.com",
      likes: "2",
    };

    const mockHandler = vi.fn();

    const { container } = render(<Blog blog={blog} />);
    const url = screen.getByText("www.r.com");
    const likes = screen.getByText("2");

    expect(url).not.toBeVisible();
    expect(likes).not.toBeVisible();

    const btn = container.querySelector(".showBtn");

    const user = userEvent.setup();
    await user.click(btn);

    expect(url).toBeVisible();
    expect(likes).toBeVisible();
  });
  test("check when clicked like btn twice", async () => {
    const blog = {
      title: "hello",
      author: "me",
      url: "www.r.com",
      likes: "0",
    };

    const mockHandler = vi.fn();

    const { container } = render(<Blog blog={blog} handleUpdateBlog={mockHandler} />);
    
    const likesBtn = container.querySelector(".likeBtn");

   

   

    const user = userEvent.setup();
    await user.click(likesBtn);
    await user.click(likesBtn);
 expect(mockHandler.mock.calls).toHaveLength(2)
  
  });
});
