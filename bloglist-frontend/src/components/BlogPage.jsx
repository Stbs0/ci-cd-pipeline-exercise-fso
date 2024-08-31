import { forwardRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogPage = forwardRef((props, refs) => {
  return (
    <div>
      <h1>blogs</h1>
      {props.message || props.errorMessage ? (
        <Notification
          message={props.message}
          errorMessage={props.errorMessage}
        />
      ) : null}
      <p>
        {props.user.name} logged in{" "}
        <button onClick={props.handleLogout}>logout</button>
      </p>
      <Togglable
        buttonLabel='create Blog'
        ref={refs}>
        <BlogForm createBlog={props.handleCreateBlog} />
      </Togglable>

      <div>
        {props.blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <div
                key={blog.id}
                data-testid='blog-list'
                
                id={blog.author}>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleUpdateBlog={props.handleUpdateBlog}
                  handleDeleteBlog={props.handleDeleteBlog}
                  user={props.user}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
});
export default BlogPage;
