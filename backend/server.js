//Import All Dependencies
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./database/db');
const cors = require('cors');
const path = require("path");
const fileUpload = require('express-fileupload')

const dotenv = require("dotenv");
dotenv.config();


app.use(cookieParser());
app.use(express.json());
app.use(cors())
// app.use(fileUpload({
//     useTempFiles: true
// }));

//import routes
const StuGroupRoute = require("./routes/StuGroupRoute");

const markingRouter = require("./routes/markings.js");

//Routes
app.use('/user', require('./routes/User'));
app.use('/api', require('./routes/Upload'));
app.use('/api', require('./routes/ResearchTopicRoute'));
app.use("/group", StuGroupRoute);
app.use('/api/upload', require('./routes/fileUpload'));
app.use("/marking",markingRouter);

//Database connection
connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on PORT ${port}`));

