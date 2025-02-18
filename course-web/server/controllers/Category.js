const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // crate enter in db
    const changepasswordategoryDetails = await Category.create({
      name,
      description,
    });
    console.log(categoryDetails);

    return res.status(200).json({
        success:false,
        message:"Category is created successfully"
    })
  } catch (error) {
    return res.status(500).json({
        message:"Error while creating tags",
        success:false
    })
  }
};


//get all tags

exports.showAllcategory = async (req, res) => {
    try{
        const allTags = await Category.find({}, {name:true, description:true});
        if(!allCategory ){
            return res.status(400).json({
                message:"There is no category."
            })
        }
        return res.status(200).json({
            message:"All category.",
            success:true,
            data:allTags
        })
    }catch(error){
        return res.status(500).json({
            message:"Error while fetching all category",
            error:error.message
        })
    }
}