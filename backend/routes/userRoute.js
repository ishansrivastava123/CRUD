const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const router = express.Router();

// Create User

router.post("/", async (req, res) => {
    const {name, email, age} = req.body;
    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age
        })
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})

// Show All Users

router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
})

// Get Single User

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const singleUser = await User.findById({_id: id});
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
})

// Delete All Users

router.delete("/deleteAll", async (req, res) => {
    try {
        const deleteResult = await User.deleteMany({});
        res.status(200).json({ message: `${deleteResult.deletedCount} users deleted successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
})

// Delete User

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json(deleteUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
})
// Update/Put User

router.patch("/:id", async (req, res) => {
    const {id} = req.params;
    const {name, email, age} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
})

module.exports = router;