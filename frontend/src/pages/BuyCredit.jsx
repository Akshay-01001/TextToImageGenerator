import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    console.log("into the init pay");
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        try {
          const {data} = await axios.post(backendUrl + '/api/user/verifypayment',res,{
            headers:{
              token
            }
          })

          if(data.success){
            loadCreditsData();
            navigate('/')
            toast.success("Credits Added")
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    };
    const rzp = new window.Razorpay(options)
    rzp.open()
  };

  const paymentRazorpay = async (planId) => {
    {console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)}
    try {
      if (!user) {
        setShowLogin(true);
      }
      console.log(user);
      console.log(planId);
      console.log(token);
      

      const { data } = await axios.post(
        backendUrl + "/api/user/payment",
        { planId },
        {
          headers: {
            token,
          },
        }
      );
      

      if (data.success) {
        initPay(data.order);
      }else{
        console.log(data);
        
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-[80vh] text-center py-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plnans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        CHoose The Plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12
           px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} alt="" width={40} />
            <p className="mt-3 font-semibold mb-1">{item.id}</p>
            <p className="text-sm">{item.id}</p>
            <p className="mt-6 ">
              <span className="text-3xl font-medium">RS. {item.price} </span>/{" "}
              {item.credits} credits
            </p>
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
