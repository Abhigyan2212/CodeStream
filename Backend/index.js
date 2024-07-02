import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js"

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);


// deployment

if(process.env.NODE_ENV === "production"){
    const dirpath = path.resolve();
    app.use(express.static("Frontend/dist"));
    app.get("*",(req,res) =>{
        res.sendFile(path.resolve(dirpath,"Frontend","dist","index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});