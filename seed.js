require("dotenv").config();

const mongoose = require("mongoose");
const Course = require("./models/Course");

// Five starting courses for the MongoDB database
const courses = [
  {
    title: "HTML and CSS",
    department: "WEBD",
    units: 3,
    delivery: "Online",
    description: "Beginning web page development."
  },
  {
    title: "JavaScript for Web Development",
    department: "WEBD",
    units: 3,
    delivery: "Online",
    description: "Client-side JavaScript fundamentals."
  },
  {
    title: "Full Stack JavaScript",
    department: "WEBD",
    units: 3,
    delivery: "Online",
    description: "Node, Express, React, MongoDB, and full-stack development."
  },
  {
    title: "Introduction to UX Design",
    department: "WEBD",
    units: 3,
    delivery: "Online",
    description: "Fundamentals of user experience design."
  },
  {
    title: "Web Development Fundamentals",
    department: "WEBD",
    units: 3,
    delivery: "Hybrid",
    description: "Introduction to modern web development."
  }
];

// Connect to MongoDB and insert starting courses
async function seedDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
      "mongodb://127.0.0.1:27017/mongooseCourseDemo"
    );

    // Remove existing courses before inserting starting data
    await Course.deleteMany({});

    // Insert the five starting courses
    await Course.insertMany(courses);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();