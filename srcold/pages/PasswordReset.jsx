import React, { useEffect, useState } from "react";
import { Wrapper } from "../shared/Wrapper";
import axios from "axios";
import { ButtonLoader } from "../shared/buttonLoader/ButtonLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
  const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoading] = useState(false);
  const navigate = useNavigate();
  // const history = useHistory();
  const location = useLocation(); // Get the location object
  const token = location.state;

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("please fill New password password");
      return false;
    }
    if (!confirmPassword) {
      setError("please fill Confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      toast("Both password should be same!");
      return false;
    }
    setError(""); // Clear any existing errors
    return true;
  };

  const handleFormSubmit = async (e) => {
    const body = {
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      token: location?.pathname?.split("/")[2],
    };
 
    e.preventDefault(); // Prevent default form submission
    if (!validateForm()) return; // Validate form before submitting
    try {
    
      setLoading(true);
      const response = await axios.post(
        "https://testhssite.com/api/password/reset",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      navigate("/login");
      setLoading(false);
    } catch (error) {
 
      setError("Verification Failed. Please check your Email.");
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Wrapper>
        <div className="flex items-center justify-center w-full h-[60vh]">
          <form
            className="bg-[#E2E8F04D] border-[#E2E8F0] rounded-[10px] border px-6 py-10 max-w-[550px]"
            onSubmit={handleFormSubmit}
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl text-[#030303] font-semibold">
                Reset Password
              </h3>
              <p className="text-[#000000] text-sm">
                Please type your email for password reset
              </p>
            </div>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${
                error.includes("Email")
                  ? "border-red-500"
                  : "border-[#66666666]"
              } rounded-[4px]`}
            />
            {error.includes("Email") && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${
                error.includes("New") ? "border-red-500" : "border-[#66666666]"
              } rounded-[4px]`}
            />
            {error.includes("New") && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <input
              type="password"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full block mt-5 px-3 py-3 bg-[#FFFFFF66] text-[#212121] border ${
                error.includes("Confirm")
                  ? "border-red-500"
                  : "border-[#66666666]"
              } rounded-[4px]`}
            />
            {error.includes("Confirm") && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <p className="text-[#64748B] text-sm my-5 font-semibold"></p>
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
                <span>Reset Password</span>
              )}
            </button>
            <p className="mt-4 text-[#212121] text-sm">
              By registering you agree to the user{" "}
              <span className="font-semibold">Terms & Condition</span> and{" "}
              <span className="font-semibold">Privacy Policy</span>
            </p>
          </form>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};


export default React.memo(PasswordReset);