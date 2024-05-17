const express = require("express");
const router = express.Router();
const Blog = require("../functions/Blog");

const blog = new Blog("blogPosts.json");

// Route to get all posts
router.get("/", (req, res) => {
  blog.getAllPosts((err, posts) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(posts);
  });
});

// Route to get a single post by ID
router.get("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId)) {
    return res.status(400).send("Invalid post ID");
  }

  blog.getPostById(postId, (err, post) => {
    if (err) {
      console.error(err);
      res.status(404).send("Post not found");
      return;
    }
    res.json(post);
  });
});

// Route to create a new post
router.post("/", (req, res) => {
  const postData = req.body;
  blog.createPost(postData, (err, createdPost) => {
    if (err) {
      res.status(err.statusCode || 500).send(err.message || "Internal Server Error");
      return;
    }
    res.status(201).json(createdPost);
  });
});

// Route to delete a post by ID
router.delete("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId)) {
    return res.status(400).send("Invalid post ID");
  }

  blog.deletePostById(postId, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.sendStatus(204); 
  });
});

module.exports = router;
