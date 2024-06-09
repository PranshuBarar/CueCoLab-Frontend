import LoginAndSignupLayout from "@/ui/LoginAndSignUp/LoginAndSignUpLayout";
import OTPInput from "@/ui/LoginAndSignUp/OTPInput";

function LoginCode() {
  return (
    <LoginAndSignupLayout>
      <div className="flex flex-col m-2 bg-blue-500 w-[500px] rounded-3xl p-2 items-center justify-center">
        <div className="flex flex-col m-5 w-[70%] rounded-3xl p-5 items-center justify-center space-y-7 w-[90%]">
          <div
            id="Login to your account"
            className="rounded-xl bg-blue-950 text-white py-5 text-center w-full font-bold text-[19px]"
          >
            A 6-digit log in code is sent to your email
          </div>

          <div className="w-full bg-blue-100 text-center rounded-2xl h-10 flex justify-center items-center">
            Enter log in code here
          </div>
          <div className="flex flex-col space-y-7 w-full">
            <form className="flex flex-col space-y-7">
              <OTPInput />
            </form>
          </div>
        </div>
      </div>
    </LoginAndSignupLayout>
  );
}

export default LoginCode;
