import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { useEffect } from "react";
import { getAllCourses } from "../../Redux/courseSlice";
import CourseCard from "../../Components/CourseCard";



function CourseList(){

    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state?.course);
    

    async function loadCousers() {
        await dispatch(getAllCourses());
    }
    useEffect(() => {
        loadCousers();
    },[])
    return(
        <Layout>
            <div className="min-h-[92vh] text-white gap-10 m-10 pt-12 flex flex-col">
                <h1 className="text-center text-3xl font-semibold">
                    Explore the course created by {" "}
                    <span className="font-bold text-yellow-500">Industry Experts</span>
                </h1>
                
                <div className="mb-10 flex flex-wrap gap-14 justify-center items-center">
                    { courseData?.map((element) => {
                        
                        return <CourseCard key={element._id} data={element} />
                    })}
                </div>
            </div>
        </Layout>
    );
};


export default CourseList;