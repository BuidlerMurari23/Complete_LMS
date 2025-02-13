import { useNavigate } from "react-router-dom";


function NotFound() {

    const navigate = useNavigate();

    return (
        <main className="h-screen w-full flex flex-col items-center justify-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>
            <div className="absolute bg-black text-white px- rounded text-sm rotate-12">
                Page Not Found !!!
            </div>
            <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />

                    <span onClick={() => navigate(-1)}
                          className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        Go Back
                    </span>
                </a>
            </button>
        </main>
    );
};



export default NotFound;