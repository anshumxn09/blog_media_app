const blogSchema = require("../schema/blogSchema");
const userSchema = require("../schema/userSchema");

const blogController = {
    create : async (req, res) => {
        try {
            
            const {title, description} = req.body;
            const user = await userSchema.findById(req.user._id);

            if( !description || !title){
                return res.status(400).json({
                    success : false,
                    message : "oops some fields are missing"
                })
            }

            const blog = new blogSchema({
                title, description, owner : req.user._id,
            })

            user.blogs.unshift(blog._id);

            await blog.save();
            await user.save();

            return res.status(200).json({
                success :  true,
                message  : "blog created successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    getBlog : async (req, res) => {
        try {
            const {id} = req.params;
            const blog = await blogSchema.findById(id);
            return res.status(200).json({
                success :  true,
                blog
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    likeBlog : async (req, res) => {
        try {
            const {id} = req.params;
            const blog = await blogSchema.findById(id);
            let message = "";

            if(blog.likes.includes(req.user._id)){
                let index = blog.likes.indexOf(req.user._id);
                blog.likes.splice(index, 1);
                message = "you have unliked this blog"
            }else{
                blog.likes.push(req.user._id);
                message = "you have liked this blog"
            }
            await blog.save();

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
    updateBlog : async (req, res) => {
        try {
            
            const {title, description} = req.body;
            const {id} = req.params;

            const blog = await blogSchema.findById(id);

            if(title){
                blog.title = title;
            }  

            if(description){
                blog.description = description;
            }

            console.log("Anshuman");

            await blog.save();

            return res.status(200).json({
                success :  true,
                message  : "blog updated successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    commentBlog : async (req, res) => {
        try {
            
            const {message} = req.body;
            const {id} = req.params;
            const blog = await blogSchema.findById(id);

            if(!message){
                return res.status(400).json({
                    success :  false,
                    message  : "comment is required"
                })
            }
            
            let found = false;
            blog.comments.forEach((elem) => {
                if(elem.user.toString() === req.user._id.toString()){
                    found = true;
                    elem.message = message;
                }
            })

            if(!found){
                blog.comments.push({
                    user : req.user._id,
                    message
                })
            }

            await blog.save();

            return res.status(200).json({
                success :  true,
                message  : "commented successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    deleteComment : async (req, res) => {
        try {
            
            const {id} = req.params;
            const blog = await blogSchema.findById(id);

            blog.comments.forEach((elem, index) => {
                if(elem.user.toString() === req.user._id.toString()){
                    blog.comments.splice(index, 1);
                }
            })

            await blog.save();

            return res.status(200).json({
                success :  true,
                message  : "deleted successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
    deleteBlog : async (req, res) => {
        try {
            
            const {id} = req.params;
            await blogSchema.findByIdAndDelete(id);

            return res.status(200).json({
                success :  true,
                message  : "deleted blog successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success :  false,
                message  : error.message
            })
        }
    },
}

module.exports = blogController;