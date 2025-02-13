import { useState } from "react";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";


function Contact(){

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    });

    function inputHandler(event){
        const { name, value } = event.target;

        setUserInput({
            ...userInput,
            [name]: value,
        });
    };

    async function handleFormSubmit(event){
        event.preventDefault();

        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("All fileds are required");
            return;
        }

        if(!userInput.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            toast.error("Invalid Email ID");
            return;
        }

        try {
            const res = axiosInstance.post('/contact', {...userInput});
            toast.promise(res, {
                loading: "Wait! Submitting your message...",
                success: "Form submitted successfully.",
                error: "Sorry! Failed to submit the message."
            });

            const response = await res;
            if(response?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                })
            }
        } catch (e) {
            toast.error(e.message || "Operation Failed...")
        }

    }

    return(
        <Layout>
            <div className="flex items-center justify-center h-[92vh]">
                <form className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem] text-white shadow-[0_0_10px_black] rounded-md"
                      onSubmit={handleFormSubmit}  >
                    <h1 className=" text-3xl font-semibold">Contact Form</h1>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="name"
                               className="text-xl font-semibold" >
                            Name
                        </label>
                        <input type="text" name="name" id="name"
                               className="bg-transparent px-2 py-1 rounded-sm border"
                               placeholder="Enter Your Name ..."
                               value={userInput.name}
                               onChange={inputHandler}  />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email"
                               className="text-xl font-semibold" >
                            Email
                        </label>
                        <input type="email" name="email" id="email"
                               className="bg-transparent px-2 py-1 rounded-sm border"
                               placeholder="Enter Your Email ..."
                               value={userInput.email}
                               onChange={inputHandler}  />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="message"
                               className="text-xl font-semibold" >
                            Message
                        </label>
                        <textarea name="message" id="message"
                                  className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                                  placeholder="Enter Your Message ..."
                                  value={userInput.message}
                                  onChange={inputHandler}  >
                        </textarea>
                    </div>
                </form>
            </div>
        </Layout>
    );
};


export default Contact;