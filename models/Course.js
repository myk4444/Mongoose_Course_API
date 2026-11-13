const mongoose = require("mongoose");

// Define the structure of each course in MongoDB
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  units: { type: Number, required: true, min: 1, max: 6 },
  delivery: { type: String, required: true, trim: true },
  description: { type: String, default: "" }
});

// Create the Course model using the schema
const Course = mongoose.model("Course", courseSchema);

// Allow server.js and seed.js to use this model
module.exports = Course;