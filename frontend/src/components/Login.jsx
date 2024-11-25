import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("login");
  const { setShowLogin, backendUrl ,setToken,setUser} = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state == "login") {
        {console.log(backendUrl);
        }
        const {data} = await axios.post(backendUrl + '/api/user/login/', {
          email,
          password,
        });

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + "/api/user/register/", {
          name,
          email,
          password,
        });

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        action=""
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back ! Please Login to continue</p>

        {state !== "login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="" width={30} />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" width={20} />
          <input
            type="email"
            placeholder="Email"
            required
            className="outline-none text-sm"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" width={20} />
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgrt Password ?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "login" ? "Login" : "Create account"}
        </button>
        {state === "login" ? (
          <p className="mt-5 text-center">
            Don't have an account ?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("signup")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account ?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("login")}
            >
              Login
            </span>
          </p>
        )}
        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            setShowLogin(false);
          }}
        />
      </form>
    </div>
  );
};

export default Login;
