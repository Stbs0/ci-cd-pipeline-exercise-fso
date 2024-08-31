const dummy = (arr) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);
const favoriteBlog = (blogs) => {
  return blogs.reduce((most, blog) => {
    most.likes < blog.likes ? (most = blog) : most;
    delete most._id;
    delete most.__v;
    delete most.url;
    return most;
  }, blogs[0]);
};
const mostBlogs = (blogs) => {
  const most = new Map();
  blogs.forEach((blog) => {
    if (most.has(blog.author)) {
      most.set(blog.author, most.get(blog.author) + 1);
    } else {
      most.set(blog.author, 1);
    }
  });
  const n = [...most.entries()];
  const mostBlogger = n.reduce((sum, blog) => {
    if (blog[1] > sum[1]) {
      return blog;
    } else {
      return sum;
    }
  }, n[0]);
  return { author: mostBlogger[0], blogs: mostBlogger[1] };
};
const mostLikes = (blogs) => {
  const most = new Map();
  blogs.forEach((blog) => {
    if (most.has(blog.author)) {
      most.set(blog.author, most.get(blog.author) + blog.likes);
    } else {
      most.set(blog.author, blog.likes);
    }
  });

  const n = [...most.entries()];
  const totalLikes = n.reduce((sum, blog) => {
    return blog[1] > sum[1] ? blog : sum;
  }, n[0]);
  return { author: totalLikes[0], likes: totalLikes[1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
