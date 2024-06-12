"use client";
import React, { useState, useRef, useEffect } from "react";
import { useEmail } from "@/contexts/EmailContext";
import { useRouter } from "next/navigation";
import BounceLoader from "react-spinners/BounceLoader";

function OTPInput() {
  const inputArray = new Array(6).fill("");
  const [otp, setOtp] = useState(inputArray);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { emailString } = useEmail();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (otp[5] !== "") {
      setLoading(false);
      handleSubmit();
    }

  }, [otp])

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    const newOtpArray = [...otp];
    newOtpArray[index] = value;
    setOtp(newOtpArray);

    if (
      value &&
      index < 5
    ) {
      inputRefs.current[index+1].focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };


  const handleSubmit = async (event?: React.MouseEvent) => {
    event?.preventDefault();
    setLoading(true);

    //First we will initialize the headers to be sent with the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const otpString: string = otp.join("");

    try {
      // Make an HTTP POST request to the backend server
      const response = await fetch("https://api.cuecolab.com/login/code", {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify({ otp: otpString, email: emailString }),
      });
      if (response.ok) {
        
        router.push("/user");
      } else {
        setLoading(false);
        setOtp(inputArray);
        inputRefs.current[0]?.focus();
        alert("OTP is Wrong, try again");
      }
    } catch (error) {
      alert("Failed to receive OTP");
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row justify-between">
        {otp.map((data: string, index: number) => (
          <input
            className="bg-blue-700 h-14 w-14 rounded text-center"
            key={index}
            value={data}
            type="text"
            maxLength={1}
            onChange={(event) => handleChange(event, index)}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => handleKeyDown(event, index)}
            // ref={index === 0 ? firstInputRef : null}
            ref={(element: HTMLInputElement) => inputRefs.current[index] = element}
          />
        ))}
      </div>
      <div>
        {
          !loading
            ?
            <button
              className={'bg-blue-950 rounded-2xl px-10 py-3 text-white w-full'}
              ref={loginButtonRef}
              onClick={(event) => handleSubmit(event)}
            >
              Submit
            </button>
            :
            <div className="flex items-center justify-center w-full h-full px-10 py-2">
              <BounceLoader color="#1b2150" size={32} />
            </div>
        }

      </div>
    </div>
  );
}

export default OTPInput;


























// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { useEmail } from "@/contexts/EmailContext";
// import { useRouter } from "next/navigation";

// function OTPInput() {
//   const inputArray = new Array(6).fill("");
//   const [otp, setOtp] = useState(inputArray);
//   const firstInputRef = useRef<HTMLInputElement>(null);
//   const loginButtonRef = useRef<HTMLButtonElement>(null);
//   const [autoSubmitClicked, setAutoSubmitClicked] = useState(false);
//   const { emailString } = useEmail();
//   const router = useRouter();

//   useEffect(() => {
//     firstInputRef.current?.focus();
//   }, []);

//   const handleChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const value = event.target.value;
//     const newOtpArray = [...otp];
//     newOtpArray[index] = value;
//     setOtp(newOtpArray);

//     if (
//       value &&
//       index < 5 &&
//       event.target.nextSibling instanceof HTMLInputElement
//     ) {
//       event.target.nextSibling.focus();
//     }
//     if (value && index === 5) {
//       setAutoSubmitClicked(true);
//       loginButtonRef.current?.click();
//     }
//   };

//   const handleSubmit = async (event: React.MouseEvent) => {
//     event?.preventDefault();

//     //First we will initialize the headers to be sent with the request
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     const otpString: string = otp.join("");

//     try {
//       // Make an HTTP POST request to the backend server
//       const response = await fetch("https://api.cuecolab.com/login/code", {
//         method: "POST",
//         headers: headers,
//         credentials: "include",
//         body: JSON.stringify({ otp: otpString, email: emailString }),
//       });
//       if (response.ok) {
//         router.push("/user");
//       }
//     } catch (error) {
//       alert("Failed to send OTP");
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-6">
//       <div className="flex flex-row justify-between">
//         {otp.map((data: string, index: number) => (
//           <input
//             className="bg-blue-700 h-14 w-14 rounded text-center"
//             key={index}
//             value={data}
//             type="text"
//             maxLength={1}
//             onChange={(event) => handleChange(event, index)}
//             onFocus={(event) => event.target.select()}
//             ref={index === 0 ? firstInputRef : null}
//           />
//         ))}
//       </div>
//       <div>
//         <button
//           className={`bg-blue-950 rounded-2xl px-10 py-3 text-white w-full ${autoSubmitClicked ? "bg-green-500" : "hover:bg-blue-800"
//             }`}
//           ref={loginButtonRef}
//           onClick={(event) => handleSubmit(event)}
//         >
//           Log in
//         </button>
//       </div>
//     </div>
//   );
// }

// export default OTPInput;
