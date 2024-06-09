"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { EmailContextType } from "@/interfaces/types";

// Creating a context with a default undefined value. This is because at the time of creation,
// we don't yet have a specific value to give it. It's a placeholder until we provide actual values
// via the Provider component below.
const EmailContext = createContext<EmailContextType | undefined>(undefined);

//This is a custom hook which will be called to get the context using useContext hook which
//takes the context (which contains the value of the required data) as parameter and will
//fetch its present value and will return that context which contains the value
export const useEmail = () => {
  const context = useContext(EmailContext) as EmailContextType;
  if (context === undefined) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
};

// The EmailProvider component:
// 1. Manages the email state locally within itself using the useState hook.
// 2. Provides the email state and setEmailString function to all of its child components
//    through the EmailContext.Provider. This means any child in the component tree can access
//    and manipulate the email state as needed, without having to prop drill.
export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [emailString, setEmailString] = useState<string>("");

  // The value prop of the Provider is where you define what data should be available
  // to components that consume this context.
  return (
    <EmailContext.Provider
      value={{ emailString: emailString, setEmailString: setEmailString }}
    >
      {children}
    </EmailContext.Provider>
  );
};
