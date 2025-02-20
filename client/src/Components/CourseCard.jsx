import { useNavigate } from "react-router-dom";


function CourseCard({ data }){

    const navigate = useNavigate();

    return(
        <div className="text-white bg-zinc-700 w-[22rem] h-[430px] group overflow-hidden rounded-lg shadow-lg cursor-pointer"
             onClick={() => navigate('/course/description', {state: {...data}})}>

            <div className="overflow-hidden">
                <img src={data?.thumbnail?.secure_url} alt="Course Thumbnail"
                     className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-[1.2] transition-all ease-in-out duration-300" />
            </div>

            <div className="text-white p-3 space-y-1">
                {/* line clap-2 is remaining */}
                <h2 className="text-xl text-yellow-500 font-bold line-clamp-2">{data?.title}</h2> 
                {/* class line-clamp 2 is missing */}
                <p className="line-clamp-2">{data?.description}</p>
                <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">Catagory : </span>{data?.category}</p> 
                <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">Total Lectures : </span>{data?.numberOfLectures}</p> 
                <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">Created By : </span>{data?.createdBy}</p> 
            </div>
        </div>
    );
};
                

export default CourseCard;


