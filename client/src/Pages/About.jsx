import Layout from "../Layout/Layout";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import { celebrities } from "../Constants/Celebrities";
import CarouselSlide from "../Components/CarouselSlide";


function About(){
    
    return(
        <Layout>
            <div className="pl-20 h-[92vh] pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10 max-h-[40%] ">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl font-semibold text-yellow-500">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the affordable and quality education to the
                            world. We are providing the platform for the aspiring teachers and
                            students to share their creativity, skills and knowledge to each
                            other to empower and contribute in the growth and wellness of the
                            mankind.
                        </p>
                    </section>

                    <div className="w-1/2">
                         <img src={aboutMainImage} alt="aboutMainImage"
                              className="drop-shadow-2xl"
                              id="test1"
                              style={{filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))",}} />
                    </div>
                </div>
                <div className="carousel m-auto w-1/2 my-10">
                    {
                        celebrities && celebrities.map((celebrity) => (
                            <CarouselSlide 
                              {...celebrity}
                              key={celebrity.slideNumber}
                              totalSlides={celebrities.length} />
                        ) )
                    }

                </div>
            </div>
        </Layout>
    );
};


export default About;