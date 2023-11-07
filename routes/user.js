const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
require("dotenv").config();



router.put("/:userId", async (req, res) => {
    try {
      const updateUser = await UserModel.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
        },
        { new: true }
      );

      console.log(updateUser);
  
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //Delete User
  
  router.delete("/:userId", async (req, res) => {
    try {
      await UserModel.findByIdAndDelete(req.params.userId);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  //Get User By Id
  
  router.get("/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  
  //Get All Users
  
  router.get("/", async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  module.exports = router;
  