'use client'
import "@/ui/global.css";
import { useRouter } from "next/navigation";

export default function Pricing() {
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/home');
    }

    return (
        <main>
            <div className="bg-blue-950 h-screen w-screen thinner-scrollbar">
                <div className="flex flex-row p-2 m-5 items-center justify-between">
                    <img src="./logo.svg" className="left-0 h-20 w-25" />
                    <button
                        className="bg-blue-800 text-white border-4 p-2 px-5 rounded-3xl hover:bg-blue-100 hover:text-black"
                        onClick={handleBackClick}
                    >
                        Back to Home
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center h-full text-white">
                    <div className="text-[32px] font-bold mb-5">Pricing</div>
                    <div className="text-[18px] text-center">
                        Our pricing plans will be available soon!
                    </div>
                    <div className="text-[18px] text-center mt-5">
                        We are working hard to bring you the best value for your collaboration and security needs.
                    </div>
                    <div className="text-[18px] text-center mt-5">
                        Stay tuned for our upcoming pricing options.
                    </div>
                </div>
            </div>
        </main>
    );
}
