import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Wrapper } from "../shared/Wrapper";
import { Link, Navigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { apiClient } from "../utils/apiWrapper";
import { InfinitySpin } from "react-loader-spinner";
import { ButtonLoader } from "../shared/buttonLoader/ButtonLoader";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

  const Login = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoading] = useState(false);
  const [guestUser, setGuestUser] = useState(false);
  const [showGuestAddress, setGuestAddress] = useState(false);
  const navigate = useNavigate();
  const { currencyTitle, totalAmount } = location.state || {};

  const [getData, setData] = useState([]);

  const handlePayments = async (data) => {


    const datas = {
      "amount": data.amount,
      // "currency": data.currency.toUpperCase(),
      "currency": "USD",
      "description": data.address,
      "customer_name": data.name,
      "customer_email": data.email
    };


    try {
      setLoading(true);
      const response = await apiClient.post(`/create-payment`, datas);
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }


  const schema = yup
    .object({
      number: yup.number().positive().integer().required(),
      email: yup.string().required(),

    })
    .required();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem('guestUser', JSON.stringify(data));
    setGuestAddress(true);
    reset();
    reset2();

  }

  //for guest user address

  const schemaForAddress = yup
    .object({
      name: yup.string().required(),
      country: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      address: yup.string().required(),
    })
    .required();


  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: error2 },
    reset: reset2,
  } = useForm({
    resolver: yupResolver(schemaForAddress),
  });

  const onSubmit2 = async (data) => {

    const guestInfo = JSON.parse(localStorage.getItem('guestUser')) || {}; // Ensure it doesn't throw an error if no guestUser exists
    await Object.assign(guestInfo, { amount: totalAmount, currency: currencyTitle });
    await Object.assign(guestInfo, data);


    handlePayments(guestInfo);
    // Correctly store the object in localStorage
    localStorage.setItem("guestUser", JSON.stringify(guestInfo));

  }


  const validateForm = () => {
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    setError(""); // Clear any existing errors
    return true;
  };




  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) return; // Validate form before submitting
    try {
      setLoading(true);
      const response = await axios.post(
        "https://testhssite.com/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("userProfile", JSON.stringify(response.data.user));
      navigate("/home");
      setLoading(false);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getData.status == "success" && getData.redirect_url) {
      window.location.href = getData.redirect_url;
    }
  }, [getData]);

  return (
    <React.Fragment>



      <Wrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-12 items-center mb-20">

          <div className="col-span-1"></div>
          <div className="col-span-4 mt-16 ">
            <form
              className="bg-[#E2E8F04D] border-[#E2E8F0] rounded-[10px] mt-5 border px-6 py-10 max-w-[550px]"
              onSubmit={handleFormSubmit}
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl text-[#030303] font-semibold">
                  Returning Customers
                </h3>
                <p className="text-[#000000] text-sm">
                  Sign in for faster checkout.
                </p>
              </div>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("Email")
                  ? "border-red-500"
                  : "border-[#66666666]"
                  } rounded-[4px]`}
              />
              {error.includes("Email") && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("Password")
                    ? "border-red-500"
                    : "border-[#66666666]"
                    } rounded-[4px] pr-12`}
                />
                <span
                  className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoMdEye size="24px" />
                  ) : (
                    <IoMdEyeOff size="24px" />
                  )}
                </span>
              </div>
              {error.includes("Password") && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              {error.includes("Login") && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <p
                onClick={() => navigate("/forgot-password")}
                className="text-[#64748B] cursor-pointer text-sm my-5 font-semibold"
              >
                Forgot Password?
              </p>
              <button
                type="submit"
                className="block w-full bg-primary text-white px-3 py-4 font-semibold text-base rounded-[4px] "
                disabled={loader}
                style={{ opacity: `${loader ? "0.5" : ""}` }}
              >
                {loader ? (
                  <span className="flex items-center justify-center">
                    <ButtonLoader />
                  </span>
                ) : (
                  <span>Login</span>
                )}
              </button>

              <span className="relative block text-center text-[22px] text-black my-7 after:absolute after:left-0 after:w-[40%] after:h-[1px] after:bg-[#E2E8F0] after:top-1/2 after:translate-y-[-50%] before:absolute before:right-0 before:w-[40%] before:h-[1px] before:bg-[#E2E8F0] before:top-1/2 before:translate-y-[-50%]">
                Or
              </span>

              <button className="border rounded-[4px] bg-[#FFFFFF66] border-[#03030399] font-semibold text-sm w-full py-3 px-3 flex items-center justify-center">
                <img
                  src={process.env.PUBLIC_URL + "/icons/apple.png"}
                  className="mr-2"
                  alt=""
                />
                Sign In with Apple
              </button>
              <button className="border rounded-[4px] bg-[#FFFFFF66] border-[#03030399] font-semibold text-sm w-full py-3 px-3 flex items-center justify-center mt-5">
                <img
                  src={process.env.PUBLIC_URL + "/icons/google.png"}
                  className="mr-2"
                  alt=""
                />
                Sign In with Outlook
              </button>
              <p className="mt-4 text-[#212121] text-sm">
                By registering you agree to the user{" "}
                <span className="font-semibold">Terms & Condition</span> and{" "}
                <span className="font-semibold">Privacy Policy</span>
              </p>

              <p className="mt-4 text-sm">
                Don’t have an account?{" "}
                <Link to="/sign-up" className="text-primary font-semibold">
                  Sign up now and join us!
                </Link>
              </p>
            </form>

          </div>
          {/*           
          show only in large screen */}
          <div className="col-span-2 text-center hidden sm:hidden md:hidden lg:block">
            <h1 className="relative text-[#000000] text-[22px]
                after:absolute after:bottom-[60px] after:w-[2px] after:h-[200px] after:bg-[#E2E8F0] after:left-1/2
               before:absolute before:top-[60px] before:w-[2px] before:h-[200px] before:bg-[#E2E8F0] before:left-1/2
               ">Or</h1>
          </div>
          {/* 
         show in small screens */}
          <div className="col-span-4 mt-16 lg:hidden xl:hidden">
            <span className="relative block text-center text-[22px] text-black  after:absolute after:left-0 after:w-[40%] after:h-[1px] after:bg-[#E2E8F0] after:top-1/2 after:translate-y-[-50%] before:absolute before:right-0 before:w-[40%] before:h-[1px] before:bg-[#E2E8F0] before:top-1/2 before:translate-y-[-50%]">
              Or
            </span>
          </div>


          <div className="col-span-4 mt-16">


            {!showGuestAddress ? <form
              className="bg-[#E2E8F04D] border-[#E2E8F0] rounded-[10px] mt-5 border px-6 py-10  max-w-[550px] min-h-[700px]"
              onSubmit={handleSubmit(onSubmit)}>

              {!guestUser ? <><div className="text-center mb-10">
                <h3 className="text-2xl text-[#030303] font-semibold">
                  Continue as a guest
                </h3>
                <p className="text-[#000000] text-sm">
                  Don't have an account? No problem, you can check out as a guest. You'll have the option to create
                  an account during checkout.
                </p>
              </div>


                {/*             
        //for guest user */}
                <button
                  type="button"
                  onClick={() => setGuestUser(true)}
                  className="block w-full bg-primary text-white px-3 py-4 font-semibold text-base rounded-[4px] "
                  disabled={loader}
                  style={{ opacity: `${loader ? "0.5" : ""}` }}
                >
                  {loader ? (
                    <span className="flex items-center justify-center">
                      <ButtonLoader />
                    </span>
                  ) : (
                    <span>Continue as a Guest</span>
                  )}
                </button></> :
                //guest form 
                <>

                  <div className="text-center mb-10">
                    <h3 className="text-2xl text-[#030303] font-semibold">
                      Enter Contact Details For Delivery
                    </h3>

                    <div class="relative">


                      <input
                        type="number"
                        placeholder="Enter number"
                        {...register("number", {
                          minLength: 1,
                          maxLength: 12
                        })}
                        className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("number")
                          ? "border-red-500"
                          : "border-[#66666666]"
                          } rounded-[4px]`}
                      />
                      {error.includes("number") && (
                        <p className="text-red-500 text-sm"> {errors.number?.message}</p>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email")}
                        className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("email")
                          ? "border-red-500"
                          : "border-[#66666666]"
                          } rounded-[4px] pr-12`}
                      />
                      {error.includes("email") && (
                        <p className="text-red-500 text-sm">  {errors.email?.message}</p>
                      )}

                    </div>
                  </div>

                  {/*             
                 //for guest user */}
                  <button type="submit" className=" w-full bg-primary text-white flex items-center justify-center py-4 px-3 font-semibold text-base min-w-[300px] rounded-[4px] "><span className="mr-2">Confirm & Pay</span> <FaArrowRightLong /></button>


                </>}
            </form> :


              // for guest address
              <form
                className="bg-[#E2E8F04D] border-[#E2E8F0] rounded-[10px] mt-5 ml-10 border px-6 py-10 max-w-[550px] min-h-[700px]"
                onSubmit={handleSubmit2(onSubmit2)}>

                <div className="text-center mb-10">
                  <h3 className="text-2xl text-[#030303] font-semibold">
                    Enter Your delivery address
                  </h3>

                  <div class="relative">
                    <input
                      type="text"
                      placeholder="Enter name"
                      {...register2("name")}
                      className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("number")
                        ? "border-red-500"
                        : "border-[#66666666]"
                        } rounded-[4px]`}
                    />

                    <p className="text-red-500 text-sm"> {errors.name?.message}</p>

                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter country"
                      {...register2("country")}
                      className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("email")
                        ? "border-red-500"
                        : "border-[#66666666]"
                        } rounded-[4px] pr-12`}
                    />

                    <p className="text-red-500 text-sm">  {errors.country?.message}</p>


                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter state"
                      {...register2("state")}
                      className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("state")
                        ? "border-red-500"
                        : "border-[#66666666]"
                        } rounded-[4px] pr-12`}
                    />

                    <p className="text-red-500 text-sm">  {errors.state?.message}</p>


                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter city"
                      {...register2("city")}
                      className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("city")
                        ? "border-red-500"
                        : "border-[#66666666]"
                        } rounded-[4px] pr-12`}
                    />

                    <p className="text-red-500 text-sm">  {errors.city?.message}</p>


                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter address"
                      {...register2("address")}
                      className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${error.includes("address")
                        ? "border-red-500"
                        : "border-[#66666666]"
                        } rounded-[4px] pr-12`}
                    />

                    <p className="text-red-500 text-sm">  {errors.address?.message}</p>


                  </div>
                </div>

                {/*             
                 //for guest user */}
                {/* <button type="submit" className=" w-full bg-primary text-white flex items-center justify-center py-4 px-3 font-semibold text-base min-w-[300px] rounded-[4px] "><span className="mr-2">Confirm & Pay</span> <FaArrowRightLong /></button> */}

                <button
                  type="submit"

                  className="w-full bg-primary text-white flex items-center justify-center py-4 px-3 font-semibold text-base min-w-[300px] rounded-[4px] "
                  disabled={loader}
                  style={{ opacity: `${loader ? "0.5" : ""}` }}
                >
                  {loader ? (
                    <span className="flex items-center justify-center">
                      <ButtonLoader />
                    </span>
                  ) : (
                    <>
                      <span className="mr-2">Confirm & Pay</span> <FaArrowRightLong />
                    </>
                  )}
                </button>

              </form>
            }


          </div>
          <div className="col-span-1"></div>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default React.memo(Login);