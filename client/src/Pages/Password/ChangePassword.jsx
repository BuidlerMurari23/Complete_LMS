import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import { changePassword } from "../../Redux/authSlice";



function ChangePassword(){

    const dispatch = useDispatch();

    const [userPassword, setUserPassword] = useState({
       oldPassword: "",
       newPassword: "", 
    });

    function handlePasswordChange(event){
        const { name, value } = event.target;
        setUserPassword({
            ...userPassword,
            [name]: value
        });
    };

    async function handleFormSubmit(event){
        event.preventDefault();

        if(!userPassword.oldPassword || !userPassword.newPassword){
            toast.error("All fields are mandatory ...");
            return;
        }

        if(!userPassword.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
            toast.error("Minimum password length should be 6 with Uppercase, Lowercase, Number and Symbol");
            return;
        }

        const response = dispatch(changePassword(userPassword));

        setUserPassword({
            oldPassword: "",
            newPassword: ""
        });
    };


    return(
        <Layout>
            <div className="flex items-center justify-center h-[92vh]">
                <form className="flex flex-col justify-center gap-6 p-4 text-white rounded-lg w-80 h-[26rem] shadow-[0_0_10px_black]"
                      onSubmit={handleFormSubmit}  >
                    <h1 className="text-3xl font-bold text-center">Change Password</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="oldPassword"
                               className="font-semibold text-lg" >
                            Old Password
                        </label>
                        <input type="password" name="oldPassword" id="oldPassword"
                               className="bg-transparent border py-1 px-2"
                               placeholder="Enter your old password ..."
                               value={userPassword.oldPassword}
                               onChange={handlePasswordChange}  />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword"
                               className="font-semibold text-lg" >
                            New Password
                        </label>
                        <input type="password" name="newPassword" id="newPassword"
                               className="bg-transparent border py-1 px-2"
                               placeholder="Enter your new password ..."
                               value={userPassword.newPassword}
                               onChange={handlePasswordChange}  />
                    </div>

                    <p className="link text-accent w-full flex items-center justify-center cursor-pointer gap-2">
                        <Link to={'/user/profile'}>
                            <AiOutlineArrowLeft /> Back to Profile
                        </Link>
                    </p>

                    <button className="w-full text-2xl font-semibold bg-yellow-600 hover:bg-yellow-500 rounded-lg py-2 transition-all ease-in-out duration-300 cursor-pointer"
                            type="submit">
                        Change Password
                    </button>

                </form>
            </div>
        </Layout>
    );
};

export default ChangePassword;
