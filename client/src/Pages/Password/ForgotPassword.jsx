import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";
import { forgotPassword } from "../../Redux/authSlice";


function ForgotPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    async function handleFormSubmit(event){
        event.preventDefault();

        if(!email){
            toast.error("Please enter your Registered Email ID ...");
            return;
        }

        if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            toast.error("Please! Enter Valid Email ID..");
            return;
          }

        const response = await dispatch(forgotPassword(email));

        setEmail("")
    }
    

    return (
        <Layout>
            <div className="flex items-center justify-center h-[92vh]">
                <form  onSubmit={handleFormSubmit}
                       className="flex flex-col justify-center p-4 gap-6 text-white rounded-lg shadow-[0_0_10px_black] w-80 h-[26rem]" >
                    <h1 className="text-center font-bold text-2xl">Forgot Password !</h1>
                    <p>
                        Enter your Registered Email ID. We will sent you the verification link on
                        your Registered Email ID to from which you can reset your password.
                    </p>

                    <div className="flex flex-col gap-3">
                        <input type="email" name="email" id="email"
                            required
                            className="bg-transparent px-2 py-1 border"
                            placeholder="Enter your Registered Email ID ..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <button className="text-lg font-semibold bg-yellow-600 hover:bg-yellow-500 w-full py-2 rounded-lg transition-all ease-in-out duration-300 cursor-pointer"
                        type="submit" >
                        Get Verification Link
                    </button>

                    <p className="text-center">
                        Already have an account ?{" "}
                        <Link to={"/login"} className="link text-accent cursor-pointer">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </Layout>
    )

}

export default ForgotPassword;