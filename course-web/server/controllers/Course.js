const Course = require("../models/Course");
const Category = require("../models/Category");
const {
  uplaodImageCloudinary,
  uploadImageToCloudinary,
} = require("../utils/imageUploader");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;

    //get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    //check instructor
    const userId = req.userId.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor not found",
      });
    }

    //check given tag is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "tag not found",
      });
    }

    //cloudinary image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //add the new course of user Instructor schema
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      { _id: tagDetails._id },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    return res.status(200).json({
      message: "course is created successfully",
      data: newCourse,
      success: true,
    });
  } catch (error) {
    console.log("Error");
    return res.status(500).json({
      message: "Error while creating new course",
      error: error.message,
    });
  }
};

//get all courses
exports.showAllCourses = async (req, res) => {
  try {
    const allCOurses = await Course.find(
      {},
      {
        price: true,
        thumbnail: true,
        instructor: true,
        ratinfAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exen();

    return res.status(200).json({
        success:true,
        message:"data for all courses fetched successfully"
    })
  } catch (error) {
    return res.status(500).json({
        message:"Error while fetching all Courses",
        error:error.message,
        success:false
    })
  }
};
