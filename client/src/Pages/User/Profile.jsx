import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/authSlice";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";


function Profile(){

    const dispatch = useDispatch();

    const userData = useSelector((state) => state?.auth?.data);

    useEffect(() => {
        dispatch(getUserData());
    },[]);

    return(
        <Layout>
            <div className="flex items-center justify-center h-[92vh]">
                <div className="text-white p-4 gap-4 my-10 w-80 flex flex-col rounded-lg shadow-[0_0_10px_black]">
                    <img src={userData?.avatar?.secure_url} alt="User Profile Image"
                         className="w-40 rounded-full border border-black m-auto" />
                    
                    <h3 className="text-xl text-center font-semibold capitalize">{userData?.fullName}</h3>

                    <div className="grid grid-cols-2">
                        <p>Email:</p>
                        <p>{userData.email}</p>
                        <p>Role:</p>
                        <p>{userData.role}</p>
                        <p>Subscription:</p>
                        <p>
                            {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <Link to={'/changePassword'}>
                            <button className=" px-2 py-1  text-lg text-center font-semibold bg-yellow-600 hover:bg-yellow-500 rounded-lg cursor-pointer transition-all ease-in-out duration-300">
                                Change Password
                            </button>
                        </Link>
                        <Link to={'/user/editprofile'}>
                            <button className=" px-2 py-1  text-lg text-center font-semibold border border-yellow-600 hover:border-yellow-500 rounded-lg cursor-pointer transition-all ease-in-out duration-300">
                                Edit Profile
                            </button>
                        </Link>
                    </div>

                    {/* cancle subscription is still to be done ... */}
                </div>
            </div>
        </Layout>
    )

};

export default Profile;