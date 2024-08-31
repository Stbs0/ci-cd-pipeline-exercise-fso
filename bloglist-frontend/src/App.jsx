import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogPage from "./components/BlogPage";
import LogInForm from "./components/LoginPage";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const blogVisRef = useRef();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleDeleteBlog = async (id,title) => {
    try {
      if (window.confirm(`remove blog "${title}"`)) {
        await blogService.remove(id);

        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
    } catch (error) {console.log(error);}
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };
  const handleUpdateBlog = async (e, newBlog, id) => {
   
    try {
      const res = await blogService.update(newBlog, id);
      console.log(res);
      const filtered = blogs.filter((blog) => blog.id !== res.id);
      setBlogs([...filtered, res]);

      setMessage("Blog updated");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      throw error;
    }
  };

  const handleCreateBlog = async (blogObj) => {
    try {
      const res = await blogService.create(blogObj);
      setBlogs([...blogs, res]);
      blogVisRef.current.toggleVisibility();
      setMessage("Blog created");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {user === null ? (
        <LogInForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          message={message}
          errorMessage={errorMessage}
        />
      ) : (
        <BlogPage
          message={message}
          errorMessage={errorMessage}
          handleLogout={handleLogout}
          handleUpdateBlog={handleUpdateBlog}
          user={user}
          handleCreateBlog={handleCreateBlog}
          blogs={blogs}
          ref={blogVisRef}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  );
};

export default App;
