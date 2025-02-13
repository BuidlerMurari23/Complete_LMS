

function CarouselSlide({image, title, description, slideNumber, totalSlides}){
    return(
        <div id={`slide${slideNumber}`} className="carousel-item w-full relative mt-20" >
            <div className="flex flex-col items-center justify-center px-[15%] gap-4">
                <img src={image} alt={title}
                     className="w-32 rounded-full border-2 border-gray-400"    />
                <p className="text-xl text-gray-200">{description} </p>
                <h3 className="text-2xl font-semibold">{title} </h3>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${((slideNumber == 1) ? totalSlides : (slideNumber - 1))}`} className="btn btn-circle">❮</a>
                <a href={`#slide${(slideNumber % totalSlides) + 1}`} className="btn btn-circle">❯</a>
            </div>

        </div>
    )
}


export default CarouselSlide;