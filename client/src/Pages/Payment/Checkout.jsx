import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from "../../Layout/Layout";
import { BiRupee } from "react-icons/bi";
import toast from 'react-hot-toast';
import { getRazorpayId, purchaseCourseBundle, verifySubscription } from '../../Redux/razorpaySlice';
import { useEffect } from 'react';


function Checkout(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const userData = useSelector((state) => state?.auth?.data);
    const { isPaymentVarified } = useSelector((state) => state?.razorpay);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    };

    async function handleSubscription(event){
        event.preventDefault();

        if(!razorpayKey || !subscription_id) return;

        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "web2schools pvt ltd.",
            description: "Monthly Subscription",
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;

                toast.success("Payment Successfull...");

                const res = await dispatch(verifySubscription(paymentDetails));

                !isPaymentVarified ? navigate("/checkout/success") : navigate("/checkout/fail");
            },
            prefill: {
                name: userData.fullName,
                email: userData.email,
            },
            theme: {
                color: "#F37254",
            },
        };
          const paymentObject = new window.Razorpay(options);
          paymentObject.opne();
    }

    useEffect(() => {
        (async () => {
            await dispatch(getRazorpayId());
            await dispatch(purchaseCourseBundle());
        })();
    },[])

    return(
        <Layout>
                <form className='min-h-[92vh] flex items-center justify-center text-white'
                      >
                    <div className='w-1/3 h-[26rem] flex flex-col justify-center relative rounded-lg shadow-[0_0_10px_black]'>
                        <h1 className='absolute text-2xl text-center bg-yellow-500 font-bold py-4 top-0 w-full rounded-tl-lg rounded-tr-lg'>
                            Subscription Bundle
                        </h1>
                        <div className='px-4 space-y-5 text-center'>
                            <p className='text-[17px]'>
                                This purchase will allow you to access all the available courses of our platform for {" "}
                                <span className='text-yellow-500 font-bold'>1 Year Duration</span>
                                . <br />
                                All the existing and new lunched courses will be available to you in this subscription bundle.
                            </p>
                            <p className='text-2xl text-yellow-500 font-bold flex items-center justify-center gap-1'>
                                <BiRupee /> <span >499/-</span>{"  "} Only.
                            </p>
                            <div className='text-gray-200'>
                                <p>100% Refund at Cancelation</p>
                                <p>* Terms & Conditions Applied.</p>
                            </div>
                        </div>
                        <button className='absolute bottom-0 w-full bg-yellow-600 hover:bg-yellow-500 text-xl text-center font-bold py-2 rounded-bl-lg rounded-br-lg transition-all ease-in-out duration-300'
                                type='submit'>
                            Buy Now
                        </button>
                    </div>
                </form>
        </Layout>
    )
};


export default Checkout;