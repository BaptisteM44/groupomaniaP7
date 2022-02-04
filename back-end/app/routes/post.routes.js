module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    const auth = require('../middleware/authJwt')

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", auth, posts.createPost);
  
    // Retrieve all Tutorials
    router.get("/", auth, posts.getAllPosts);

    // Retrieve a single Tutorial with id
    router.get("/:id", auth, posts.getOnePost);
    
    // Delete a Tutorial with id
    router.delete("/:id", auth, posts.deletePost);

    app.use('/api/posts', router);
  };