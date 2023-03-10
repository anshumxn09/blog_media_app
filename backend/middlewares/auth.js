const jsonwebtoken = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;

        if(!token){
            return res.status(400).json({
                sucess : false,
                message : "kindly login first"
            })
        }

        const data = await jsonwebtoken.verify(token, process.env.SECRET);
        req.user = data;

        next();
    } catch (error) {
        return res.status(500).json({
            sucess : false,
            message : error.message
        })
    }
}

module.exports = isAuthenticated