const SubSection = require("../models/subSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.crateSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;
    const video = req.body.videoFile;
    if (!title || !timeDuration || !description || sectionId || !video) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videourl: uploadDetails.secure_url,
    });

    if (!subSectionDetails) {
      return res.status(409).json({
        message: "Sub section is not created please try again",
        error:error.message,
        success: false,
      });
    }

    await Section.findByIdAndUpdate(
      sectionId,
      {$push: { subSection: subSectionDetails._id }},
      { new: true }
    );

    return res.status(200).json({
      message: "Sub Section is created",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
        message: "error while creating, Sub Section",
        success: false,
        error:error.message
      });
  }
};
