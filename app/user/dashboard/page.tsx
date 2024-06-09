"use client";
import { useUserAccountDetails } from "@/contexts/UserAccountDetailsContext";
import { useRouter } from 'next/navigation';


function Page() {
  const { userAccountDetails } = useUserAccountDetails();
  const router = useRouter();

  const handleClick = async () => {
    router.push('/user/dashboard/destinations')
  }

  return (
    <div className="flex flex-col w-full h-full rounded-3xl items-center justify-center space-y-2">
      <div className="flex flex-row bg-blue-500 w-1/2 h-3/4 rounded-3xl p-5 items-center justify-center space-x-5">
        <div className="flex flex-col space-y-2 text-center">
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7">
            Email
          </div>
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7">
            Subscription
          </div>
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7">
            Storage Used
          </div>
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7">
            Max Storage
          </div>
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7">
            Social Login
          </div>
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7 ">
            {userAccountDetails.email || "Not available"}
          </div>
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7 ">
            {userAccountDetails.isPro ? "Pro" : "Free Tier"}
          </div>
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7 ">
            {userAccountDetails.storageUsed}
          </div>
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7 ">
            {userAccountDetails.maxStorage} MB
          </div>
          <div className="text-white text-[14px] bg-blue-900 rounded-2xl p-4 px-7 ">
            {userAccountDetails.socialLogin ? "Google" : "No Social Login Connected"}
          </div>
        </div>
      </div>
      <div className="rounded-2xl">
        <button
          className="bg-blue-950 text-white rounded-3xl border-2 px-5 p-2 hover:bg-blue-700 text-[12px] hover:text-black"
          onClick={handleClick}
        >
          Destinations
        </button>
      </div>
    </div>
  );


}

export default Page;