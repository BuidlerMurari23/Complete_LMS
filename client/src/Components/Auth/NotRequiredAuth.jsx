import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function NotRequiredAuth(){
    const { isLoggedIn } = useSelector((state) => state?.auth);
    return (isLoggedIn) ? <Navigate to={"/"} replace /> : <Outlet />
};

export default NotRequiredAuth;