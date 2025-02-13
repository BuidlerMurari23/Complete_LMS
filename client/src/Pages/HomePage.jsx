import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";

function HomePage(){
    return(
        <Layout>
            <div className="pt-10 mx-20 gap-10 text-white flex items-center justify-center h-[92vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold">
                        Find our best {' '} <span className="font-bold text-yellow-500">Online Couses</span>
                    </h1>
                    <p className="text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and
                        qualified faculities at a very affordable cost.
                    </p>
                    <div className="space-x-6 mt-10">
                        <Link to={"/courses"}>
                        <button className="px-5 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-md text-lg cursor-pointer transition-all ease-in-out duration-300">
                            Explore Courses
                        </button>
                        </Link>
                        <Link to={"/contact"}>
                        <button className="px-5 py-3 border border-yellow-500 hover:border-yellow-600 rounded-md text-lg cursor-pointer transition-all ease-in-out duration-300">
                            Contact Us
                        </button>
                        </Link>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <img src={homePageMainImage} alt="homePageMainImage" />
                </div>

            </div>
        </Layout>
    )
}

export default HomePage;