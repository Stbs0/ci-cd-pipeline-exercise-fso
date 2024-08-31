import { useState } from "react";
const Blog = ({ blog, handleUpdateBlog, user, handleDeleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    setShowDetails(!showDetails);
  };
  return (
    <>
      <p>
        {blog.title} / {blog.author}
        <button
          data-testid='show details'
          className='showBtn'
          onClick={handleClick}>
          {showDetails ? "hide" : "view"}
        </button>
      </p>

      <div style={showDetails ? { display: "block" } : { display: "none" }}>
        <p className='url'>{blog.url}</p>
        <p className='likes'>
          {blog.likes}
          <button
            className='likeBtn'
            data-testid='like btn'
            onClick={(e) => {
              handleUpdateBlog(
                e,
                { ...blog, likes: String(+blog.likes + 1) },
                blog.id,
              );
            }}>
            likes
          </button>
        </p>

        {user?.username === blog?.user?.username ? (
          <button
            data-testid='delete btn'
            onClick={() => handleDeleteBlog(blog.id, blog.title)}>
            remove
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Blog;
