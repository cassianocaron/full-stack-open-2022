const config = require("../utils/config");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;
  const token = request.token;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }).populate("user", { username: 1, name: 1 });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  blog.comments = blog.comments.concat(comment);

  const updatedBlog = await blog.save();

  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const user = request.user;
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const id = request.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });

  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

module.exports = blogsRouter;
