const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(userRoute);

mongoose.connect(process.env.URI).then(
    () => {
    console.log("Connected Successfully!");
    app.listen(process.env.PORT || 8000, (err) => {
        if(err)
        console.log("Error: ", err);
    });
}).catch(
    (error) => {
    console.log("Error: ", error);
})