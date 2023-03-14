const userSchema = require("../schema/userSchema");
const emailValidator = require('email-validator');
const blogSchema = require("../schema/blogSchema");
const cloudinary = require('cloudinary');

const userController = {
    register : async (req, res) => {
        try {
            const {name, password, email, avatar} = req.body;

            if(!name || !password || !email){
                return res.status(400).json({
                    success : false,
                    message : "oops some fields are missing"
                })
            }

            let image = {
                public_id : "NONE",
                url : "https://res.cloudinary.com/anshumxn09/image/upload/v1678185432/Blog/rrlgunravwoq1idxm61d.jpg"
            }

            let user = await userSchema.findOne({email});
            if(user){
                return res.status(400).json({
                    success : false,
                    message : "user already exists"
                })
            } 

            if(!emailValidator.validate(email)){
                return res.status(400).json({
                    success : false,
                    message : "invalid email address"
                })
            }

            if(password.length < 7){
                return res.status(400).json({
                    success : false,
                    message : "password must have atleast 8 characters"
                })
            }

            if(avatar){
                const myImage = await cloudinary.v2.uploader.upload(avatar, {
                    folder : "Blog_Media"
                })

                image.public_id = myImage.public_id;
                image.url = myImage.secure_url;
            }

            user = new userSchema({name, email, password , avatar : image
            })

            await user.save(); 

            const token = await user.generateToken();

            return res.cookie("token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly : true
            }).status(200).json({
                success : true,
                message : "user registerd successfully",
                user
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    login : async (req, res) => {
        try {
            const {password, email} = req.body;

            if(!password || !email){
                return res.status(400).json({
                    success : false,
                    message : "oops some fields are missing"
                })
            }

            if(!emailValidator.validate(email)){
                return res.status(400).json({
                    success : false,
                    message : "invalid email address"
                })
            }

            let user = await userSchema.findOne({email}).select("+password");

            if(!user){
                return res.status(400).json({
                    success : false,
                    message : "user doesn't exists"
                })
            } 

            const isMatch = await user.isMatchedPassword(password);

            if(!isMatch){
                return res.status(400).json({
                    success : false,
                    message : "invalid credentials"
                })
            } 

            const token = await user.generateToken();

            return res.cookie("token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly : true
            }).status(200).json({
                success : true,
                message : "user logged in successfully",
                token,
                user
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    logout : async (req, res) => {
        try {
            return res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly : true
            }).status(200).json({
                success : true,
                message : "user logged out successfully",
            })
        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    updateProfile : async (req, res) => {
        try {
            const user = await userSchema.findById(req.user._id);
            const {name, avatar} = req.body;
            user.name = name;
            if(avatar){
                if(user.avatar.public_id !== "sample_id"){
                    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
                }
                const myImage = await cloudinary.v2.uploader.upload(avatar);
                user.avatar.public_id = myImage.public_id;
                user.avatar.url = myImage.secure_url;
            }

            await user.save();

            return res.status(200).json({
                success :  true,
                message  : "updated profile successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    updatePassword : async (req, res) => {
        try {
            const {oldpass, newpass} = req.body;

            if(!oldpass || !newpass){
                return res.status(400).json({
                    success :  true,
                    message  : "oops some fields are missing"
                })
            }

            if(newpass.length < 7){
                return res.status(400).json({
                    success : false,
                    message : "password must have atleast 8 characters"
                })
            }

            const user = await userSchema.findById({
                _id  : req.user._id
            }).select("+password");

            const isMatch = await user.isMatchedPassword(oldpass);

            if(!isMatch){
                return res.status(400).json({
                    success :  false,
                    message  : "old password entered wrong"
                }) 
            }

            user.password = newpass;
            await user.save();

            return res.status(200).json({
                success :  true,
                message  : "updated password successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    getMe : async (req, res) => {
        try {
            
            const user = await userSchema.findById(req.user._id).populate("followers followings blogs");

            return res.status(200).json({
                success :  true,
                user
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    followAndUnfollow : async (req, res) => {
        try {
            
            const {id} = req.params;
            const userToFollow = await userSchema.findById(id);
            const me = await userSchema.findById(req.user._id);
            let message = ""

            if(!userToFollow){
                return res.status(400).json({
                    success :  false,
                    message : "user doesn't exists"
                })
            }

            if(userToFollow.followers.includes(req.user._id)){
                let index = userToFollow.followers.indexOf(req.user._id);
                userToFollow.followers.splice(index, 1);

                let followIndex = me.followings.indexOf(id);
                me.followings.splice(followIndex,1);

                message  = `unfollowed ${userToFollow.name}`;
            }else{
                userToFollow.followers.push(req.user._id);
                me.followings.push(id);
                message  = `followed ${userToFollow.name}` 
            }

            await userToFollow.save();
            await me.save();

            return res.status(200).json({
                success :  true,
                message
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    addToFavourite : async (req, res) => {
        try {
            
            const {id} = req.params;
            let message = ""
            const user = await userSchema.findById(req.user._id);
            if(user.favourites.includes(id)){
                let index = user.favourites.indexOf(id);
                user.favourites.splice(index, 1);
                message = "removed from favourites"
            }else{
                user.favourites.push(id);
                message = "added into favourites"
            }

            await user.save();

            return res.status(200).json({
                success :  true,
                message
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    getAllFav : async (req, res) => {
        try {
            
            const user = await userSchema.findById(req.user._id);
            
            let blogs = []

            for(let i=0; i<user.favourites.length; i++){
                const blog = await blogSchema.findById(user.favourites[i]).populate("owner likes comments.user");
                blogs.push(blog);
            }

            return res.status(200).json({
                success :  true,
                fav : blogs
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    getUser : async (req, res) => {
        try {

            const {id} = req.params;
            const user = await userSchema.findById(id).populate("followers followings");

            let blogs = []
            for(var i=0; i<user.blogs.length; i++){
                const blog = await blogSchema.findById(user.blogs[i]).populate("likes comments.user owner");
                blogs.push(blog);
            }

            return res.status(200).json({
                success :  true,
                user,
                blogs
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    getAllUser : async (req, res) => {
        try {

            const users = await userSchema.find();

            return res.status(200).json({
                success :  true,
                users
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    getFollowingBlogs : async (req, res) => {
        try {

            const user = await userSchema.findById(req.user._id);

            const blogs = await blogSchema.find({
                owner  : {
                    $in : user.followings
                }
            }).sort({
                dateCreated : -1
            }).populate("likes comments.user owner");

            return res.status(200).json({
                success :  true,
                blogs
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    getMyBlogs : async (req, res) => {
        try {

            const user = await userSchema.findById(req.user._id);
            
            let blogs = []
            for(var i=0; i<user.blogs.length; i++){
                const getBlog = await blogSchema.findById(user.blogs[i]).populate("likes comments.user owner");
                blogs.push(getBlog);
            }

            return res.status(200).json({
                success :  true,
                blogs
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    }
}

module.exports = userController;