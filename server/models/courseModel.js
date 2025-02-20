import {  model, Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title of the course is required."],
        minLength: [5, "Title should be of atleast 5 Characters."],
        maxLength: [50, "Title should be less than 50 Characters."],
        trim: true,
    },
    description: {
        type: String,
        requreid: [true, "Description of the title is required."],
        minLenght: [10, "Description should be of atleast of 10 Characters."]
    },
    category: {
        type: String,
        required: [true, "Category of the course is required."]
    },
    thumbnail: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String
        }
    },
    lectures: [
    {
        title: String,
        description: String,
        lecture: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
    },
  ],
  numberOfLectures: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: [true, "Course Instructor's name is required."]
  },
},{
    timestamps: true
});

const Course = model("course", courseSchema);

export default Course;
