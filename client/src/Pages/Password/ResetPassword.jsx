import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";
import { resetPassword } from "../../Redux/authSlice";


function ResetPassword(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        password: "",
        cfnPassword: "",
        resetToken: useParams().resetToken,
    });

    function handleUserInput(event){
        const { name, value } = event.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    };

    async function handleFormSubmit(event){
        event.preventDefault();

        if(!userInput.password || !userInput.cfnPassword || !userInput.resetToken){
            toast.error("ALl fields are mandatory ...");
            return;
        }

        if(!userInput.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)){
            toast.error("Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol");
            return;
        }

        if(userInput.password !== userInput.cfnPassword){
            toast.error("Both Password should be same ...");
            return;
        }

        const response = await dispatch(resetPassword(userInput));

        if(response?.payload?.success) navigate('/login');
    };

    return(
        <Layout>
            <div className="flex items-center justify-center h-[92vh]">
                <form onSubmit={handleFormSubmit}
                      className="flex flex-col justify-center text-white gap-6 p-4 rounded-lg w-80 h-[26rem] shadow-[0_0_10px_black]"  >
                    <h1 className="text-center text-3xl fond-bold">
                        Reset Password
                    </h1>

                    <div className="flex flex-col gap1">
                        <label htmlFor="password"
                               className="font-bold text-lg" >
                            New Password
                        </label>
                        <input type="password"
                               id="password"
                               name="password"
                               className="bg-transparent border px-2 py-1"
                               placeholder="Enter your new password ..."
                               value={userInput.password}
                               onChange={handleUserInput}  />
                    </div>

                    <div className="flex flex-col gap1">
                        <label htmlFor="cfnPassword"
                               className="font-bold text-lg" >
                            Confirm Password
                        </label>
                        <input type="password"
                               id="cfnPassword"
                               name="cfnPassword"
                               className="bg-transparent border px-2 py-1"
                               placeholder="Confirm your new password ..."
                               value={userInput.cfnPassword}
                               onChange={handleUserInput}  />
                    </div>

                    <button className="w-full text-lg bg-yellow-600 hover:bg-yellow-500 rounded-lg py-2 transition-all ease-in-out duration-300 cursor-pointer"
                            type="submit" >
                        Reset Password
                    </button>
                </form>
            </div>
        </Layout>
    )

}

export default ResetPassword;