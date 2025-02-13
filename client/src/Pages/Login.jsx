import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";
import { login } from "../Redux/authSlice";



function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
        
        

    function handleUserInput(event){
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };


    async function handleLogin(event){
            event.preventDefault();

            if( !loginData.email || !loginData.password ){
                toast.error("Please fill all the fields.");
                return;
            }

            const response = await dispatch(login(loginData));

            if(response?.payload?.success) navigate("/");

            setLoginData({
                email: "",
                password: "",
            });
        };
                
        return(
            <Layout>
                <div className="flex items-center justify-center h-[92vh]">
                    <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
                          onSubmit={handleLogin} noValidate  >
                        <h1 className="font-bold text-center text-2xl">
                            Login Page
                        </h1>
    
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-bold">
                                Email
                            </label>
                            <input type="email" required
                                   id="email" name="email"
                                   placeholder="Enter your email ..."
                                   className="bg-transparent px-2 py-1 border"
                                   value={loginData.email}
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
                                   value={loginData.password}
                                   onChange={handleUserInput}   />
                        </div>

                        {/* Guest Account access is to be made */}
    
                        <button className="w-full text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all ease-in-out duration-300 py-2 cursor-pointer"
                                type="submit">
                            Login
                        </button>
    
                        <p className="text-center">
                            <Link to={"/forgotPassword"} className="link text-accent cursor-pointer">
                                Forgot Password
                            </Link>
                        </p>
                            
    
                        <p className="text-center">
                            Don't have an account?{"  "}
                            <Link to={"/signup"} className="link text-accent cursor-pointer">
                                Create Account
                            </Link>
                        </p>
                    </form>
                </div>
            </Layout>
        )
    }
    
    export default Login;
                
            
            



