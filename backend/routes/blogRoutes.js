const blogController = require('../controllers/blogController');
const isAuthenticated = require('../middlewares/auth');
const blogRouter = require('express').Router();

blogRouter.route("/create")
    .post(isAuthenticated, blogController.create)

blogRouter.route("/like/:id").put(isAuthenticated, blogController.likeBlog);

blogRouter.route("/comment/:id")
    .post(isAuthenticated, blogController.commentBlog)
    .delete(isAuthenticated, blogController.deleteComment);

blogRouter.route("/blog/:id")
    .get(isAuthenticated, blogController.getBlog)
    .put(isAuthenticated ,blogController.updateBlog)
    .delete(isAuthenticated, blogController.deleteBlog);

module.exports = blogRouter;