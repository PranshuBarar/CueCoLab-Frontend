"use client";
import { useEffect, useState } from "react";

function Page() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const emailOfUser = JSON.parse(userData).email;
      setEmail(emailOfUser);
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-11">
      <div className="flex flex-col p-28 bg-blue-950 rounded-3xl text-white opacity-50 items-center justify-center text-[38px]">
        Welcome Back To 
        <img src="/logo.svg" alt="brand" className="h-[100%] w-[100%]" />
      </div>
    </div>




  )
}

export default Page;
