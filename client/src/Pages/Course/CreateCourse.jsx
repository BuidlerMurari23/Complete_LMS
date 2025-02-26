import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";
import { createNewCourse, updateCourseById } from "../../Redux/courseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";


function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

        
    const  initialCouserData  = useLocation();
    console.log("init", initialCouserData)
    
    // const {initialCouserData} = undefined

    const [isDisabled, setIsDisabled] = useState(!initialCouserData?.newCourse);

    const [userInput, setUserInput] = useState({
        title: initialCouserData?.title,
        description: initialCouserData?.description,
        category: initialCouserData?.category,
        thumbnail: null,
        previewImage: initialCouserData?.thumbnail?.secure_url,
        createBy: initialCouserData?.createdBy,
    });

    function getImage(event){
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();

            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function (){
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                });
            });
        }
    };


    function handleUserInput(event){
        const { name, value } = event.target;

        setUserInput({
            ...userInput,
            [name]: value,
        });
    };

    async function handleFormSubmit(event){
        event.preventDefault();

        let res = undefined;

        if(initialCouserData.newCourse){
            if( !userInput.title || !userInput.description || !userInput.category || !userInput.createBy || !userInput.thumbnail){
                toast.error("All fields are mandatory...")
            }

            res = await dispatch(createNewCourse(userInput));
        } else {
            if(!userInput.title || !userInput.description || !userInput.category || !userInput.createBy){
                toast.error("All fields are mandatory...")
            }

            const courseData = {...userInput, id: initialCouserData._id};
            res = await dispatch(updateCourseById(courseData))
        }

        if(res?.payload?.success){
            setUserInput({
                title: "",
                description: "",
                category: "",
                createBy: "",
                thumbnail: null,
                previewImage: "",
            });

            setIsDisabled(false);
            navigate("/admin/dashboard")
        }
            
    }


    return (
        <Layout>
            <div className="flex items-center justify-center h-[92vh]">
                <form className="relative flex flex-col justify-center p-4 gap-5 my-10 text-white rounded-lg w-[700px] h-[450px] shadow-[0_0_10px_black]"
                      onSubmit={handleFormSubmit} noValidate>

                    
                    <Link to={"/admin/dashboard"}
                          className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center font-bold text-2xl">
                        {!initialCouserData.newCourse ? "Update" : "Create New"}{" "} <span>Course</span>
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="space-y-6">
                            <div onClick={() => !initialCouserData.newCourse ? toast.error("Can not upload thumbnail.") : ""}>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img src={userInput.previewImage} alt="Preview Image"
                                             className="w-full h-44 m-auto border" />
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input type="file" id="image_uploads" name="image_uploads"
                                       className="hidden"
                                       accept=".jpg, .jpeg, .png, .webp, .mp4"
                                       disabled={isDisabled}
                                       onChange={getImage}  />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="font-semibold text-xl">
                                    Course Title
                                </label>
                                <input type="text" name="title" id="title"
                                       placeholder="Enter Your course title"
                                       className="bg-transparent px-2 py-1 border"
                                       required
                                       value={userInput.title}
                                       onChange={handleUserInput}  />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="createBy" className="font-semibold text-xl">
                                    Instructor Name
                                </label>
                                <input type="text" name="createBy" id="createBy"
                                       placeholder="Enter Instructor Name"
                                       className="bg-transparent px-2 py-1 border"
                                       required
                                       value={userInput.createBy}
                                       onChange={handleUserInput}  />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="category" className="font-semibold text-xl">
                                    Course Category
                                </label>
                                <input type="text" name="category" id="category"
                                       placeholder="Enter Your course category"
                                       className="bg-transparent px-2 py-1 border"
                                       required
                                       value={userInput.category}
                                       onChange={handleUserInput}  />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="description" className="font-semibold text-xl">
                                    Course Description
                                </label>
                                <input type="text" name="description" id="description"
                                       placeholder="Enter Your course description"
                                       className="bg-transparent px-2 py-1 border h-24 overflow-scroll resize-none"
                                       required
                                       value={userInput.description}
                                       onChange={handleUserInput}  />
                            </div>

                        </div>
                    </main>
                    <button className="text-lg font-semibold bg-yellow-600 hover:bg-yellow-500 w-full text-center py-2 rounded-lg transition-all ease-in-out duration-300 cursor-pointer"
                            type="submit">
                            {!initialCouserData.newCourse ? "Update Course" : "Create Course"}
                    </button>
                </form>
            </div>
        </Layout>
    )
};


export default CreateCourse;