const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const { requireAuth } = require("./middleware/authMiddleware");
require("express-async-errors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("./models/Post");
const { StatusCodes } = require("http-status-codes");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// routes

app.use("/auth", authRouter);

app.get("/profile", (req, res) => {
  const token = req.cookies.jwt;
  // console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, payload) => {
    if (err) throw err;
    res.json(payload);
  });
  // console.log(token)
  console.log(__dirname);
});

// Refactor to different file
app.post("/create", upload.single("file"), async (req, res) => {
  /**
    destination: "uploads/"
    encoding: "7bit"
    fieldname: "file"
    filename: "38a3955121f1eecd27dcf695f0d190bc"
    mimetype: "image/jpeg"
    originalname: "alexandre-debieve-FO7JIlwjOtU-unsplash.jpg"
    path: "uploads\\38a3955121f1eecd27dcf695f0d190bc"
    size: 4980766
     */

  // Need to rename the file being saved
  const { originalname, path } = req.file;
  fs.renameSync(path, `uploads/${originalname}`);

  //Grab the user from token for author id
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, payload) => {
    if (err) throw err;

    //Create the post
    const { title, summary, content } = req.body;

    const postDoc = await Post.create({
      title,
      summary,
      content,
      image: `uploads/${originalname}`,
      author: payload.id,
    });

    res.status(StatusCodes.CREATED).json({ postDoc });
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .limit(10)
    .sort({ createdAt: -1 });
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", ["username"]);
  res.json(post);
});

app.put("/post/:id", upload.single("file"), async (req, res) => {

    const { id } = req.params;

    let newPath = null

  if (req.file) {
    const { originalname, path } = req.file;
    fs.renameSync(path, `uploads/${originalname}`);
    newPath = `uploads/${originalname}`
  }

  const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, payload) => {
    if (err) throw err;

    const { title, summary, content } = req.body;

    const postDoc = await Post.findById(id)

    const isAuthor = postDoc.author.toString() === payload.id

    if(!isAuthor) {
        res.status(StatusCodes.UNAUTHORIZED).json({message: "You are not the author of this post"})
    }

    await postDoc.updateOne({
        title,
        summary,
        content,
        image: newPath ? newPath : postDoc.image
    })
    
    //Create the post
    // const { title, summary, content } = req.body;

    // const postDoc = await Post.create({
    //   title,
    //   summary,
    //   content,
    //   image: `uploads/${originalname}`,
    //   author: payload.id,
    // });

    res.json(postDoc);
  });

});


app.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0), maxAge: 0, httpOnly: true });
  res.json({ message: "Logout successful" });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("Server on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// xDYcLYm9GbTp8T5D
// mongodb+srv://craverroy:xDYcLYm9GbTp8T5D@mern-blog.5vtldu9.mongodb.net/?retryWrites=true&w=majority
