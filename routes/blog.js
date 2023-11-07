const express = require("express");
const router = express.Router();
const multer = require("multer");
const Filter = require("bad-words");

const BlogModel = require("../models/blogModel");
const UserModel = require("../models/userModel");
require("dotenv").config();

const filter = new Filter();

router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json({
      status: "success",
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get author blogs by his id

router.get("/author/:authorId", async (req, res) => {
  try {
    const blog = await BlogModel.find({ authorId: req.params.authorId });

    if (!blog) {
      return res.status(404).json({
        status: "Failed",
        message: "Blog with given Id not found",
      });
    } else {
      //increment the `readCount` property
      blog.readCount === 0 ? blog.readCount++ : blog.readCount++;
      // await blog.save();
    }

    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (err) {
    throw err;
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, likes, category, imageUrl } = req.body;
    console.log("Body", req.body);
    let { author, authorId } = req.body;

    const blog = await BlogModel.create({
      title,
      description,
      likes,
      imageUrl,
      author,
      authorId,
      category,
    });

    console.log(blog);

    //send back response
    res.status(201).json({
      status: "success",
      blog,
    });
  } catch (err) {
    throw err;
  }
});

router.put("/:blogId", async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      {
        new: true,
      }
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to update blog" });
  }

  // const { state, body } = req.body;
  // try {
  //   const findBlog = await BlogModel.findOne({
  //     authorId: req.body.authorId,
  //     _id: req.body._id,
  //   });

  //   console.log("Find Blog", findBlog);
  //   findBlog.state = state;
  //   await findBlog.save();
  //   res.status(200).json({
  //     status: "success",
  //     findBlog,
  //   });
  // } catch (err) {
  //   throw err;
  // }
});

//get blog by its Id
router.get("/:blogId", async (req, res) => {
  try {
    const blog = await BlogModel.findById({ _id: req.params.blogId });

    if (!blog) {
      return res.status(404).json({
        status: "Failed",
        message: "Blog with given Id not found",
      });
    } else {
      //increment the `readCount` property
      blog.readCount === 0 ? blog.readCount++ : blog.readCount++;
      // await blog.save();
    }

    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (err) {
    throw err;
  }
});

// Delete blog by its Id
router.delete("/:blogId", async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndRemove(req.params.blogId);

    if (!blog)
      return res.status(404).json({
        status: "Fail",
        message: "Blog with given Id not found",
      });

    //return deleted post
    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (err) {
    throw err;
  }
});

// Filter blogs category wise

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.body;
    console.log(category);
    const filteredBlogs = await BlogModel.filter(
      (blog) => blog.category === category
    );

    console.log(filteredBlogs);

    res.status(200).json({
      status: "success",
      filteredBlogs,
      message: "Blog filtered successfully",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// Like Blog
router.put("/like/:blogId", async (req, res) => {
  try {
   
      const blog = await BlogModel.findByIdAndUpdate(
        req.params.blogId,
        {
          $push: { likes: req.body.userId },
        },
        { new: true }
      );

      console.log(blog);

      res.status(200).json({
        status: "success",
        blog,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/unlike/:blogId", async (req, res) => {
  try {
   
      const blog = await BlogModel.findByIdAndUpdate(
        req.params.blogId,
        {
          $pull: { likes: req.body.userId },
        },
        { new: true }
      );

      console.log(blog);

      res.status(200).json({
        status: "success",
        blog,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
