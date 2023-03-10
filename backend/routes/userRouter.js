const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/auth');
const userRouter = require('express').Router();


userRouter.route("/register").post(userController.register)
userRouter.route("/login").post(userController.login)
userRouter.route("/logout").get(userController.logout)

userRouter.route("/me").get(isAuthenticated, userController.getMe)

userRouter.route("/users").get(isAuthenticated, userController.getAllUser);

userRouter.route("/following/blogs").get( isAuthenticated, userController.getFollowingBlogs);

userRouter.route("/favourite/:id")
    .put(isAuthenticated, userController.addToFavourite)
userRouter.route("/favourite").get(isAuthenticated, userController.getAllFav)

userRouter.route("/user/:id")
    .put( isAuthenticated, userController.followAndUnfollow)
    .get(isAuthenticated, userController.getUser)

userRouter.route("/edit/profile").put(isAuthenticated, userController.updateProfile)
userRouter.route("/edit/password").put(isAuthenticated, userController.updatePassword)

module.exports = userRouter;