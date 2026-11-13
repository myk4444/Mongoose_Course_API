require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Course = require("./models/Course");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(
        process.env.MONGODB_URI ||
        "mongodb://127.0.0.1:27017/mongooseCourseDemo"
    )
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

//Put Mongoos Crud Methods here
// GET / - Display a welcome message when visiting the homepage
app.get("/", (req, res) => {
    res.send("WEBD 172 Week 10 Mongoose Course API");
});

// GET /api/courses - Retrieve all courses from MongoDB
app.get("/api/courses", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Unable to load courses" });
    }
});

// GET /api/courses/:id - Retrieve one course by its ID
app.get("/api/courses/:id", async (req, res) => {
    try {
        // Find one course using its MongoDB ID
        const course = await Course.findById(req.params.id);

        // If the course doesn't exist, return 404
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Send the course back as JSON
        res.json(course);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: "Unable to load course" });
    }
});

// POST /api/courses - Create a new course in MongoDB
app.post("/api/courses", async (req, res) => {
    try {
        // Create a new course using information from the request
        const course = await Course.create({
            title: req.body.title,
            department: req.body.department,
            units: req.body.units,
            delivery: req.body.delivery, // NEW LINE
            description: req.body.description
        });

        // Return the new course with status 201 (Created)
        res.status(201).json(course);
    } catch (error) {
        // Return an error if the course cannot be created
        res.status(400).json({
            message: "Unable to create course",
            error: error.message
        });
    }
});

// PUT /api/courses/:id - Update an existing course in MongoDB
app.put("/api/courses/:id", async (req, res) => {
  try {
    // Find the course by its ID and update its information
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        department: req.body.department,
        units: req.body.units,
        delivery: req.body.delivery, // NEW LINE
        description: req.body.description
      },
      {
        new: true, // Return the updated course
        runValidators: true // Check the updated information
      }
    );

    // If the course does not exist, return 404
    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // Return the updated course
    res.json(course);

  } catch (error) {
    // Handle errors
    res.status(400).json({
      message: "Unable to update course",
      error: error.message
    });
  }
});

// DELETE /api/courses/:id - Delete a course from MongoDB
app.delete("/api/courses/:id", async (req, res) => {
  try {
    // Find the course by its ID and delete it
    const course = await Course.findByIdAndDelete(req.params.id);

    // If the course doesn't exist, return 404
    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // Confirm that the course was deleted
    res.json({
      message: "Course deleted successfully",
      course: course
    });

  } catch (error) {
    // Handle errors
    res.status(400).json({
      message: "Unable to delete course",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
