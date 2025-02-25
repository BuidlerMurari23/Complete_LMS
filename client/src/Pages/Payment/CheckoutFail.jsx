import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { RxCrossCircled } from 'react-icons/rx';


function CheckoutFail(){
    return(
        <Layout>
            <div className="min-h-[92vh] text-white flex items-center justify-center">
                <div className="relative w-1/3 h-[26rem] flex flex-col items-center justify-center rounded-lg shadow-[0_0_10px_black]">
                    <h1 className="absolute bg-red-500 top-0 w-full text-2xl text-center font-bold py-4 rounded-tl-lg rounded-tr-lg">
                        Payment Failed
                    </h1>

                    <div className="flex flex-col items-center justify-center px-4 space-y-2">
                        <p className="text-center">
                            <h2 className="text-lg font-semibold">
                                OOPS! Your Payment Failed...
                            </h2>
                            Please Try it Again. It might be a temporary issue.
                        </p>
                        <RxCrossCircled className="text-5xl text-red-500" />
                        <p>Failed</p>
                    </div>

                    <button className="absolute bottom-0 w-full text-2xl text-center font-bold py-2 bg-red-600 hover:bg-red-500 rounded-bl-lg rounded-br-lg transition-all ease-in-out duration-300">
                        <Link to={"/checkout"}>Revisti Payment</Link>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default CheckoutFail;