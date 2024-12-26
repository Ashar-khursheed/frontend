import React, { useState } from "react";
import { Wrapper } from "../shared/Wrapper";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ButtonLoader } from "../shared/buttonLoader/ButtonLoader"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { apiClient } from "../utils/apiWrapper";
 const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isVendor, setIsVendor] = useState(0); // 0 for Private, 1 for Business
    const [errors, setErrors] = useState([]);
    const [loader, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleNameBlur = () => {
        setName(name.trim());  // Trim spaces from start and end when the input loses focus
      };
      const handleEmailBlur = () => {
        setEmail(email.trim());  // Trim spaces from start and end when the input loses focus
      };

    const validateForm = () => {
        const validationErrors = [];

        if (!name) {
            validationErrors.push("Name is required");
        }
        if (!email) {
            validationErrors.push("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.push("Invalid email address");
        }
        if (!password) {
            validationErrors.push("Password is required");
        } else if (password.length < 8) {
            validationErrors.push("Password must be at least 8 characters");
        }
        if (!confirmPassword) {
            validationErrors.push("Confirm Password is required");
        } else if (confirmPassword !== password) {
            validationErrors.push("Passwords do not match");
        } else if (confirmPassword.length < 8) {
            validationErrors.push("Confirm Password must be at least 8 characters");
        }
        if (!phone) {
            validationErrors.push("Mobile number is required");
        } else if (!/^\d{10}$/.test(phone)) { // Check for exactly 10 digits
            validationErrors.push("Mobile number must be 10 digits");
        }

        setErrors(validationErrors);
        return validationErrors.length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
 
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await apiClient.post("https://testhssite.com/api/register", {
                name,
                email,
                password,
                is_vendor: isVendor,
                phone,
            });
            navigate("/login")
        } catch (error) {
            setErrors(error.response.data.errors.email[0])
            // setErrors(error.response.data.errors.email[0])
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <Wrapper>
            <div className="flex items-center justify-center w-full min-h-[75vh] mt-20 mb-20">
                <form className="bg-[#E2E8F04D] border-[#E2E8F0] rounded-[10px] border px-6 py-10 max-w-[550px]" onSubmit={handleFormSubmit}>
                    <div className="text-center mb-7">
                        <h3 className="text-2xl text-[#030303] font-semibold">Create an Account</h3>
                        <p className="text-[#000000] text-sm mt-2">
                            Shopping for your business?
                            {isVendor === 0 ? <span onClick={() => setIsVendor(1)} className="underline cursor-pointer text-primary font-semibold"> Create a business account.</span> : <span onClick={() => setIsVendor(0)} className="underline cursor-pointer text-primary font-semibold"> Create a personal account.</span>}
                        </p>
                    </div>

                    <label htmlFor="" className="text-[#030303] font-semibold">Are You Buying For:</label>
                    <div className="flex flex-row items-center mt-2">
                        <div className="flex items-center flex-row justify-center">
                            <input
                                id="business"
                                type="radio"
                                value="1"
                                name="buyerType"
                                checked={isVendor === 1} // Maintain correct checked state
                                onChange={() => setIsVendor(1)}
                                className="w-4 h-4 text-primary accent-primary border-gray-300 focus:text-primary focus:ring-2"
                            />
                            <label htmlFor="business" className="ml-1 text-[#212121]">Business</label>
                        </div>
                        <div className="flex items-center flex-row justify-center ml-4">
                            <input
                                id="private"
                                type="radio"
                                value="0"
                                name="buyerType"
                                checked={isVendor === 0} // Maintain correct checked state
                                onChange={() => setIsVendor(0)}
                                className="w-4 h-4 text-primary accent-primary border-gray-300 focus:text-primary focus:ring-2"
                            />
                            <label htmlFor="private" className="ml-1 text-[#212121]">Private</label>
                        </div>
                    </div>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleNameBlur}
                        type="text"
                        placeholder="Enter your Name"
                        className="w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border border-[#66666666] rounded-[4px]"
                    />
                    {errors.includes("Name is required") && <p className="text-red-500 text-sm">Name is required</p>}

                    <input
                        value={email}
                        onBlur={handleEmailBlur}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border border-[#66666666] rounded-[4px]"
                    />
                    {errors.includes("Email is required") && <p className="text-red-500 text-sm">Email is required</p>}
                    {errors.includes("Invalid email address") && <p className="text-red-500 text-sm">Invalid email address</p>}
                    {errors.includes("email has already") && <p className="text-red-500 text-sm">The email has already been taken.</p>}

                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} // Allow only digits
                        type="tel"
                        placeholder="Enter your mobile number"
                        className="w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border border-[#66666666] rounded-[4px]"
                    />
                    {errors.includes("Mobile number is required") && <p className="text-red-500 text-sm">Mobile number is required</p>}
                    {errors.includes("Mobile number must be 10 digits") && <p className="text-red-500 text-sm">Mobile number must be 10 digits</p>}

                    <div className="relative">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value.trim())}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border border-[#66666666] rounded-[4px] pr-12"
                        />
                        <span className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <IoMdEye size="24px" /> : <IoMdEyeOff size="24px" />}
                        </span>
                    </div>
                    
                    {errors.includes("Password is required") && <p className="text-red-500 text-sm">Passwords is required</p>}
                    {errors.includes("Passwords must be at least 8 characters") && <p className="text-red-500 text-sm">Passwords must be at least 8 characters</p>}



                    <div className="relative">
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value.trim())}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border border-[#66666666] rounded-[4px] pr-12"
                        />
                        <span className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <IoMdEye size="24px" /> : <IoMdEyeOff size="24px" />}
                        </span>
                    </div>
                    {errors.includes("Confirm Password is required") && <p className="text-red-500 text-sm">Confirm Password is required</p>}
                    {errors.includes("Passwords do not match") && <p className="text-red-500 text-sm">Passwords do not match</p>}
                    {errors.includes("Confirm Password must be at least 8 characters") && <p className="text-red-500 text-sm">Confirm Password must be at least 8 characters</p>}

                    <button type="submit" disabled={loader} style={{ opacity: `${loader ? "0.5" : ""}` }} className="mt-4 block w-full bg-primary text-white px-3 py-4 font-semibold text-base rounded-[4px] " >{loader ? <span className="flex items-center justify-center">
                        <ButtonLoader />
                    </span> : <span>Create an Account</span>}</button>
                    <span className="relative block text-center text-[22px] text-black my-7 after:absolute after:left-0 after:w-[40%] after:h-[1px] after:bg-[#E2E8F0] after:top-1/2 after:translate-y-[-50%]
                        before:absolute before:right-0 before:w-[40%] before:h-[1px] before:bg-[#E2E8F0] before:top-1/2 before:translate-y-[-50%]
                    ">Or</span>

                    <button className="border rounded-[4px] bg-[#FFFFFF66] border-[#03030399] font-semibold text-sm w-full py-3 px-3 flex items-center justify-center">
                        <img src={process.env.PUBLIC_URL + "/icons/apple.png"} className="mr-2" alt="" />Sign In with Apple
                    </button>
                    <button className="border rounded-[4px] bg-[#FFFFFF66] border-[#03030399] font-semibold text-sm w-full py-3 px-3 flex items-center justify-center mt-5">
                        <img src={process.env.PUBLIC_URL + "/icons/google.png"} className="mr-2" alt="" />Sign In with Outlook
                    </button>
                    <p className="mt-4 text-[#212121] text-sm">By registering you agree to the user 
                        <Link to="" ><span className="font-semibold duration-300 hover:text-white hover:bg-primary "> Terms & Condition</span> </Link>and
                        <Link to="" > <span className="font-semibold duration-300 hover:text-white hover:bg-primary "> Privacy Policy</span></Link>
                        </p>

                    <div className="w-full h-[1px] bg-[#E2E8F0] mt-4"></div>
                    <p className="mt-4 text-sm">Already Have an Account? <Link to="/login" className="text-primary font-semibold underline">Sign In</Link></p>

                </form>
            </div>
        </Wrapper>
    );
};

export default React.memo(SignUp);