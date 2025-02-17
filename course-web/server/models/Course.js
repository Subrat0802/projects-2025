const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  whatYouWillLearn: {
    type: String,
    trim: true,
    required: true,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
  tag: {
    type: [String],
    required: true,
  },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//   },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
//   instructions: {
//     type: [String],
//   },
//   status: {
//     type: String,
//     enum: ["Draft", "Published"],
//   },
});

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);
