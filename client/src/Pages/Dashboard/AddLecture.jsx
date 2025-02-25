import { useDispatch } from "react-redux";
import Layout from "../../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/lectureSlice";


function AddLecture(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const courseDelails = useLocation();

    const [userInput, setUserInput] = useState({
        id: courseDelails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
    });


    function handleInputChange(event){
        const { name, value } = event.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    };

    function getVideo(event){
        const video = event.target.files[0];
        const source = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source,
        });
    };

    async function handleFormSubmit(event){
        event.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.lecture){
            toast.error("All fields are mandatory...");
            return;
        }

        const res = await dispatch(addCourseLecture(userInput));

        if(res?.payload?.success){
            setUserInput({
                id: courseDelails?._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            });
        }
    };

    useEffect(() => {
        if(!courseDelails) navigate(-1);
    },[])

    return(
        <Layout>
            <div className="min-h-[92vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 w-96 shadow-[0_0_10px_black]">
                    <header className="relative flex items-center justify-center">
                        <button onClick={() => navigate(-1)} 
                                className="absolute left-2 text-xl text-green-500">
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add Your New Lecture
                        </h1>
                    </header>
                    <form className="flex flex-col gap-3"
                          onSubmit={handleFormSubmit}  >

                        <input type="text" name="title" id="title"
                               className="bg-transparent px-3 py-1 border"
                               placeholder="Enter the title for the lecture..."
                               value={userInput.title}
                               onChange={handleInputChange}  />

                        <textarea name="description" id="description"
                                  className="bg-transparent px-3 py-1 h-24 border resize-none overflow-y-scroll"
                                  placeholder="Enter description of the Lecture..."
                                  value={userInput.description}
                                  onChange={handleInputChange}  >

                        </textarea>
                        { userInput.videoSrc ? (
                            <video src={userInput.videoSrc}
                                   muted
                                   controls
                                   controlsList="nodownload nofullscreen"
                                   disablePictureInPicture
                                   className="w-full object-fill rounded-tr-lg rounded-tl-lg" >
                            </video>
                        ) : (
                            <div className="flex items-center justify-center h-48 border cursor-pointer">
                                <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">
                                    Choose Your Video
                                </label>
                                <input type="file" name="lecture" id="lecture"
                                       className="hidden"
                                       accept="video/mp4,video/x-m4v,video/*"
                                       onChange={getVideo} />
                            </div>
                        )}

                        <button className="btn-primary  py-2 text-xl font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg"
                                type="submit">
                            Add Lecture
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};


export default AddLecture;