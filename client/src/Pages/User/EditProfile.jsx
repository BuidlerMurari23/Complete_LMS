import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../Redux/authSlice";



function EditProfile(){

    const dispatch = useDispatch();

    const [previewImage, setPreviewImage] = useState("");
    const [userData, setUserData] = useState({
        fullName: "",
        avatar: undefined,
        userID: useSelector((state) => state?.auth?.data?._id),
    });


    function getImage(event){
        event.preventDefault();
        
        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            setUserData({
                ...userData,
                avatar: uploadedImage,
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function (){
                setPreviewImage(this.result);
            })
        }
    };

    function setName(event){
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        })
    };

    async function handleFormSubmit(event) {
        event.preventDefault();

        if(!userData.fullName || !userData.avatar){
            toast.error("All fields are mandatory ...");
            return;
        }

        if(userData.fullName.length < 3){
            toast.error("Name should have atleast of 3 Characters.");
            return;
        }

        const formData = new FormData();

        formData.append("fullName", userData.fullName);
        formData.append("avatar", userData.avatar);

        const newUserData = [userData.userID, formData];
        console.log("newUserData:", newUserData)

        await dispatch(updateProfile(newUserData));

        await dispatch(getUserData());
        
    }

    return(
        <Layout>
            <div className="flex items-center justify-center h-[92vh]">
                <form className="flex flex-col justify-center text-white rounded-md gap-5 p-4 w-80 h-[26rem] shadow-[0_0_10px_black]"
                      onSubmit={handleFormSubmit}  >
                    <h1 className="text-3xl text-center font-bold">Edit Profile Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {
                            previewImage ? (
                                <img src={previewImage} alt="previewImage"
                                     className="w-28 h-28 rounded-full m-auto" />
                            ) : (
                                <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
                            )
                        }
                    </label>
                    <input type="file" id="image_uploads" name="image_uploads"
                           className="hidden"
                           accept=".png, .jpg, .jpeg, .webp, .mp4"
                           onChange={getImage}  />

                    <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                    <input type="text" name="fullName" id="fullName" required
                           className="bg-transparent border px-2 py-1"
                           placeholder="Enter your full name ..."
                           value={userData.fullName}
                           onChange={setName}  />

                    <p className="link text-accent text-center flex justify-center w-full gap-3 cursor-pointer">
                        <Link to={'/user/profile'}>
                        <AiOutlineArrowLeft /> Back to Profile
                        </Link>
                    </p>

                    <button className="w-full text-lg text-center font-semibold rounded-lg py-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer"
                            type="submit">
                        Update Profile
                    </button>
                </form>
            </div>
        </Layout>
    )

};

export default EditProfile;
