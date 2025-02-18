const Section = require("../models/Section");
const SubSection = require("../models/subSection");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                message:"All filds are required",
                success:true
            })
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectId
        const updateCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent:newSection._id
                }
            },
            {new:true}
        ).populate("courseContent").exec();
        //return response
        return res.status(200).json({
            message:"Course Section is created",
            success:true,
            data:updateCourseDetails
        })

    }catch(error){
        return res.status(500).json({
            message:"Someting went wrong while creating section",
            success:false
        })
    }
}


exports.updateSection = async(req, res) => {
    try{
        const {sectionName, sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                message:"All filds are required",
                success:true
            })
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true})

        return res.status(200).json({
            message:"Section Updated",
            success:true
        })
    }catch(error){
        return res.status(500).json({
            message:"Someting went wrong while creating section",
            success:false
        })
    }
}


exports.deleteSection = async (req, res) => {
    try{
        //getid
        const {id} = req.user;
        const {sectionId} = req.params;
        //findby id and delete
        await Section.findByIdAndDelete(sectionId);
        await Course.findByIdAndDelete(id, {courseContent:sectionId}, {new:true})
        //return response
        return res.status(200).json({
            message:"Section deleted successfully",
            success:true
        })

    }catch(error){
        return res.status(500).json({
            message:"Someting went wrong while creating section",
            success:false
        })
    }
}