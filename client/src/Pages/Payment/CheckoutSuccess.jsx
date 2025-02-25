import { AiFillCheckCircle } from "react-icons/ai";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";


function CheckoutSuccess(){
    return(
        <Layout>
            <div className="min-h-[92vh] text-white flex items-center justify-center">
                <div className="relative w-1/3 h-[26rem] flex flex-col justify-center items-center rounded-lg shadow-[0_0_10px_black]">
                    <h1 className="absolute top-0 w-full bg-green-500 text-2xl text-center font-bold py-4 rounded-tl-lg rounded-tr-lg">
                        Payment Successfull
                    </h1>

                    <div className="flex flex-col items-center justify-center px-4 space-y-2">
                        <div className="text-center space-y-2">
                            <h2 className="text-lg font-semibold">
                                Welcome to web2schools.com
                            </h2>
                            <p className="text-left">
                                Now you can explore and enjoy the taste of learning from out vast library 
                                of courses from the top subject matter experts of the industry.
                            </p>
                        </div>

                        <AiFillCheckCircle className="text-5xl text-green-500" />

                        <button className="bg-green-600 hover:bg-green-500 absolute bottom-0 w-full text-xl text-center font-bold py-2 rounded-bl-lg rounded-br-lg transition-all ease-in-out duration-300">
                            <Link to={'/'}>
                                Go To Dashboard
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CheckoutSuccess;