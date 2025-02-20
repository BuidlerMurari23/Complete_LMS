import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import cloudinary from "cloudinary";
import path from 'path';
import fs from 'fs/promises';
import AppError from "../utils/AppError.js";
import Course from "../models/courseModel.js";


export const getAllCourses = asyncHandler( async (_req, res, _next) => {
    const courses = await Course.find({}).select('-lectures');

    res.status(200).json({
        success: true,
        message: "All Courses.",
        courses,
    });
});


export const createCourse = asyncHandler( async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if(!title || !description || !category || !createdBy){
        return next( new AppError("All fields are required.", 400));
    }

    const course = Course.create({
        title,
        description,
        category,
        createdBy,
    });

    if(!course){
        return next( new AppError("Sorry! Course could not be created. Please try again."))
    }

    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "LMS_Courses"
            });

            if(result){
                (await course).thumbnail.public_id = result.public_id;
                (await course).thumbnail.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
                
        } catch (e) {
            // Empty the uploads directory/folder without deleting the uploads directory/folder
            for ( const file of await fs.readdir('uploads/')){
                await fs.unlink(path.join('uploads/', file));
            }
            return next( new AppError(JSON.stringify(e) || "File not uploaded. Please try again.", 401))
        }

        (await course).save();

        res.status(200).json({
            success: true,
            message: "Your course is created successfully.",
            course,
        });
    }
});


export const getLecturesByCourseId = asyncHandler( async (req, res, next) => {
    const { id } = req.params;

    if(!id){
        return next(new AppError("id in the params is missing.", 400))
    }

    const course = await Course.findById(id);

    if(!course){
        return next(new AppError(`Invaild Id. Course doesnot exists with given id: ${id}`, 400))
    }

    res.status(200).json({
        success: true,
        message: `Course lectures are featched successfully wiht id: ${id}`,
        lectures: course.lectures,
    });
});

export const addLectureToCourseById = asyncHandler( async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;

    if(!title || !description){
        return next(new AppError("Title and Description are required.", 400));
    }

    if(!id){
        return next(new AppError("id is required to fetch the course.", 400))
    }
    const course = await Course.findById(id);

    if(!course){
        return next(new AppError(`Course doesnot exist with id: ${id}`, 400));
    }

    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "LMS_Courses",
                chunk_size: 50 * 1024 * 1024, //50 MB file size,
                resource_type: 'video',
            });

            if(result){
                lectureData.public_id = result.public_id;
                lectureData.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`)
        } catch (e) {
            for( const file of await fs.readdir('uploads/')){
                await fs.unlink(path.join('uploads/', file));
            }

            return next(new AppError(e.JSON.stringify(e) || "Sorry! File not uploaded. Please try again.", 401))
        }

        course.lectures.push({
            title,
            description,
            lecture: lectureData,
        });

        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "leactures are add to course successfully.",
            course,
            lectures: course.lectures,
        });
    }
});


export const removeLectureFromCourse = asyncHandler( async (req, res, next) => {
    const { courseID, lectureID } = req.params;

    if(!courseID){
        return next( new AppError("Course ID is required.", 400));
    }

    if(!lectureID){
        return next( new AppError("Lecture ID is required.", 400));
    }

    const course = await Course.findById(courseID);

    if(!course){
        return next(new AppError(`Course doesnot exists with the given id: ${courseID}`, 400));
    }

    const lectureIndex = course.lectures.findIndex((lecture) => lecture._id.toString() === lectureID.toString());

    if(lectureIndex === -1){
        return next(new AppError("Lecture doesnot exist", 401));
    }

    await cloudinary.v2.uploader.destroy(
        course.lectures[lectureIndex].lecture.public_id, {
        resource_type: 'video',
    });

    course.lectures.splice(lectureIndex, 1);

    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: "Lecture is removed successfully from the course."
    });
});


export const updateCourseById = asyncHandler( async (req, res, next) => {
    const { id } = req.params;

    if(!id){
        return next(new AppError("Id is required to fetch course.", 400));
    }

    const course = await Course.findByIdAndUpdate(
        id,
        {
            $set: req.body,   // This will only update the fields which are present
        },
        {
            runValidators: true // This will run the validation checks on the new data.
        }
    )

    if(!course){
        return next(new AppError(`Course doesnot exist with given id: ${id}`, 400));
    }

    await course.save();

    res.status(200).json({
        success: true,
        message: "Your course is updated.",
        course
    });
});

export const deleteCourseById = asyncHandler( async (req, res, next) => {
    const { id } = req.params;

    if(!id){
        return next(new AppError("Id is requierd to featch course.", 400));
    }

    // const course = await Course.findByIdAndDelete(id);

    const course = await Course.findById(id);

    if(!course){
        return next(new AppError(`Course doesnot exists with the given id: ${id}`, 400));
    }

    await course.remove();

    res.status(200).json({
        success: true,
        message: "Course is deleted successfully."
    })
})


