import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'

function Footer(){

    const newDate = new Date();
    const year = newDate.getFullYear();

    return(
        <>
        <footer className="relative left-0 bottom-0 h-[8vh] py-5 sm:px-20 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800">
            <section className="text-lg">
                Copyright {year} | All Rights are Reserved
            </section>

            <section className="text-2xl text-white flex items-center justify-center gap-5">
                <a href="#" className="hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <BsFacebook />
                </a>
                <a href="#" className="hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <BsInstagram />
                </a>
                <a href="#" className="hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <BsLinkedin />
                </a>
                <a href="#" className="hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <BsTwitter />
                </a>
            </section>
        </footer>
        </>
    )
}

export default Footer;