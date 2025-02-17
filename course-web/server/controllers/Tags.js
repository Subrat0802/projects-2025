const Tag = require("../models/tags");

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // crate enter in db
    const tagDetails = await Tag.create({
      name,
      description,
    });
    console.log(tagDetails);

    return res.status(200).json({
        success:false,
        message:"Tag is created successfully"
    })
  } catch (error) {
    return res.status(500).json({
        message:"Error while creating tags",
        success:false
    })
  }
};


//get all tags

exports.showAlltags = async (req, res) => {
    try{
        const allTags = await Tag.find({}, {name:true, description:true});
        if(!allTags ){
            return res.status(400).json({
                message:"There is no tags."
            })
        }
        return res.status(200).json({
            message:"All Tags.",
            success:true,
            data:allTags
        })
    }catch(error){
        return res.status(500).json({
            message:"Error while fetching all tags",
            error:error.message
        })
    }
}