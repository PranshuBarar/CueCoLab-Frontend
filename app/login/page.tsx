"use client";
import Continuewithgoogle from "@/ui/Buttons/Button-Login-SignUp/Continuewithgoogle";
import LoginAndSignupLayout from "@/ui/LoginAndSignUp/LoginAndSignUpLayout";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEmail } from "@/contexts/EmailContext";
import BounceLoader from "react-spinners/BounceLoader";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { setEmailString } = useEmail();
  const [loading, setLoading] = useState(false);

  //Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //We will prevent default behaviour of form submission
    event.preventDefault();
    setLoading(true);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      // Make an HTTP POST request to the backend
      const response = await fetch("https://api.cuecolab.com/login", {
        method: "POST",
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const data = await response.text();
        
        alert(data);
        setEmailString(email);
        //here we will redirect the user to /login/code page
        router.push("/login/code");
        setLoading(false);
      } else {
        alert("Failed to send OTP. Please try again");
      }
    } catch (error) {
      
      alert("Failed to send OTP");
    }
  };

  return (
    <LoginAndSignupLayout>
      <div className="flex flex-col m-2 bg-blue-600 w-[500px] rounded-3xl p-2 items-center justify-center">
        <div className="flex flex-col m-5 w-[70%] rounded-3xl p-5 items-center justify-center space-y-7 w-[90%]">
          <div
            id="Login to your account"
            className="rounded-xl bg-blue-800 text-white p-2 text-center w-full"
          >
            Create your account
          </div>
          <div className="bg-white rounded-xl py-2">
            <Continuewithgoogle />
          </div>
          <div className="">Or login with email</div>
          <div className="flex flex-col space-y-2 w-full">
            <form
              className="flex flex-col space-y-2 w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                className="border-2 border-gray-400 px-5 py-4 focus:border-blue-900 focus:outline-none rounded-2xl"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-center items-center bg-blue-700 rounded-2xl text-white w-full">
                {
                  !loading
                    ?
                    <button
                      type="submit"
                      className="bg-blue-950 rounded-2xl px-10 py-3 text-white w-full hover:bg-blue-800 hover:bg-blue-800"
                    >
                      Get Login Code
                    </button>
                    :
                    <div className="flex items-center justify-center w-full h-full px-10 py-2">
                      <BounceLoader color="#1b2150" size={32} />
                    </div>
                }
              </div>

            </form>
          </div>
          <div className="flex text-[14px] space-x-2">
            <p className="text-black">
              New to CueCoLab?
            </p>
            <a href="https://cuecolab.com/signup" className="text-white underline hover:text-gray-200">
              Create New Account
            </a>
          </div>

        </div>
      </div>
    </LoginAndSignupLayout>
  );
}

export default Login;

