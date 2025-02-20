import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function CourseDescription(){
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {role, data} = useSelector((state) => state?.auth);

    useEffect(() => {
        window.scrollTo(0,0)
    },[]);



    return(
        <Layout>
            <div className="min-h-[92vh] pt-12 px-20 flex flex-col justify-center items-center text-white">
                <div className="relative grid grid-cols-2 gap-10 py-10">
                    <div className="space-y-5">
                        <img src={state?.thumbnail?.secure_url} alt="thumbnail"
                             className="w-full h-64" />
                        
                        <div className="space-x-4">
                            <div className="flex items-center justify-center text-xl">
                                <p className="font-semibold">
                                    <span className="font-bold text-yellow-500">Insturctor : {" "}</span> {state?.createdBy}
                                </p>
                            </div>

                            {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <button onClick={() => navigate("/course/displaylectures", {state: {...state}})}
                                        className="text-xl font-semibold px-5 py-3 w-full rounded-xl bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer">
                                    Watch Lectures
                                </button>
                            ) : (
                                <button onClick={() => navigate("/checkout")}
                                        className="text-xl font-semibold px-5 py-3 w-full rounded-xl bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer">
                                        Subscribe to Course
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="text-2xl space-y-2">
                        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-4">{state?.title}</h1>
                        <p><span className="text-yellow-500 font-bold">Course Description : </span> {state?.description}</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CourseDescription;