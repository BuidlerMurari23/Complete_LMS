import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { logout } from "../Redux/authSlice";

function Layout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.data?.role);


    function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 0;
    };

    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
    };

    async function handleLogout(event){
        event.preventDefault();
        const res = await dispatch(logout());
        if(res?.payload?.success) navigate("/");
    }

    return (
        <div className="min-h-[90vh] bg-[rgb(1,12,36)]">
            <div className="drawer absolute z-50 left-0 w-full">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu size={"32px"}
                                className="text-white font-bold m-4"
                                onClick={changeWidth}/>
                    </label>
                </div>

                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu min-h-full w-48 sm:w-80 p-4 relative text-white bg-[rgb(23,21,49)]">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={"24px"} />
                            </button>
                        </li>
                        <li className="hover:bg-[rgb(8,7,16)] hover:rounded-xl">
                            <Link to={"/"}>Home</Link>
                        </li>

                        {isLoggedIn && role === "ADMIN" && (
                                <ul>
                                    <li className="hover:bg-[rgb(8,7,16)] hover:rounded-xl">
                                    <Link to={'/admin/dashboard'}>Dashboard</Link>
                                    </li>
                                    <li className="hover:bg-[rgb(8,7,16)] hover:rounded-xl">
                                    <Link to={'/course/create'}>Create Course</Link>
                                    </li>
                                    <li className="hover:bg-[rgb(8,7,16)] hover:rounded-xl">
                                    <Link to={'/course/addlecture'}>Add Lectures</Link>
                                    </li>
                                </ul>
                            )}
                                

                        

                        <li className="hover:bg-[rgb(8,7,16)] hover:rounded-xl">
                            <Link to={"/course"}>Courses</Link>
                        </li>
                        <li className="hover:bg-[rgb(8,7,16)] hover:rounded-xl">
                            <Link to={"/contact"}>Contact Us</Link>
                        </li>
                        <li className="hover:bg-[rgb(8,7,16)] hover:rounded-xl">
                            <Link to={"/about"}>About Us</Link>
                        </li>

                        {
                            !isLoggedIn && (
                                <li className="absolute bottom-4 w-[90%]">
                                    <div className="w-full flex items-center justify-center gap-5">
                                        <button className="btn-primary px-4 py-1 font-semibold w-full rounded-md bg-purple-600 hover:bg-purple-500 transition-all ease-in-out duration-300">
                                            <Link to={"/login"}>Login</Link>
                                        </button>
                                        <button className="btn-secondary px-4 py-1 font-semibold w-full rounded-md bg-pink-500 hover:bg-pink-400 transition-all ease-in-out duration-300">
                                            <Link to={"/signup"}>Signup</Link>
                                        </button>
                                        
                                    </div>
                                </li>
                            )
                        }

                        {
                            isLoggedIn && (
                                <li className="absolute bottom-4 w-[90%]">
                                    <div className="w-full flex items-center justify-center">
                                        <button className="btn-primary px-4 py-1 font-semibold w-full rounded-md bg-purple-600 hover:bg-purple-500 transition-all ease-in-out duration-300">
                                            <Link to={"/user/profile"}>Profile</Link>
                                        </button>
                                        <button className="btn-secondary px-4 py-1 font-semibold w-full rounded-md bg-pink-500 hover:bg-pink-400 transition-all ease-in-out duration-300">
                                            <Link onClick={handleLogout}>Logout</Link>
                                        </button>
                                        
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
                {children}
                <Footer />
        </div>
    );
};

export default Layout;