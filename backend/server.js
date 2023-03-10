require('dotenv').config({path : "./config/config.env"})
const express = require('express');
const connectionToDatabse = require('./config/database');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
const blogRouter = require('./routes/blogRoutes');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api", blogRouter);

const startMyApplication = async () => {
    try {
        await connectionToDatabse();
        app.listen(process.env.PORT, () => {
            console.log('successfully running');
        })
    } catch (error) {
        console.log(error);
    }
}

startMyApplication();