import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { createAccout } from "../Redux/authSlice";



function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(event){
        const { name, value } = event.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    };

    function getImage(event){
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function (){
                setPreviewImage(this.result);
            })
        }
    };

    async function createNewAccount(event){
            event.preventDefault();

            if(!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar){
                toast.error("Please fill all the fields.");
                return;
            }

            if(signupData.fullName.length < 3){
                toast.error("Name should be of atleast 3 Characters.");
                return;
            }

            if (!signupData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                toast.error("Invalid email id");
                return;
            }
          
              
            if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
                toast.error("Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol");
                return;
            }

            const formData = new FormData();
            formData.append("fullName", signupData.fullName);
            formData.append("email", signupData.email);
            formData.append("password", signupData.password);
            formData.append("avatar", signupData.avatar);

            const response = await dispatch(createAccout(formData));

            if(response?.payload?.success) navigate("/login");

            setSignupData({
                fullName: "",
                email: "",
                password: "",
                avatar: "",
            });
            
            setPreviewImage("");
        };




    return(
        <Layout>
            <div className="flex items-center justify-center h-[92vh]">
                <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
                      onSubmit={createNewAccount} noValidate  >
                    <h1 className="font-bold text-center text-2xl">
                        Registration Page
                    </h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        { (previewImage) ? (
                            <img src={previewImage} alt="previewImage" 
                                 className="w-24 h-24 rounded-full m-auto" />
                        ) : (
                              <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                            )}
                    </label>
                    <input type="file" className="hidden" 
                           id="image_uploads" name="image_uploads"
                           accept=".jpg, .jpeg, .png, .webp, .mp4"
                           onChange={getImage} />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-bold">
                            Name
                        </label>
                        <input type="text" required
                               id="fullName" name="fullName"
                               placeholder="Enter your name ..."
                               className="bg-transparent px-2 py-1 border"
                               value={signupData.fullName}
                               onChange={handleUserInput}   />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-bold">
                            Email
                        </label>
                        <input type="email" required
                               id="email" name="email"
                               placeholder="Enter your email ..."
                               className="bg-transparent px-2 py-1 border"
                               value={signupData.email}
                               onChange={handleUserInput}   />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-bold">
                            Password
                        </label>
                        <input type="password" required
                               id="password" name="password"
                               placeholder="Enter your password ..."
                               className="bg-transparent px-2 py-1 border"
                               value={signupData.password}
                               onChange={handleUserInput}   />
                    </div>

                    <button className="w-full text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all ease-in-out duration-300 py-2 cursor-pointer"
                            type="submit">
                        Create Account
                    </button>

                    <p className="text-center">
                        Already have an account?{' '}
                        <Link to={"/login"} className="link text-accent cursor-pointer">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    )
}

export default Signup;