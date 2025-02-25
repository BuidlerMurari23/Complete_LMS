import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCourseLectureById, getCourseLecture } from "../../Redux/lectureSlice";


function DisplayLectures(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const courseDelails = useLocation().state;
    const { lectures } = useSelector((state) => state?.lecture);
    const { role } = useSelector((state) => state?.auth);

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    async function handleLecutureDelete(courseID, lectureID){
        const data = { courseID, lectureID};
        await dispatch(deleteCourseLectureById(data));
        await dispatch(getCourseLecture(courseDelails?._id));
    };

    useEffect(() => {
        (async () => {
            await dispatch(getCourseLecture(courseDelails?._id));
        })();
    },[]);



    return(
        <Layout>
            <div className="min-h-[92vh] text-white flex flex-col items-center justify-center py-10 mx-[5%]">
                <h1 className="text-2xl text-center font-semibold text-yellow-500">
                   Course Name: {courseDelails?.title}
                </h1>

                <div className="gap-10 w-full flex justify-center">
                    <div className="w-[28rem] p-2 space-y-5 rounded-lg shadow-[0_0_10px_black]">
                        <video src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
                               className="w-full object-fill rounded-tl-lg rounded-tr-lg" 
                               controls
                               muted
                               disablePictureInPicture
                               controlsList="nodownload" ></video>
                        <div>
                            <h1>
                                <span className="text-yellow-500">Title : </span>
                                {lectures && lectures[currentVideoIndex]?.title}
                            </h1>
                            <p>
                                {" "} <span className="text-yellow-500 line-clamp-4">Description : {" "} </span>
                                { lectures && lectures[currentVideoIndex]?.description}
                            </p>
                        </div>
                    </div>

                    <ul className="w-[28rem] p-2 space-y-4 rounded-lg shadow-[0_0_10px_black]">
                        <li className="text-xl text-yellow-500 font-semibold flex items-center justify-center">
                            <h1>Lectures List</h1>
                            { role === "ADMIN" && (
                                <button className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                        onClick={() => navigate("/course/addlecture", {state: {...courseDelails}})}>
                                    Add New Lecture
                                </button>
                            ) }
                        </li>
                        { lectures && lectures.map((element, index) => {
                            return(
                                <li className="space-y-2" key={element._id}>
                                    <h1 className="cursor-pointer"
                                        onClick={() => setCurrentVideoIndex(index)}>
                                        <span className="text-yellow-500">
                                            {" "} Lecture { index + 1} : {" "}
                                        </span>
                                        {element?.title}
                                    </h1>
                                    { role === "ADMIN" && (
                                        <button className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                                onClick={() => handleLecutureDelete(courseDelails?._id, element._id)}>
                                            Delete Lecture
                                        </button>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default DisplayLectures;