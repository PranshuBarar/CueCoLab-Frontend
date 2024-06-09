'use client'
import "@/ui/global.css";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    }
    const handleGetStartedClick = () => {
        router.push('/signup');
    }
    const handlePricingClick = () => {
        router.push('/pricing');
    }
    const handleHelpClick = () => {
        router.push('/help');
    }
    const handleContactClick = () => {
        router.push('/contact');
    }

    return (
        <main>
            <div className="bg-blue-950 h-screen w-screen thinner-scrollbar" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${'./background.jpg'})` }}>
                <div className="h-screen thinner-scrollbar" >
                    <div className="">
                        <div className="flex flex-row p-2 m-5 items-center justify-between justify-end">
                            <img src="./logo.svg" className="left-0 h-20 w-25" />
                            <div className="space-x-5">
                                <button className="text-white p-2 rounded" onClick={handlePricingClick}>
                                    Pricing
                                </button>
                                <button className="text-white p-2 rounded" onClick={handleContactClick}>Contact</button>
                                <button className="text-white p-2 rounded" onClick={handleHelpClick}>Help</button>
                                <button className="text-white p-2 rounded" onClick={handleLoginClick}>Login</button>
                                <button
                                    className="bg-blue-800 text-white border-4 p-2 px-5 rounded-3xl hover:bg-blue-100 hover:text-black"
                                    onClick={handleGetStartedClick}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                        <div className="p-2 m-5">
                            <div className="text-white text-[70px] inter-800">STREAMLINING</div>
                            <div className="text-white text-[70px] inter-800 -mt-10">COLLABORATION</div>
                            <div className="text-white text-[70px] inter-800 -mt-10">EMPOWERING</div>
                            <div className="text-white text-[70px] inter-800 -mt-10">CREATORS</div>
                            <button className="bg-blue-800 text-white border-4 p-3 px-11 rounded-3xl hover:bg-blue-100 hover:text-black font-extrabold" onClick={handleGetStartedClick}>Get Started, It's free!</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center p-2">
                        <div className="text-white border-2 items-center flex flex-col w-1/2 rounded-3xl  p-5">
                            <span>
                                CueCoLab: The ultimate collaboration platform for
                            </span>
                            <span>
                                Content Creators
                            </span>
                            <span>
                                Streamline your workflow, protect your content, and
                            </span>
                            <span>
                                connect with editors effortlessly all in one place!
                            </span>
                        </div>
                    </div>
                    <div className="text-center text-white relative">
                        <div id="textdiv" className="h-screen relative z-1 text-[16px] font-bold">
                            <div className="flex flex-col justify-center items-center m-5 p-11">
                                <img src="./cuecolabvector.svg" className="rounded-3xl" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="text-center text-white relative">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div id="textdiv" className="h-screen relative z-1 text-[16px] m-11 rounded-3xl font-bold bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${'./collaboration.jpg'})` }}>
                        <div className="justify-end flex">
                            <div className="absolute bottom-0 right-0 p-10 text-right space-y-1">
                                <div className="rounded-2xl bg-white text-black text-center p-2">
                                    Secure Collaboration Hub
                                </div>
                                <br />
                                <div>
                                    <span>
                                        Empower your creative process without
                                    </span>
                                    <br />
                                    <span>
                                        compromising your channel&apos;s security
                                    </span>
                                    <br />
                                    <br />
                                    <span>
                                        CueCoLab connects you seamlessly with your editors
                                    </span>
                                    <br />
                                    <span>
                                        ensuring that full control of your channel
                                    </span>
                                    <br />
                                    <span>
                                        always remains in your hands
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-white relative">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div id="textdiv" className="h-screen relative z-1 text-[16px] m-11 rounded-3xl font-bold bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${'./playingvideo.png'})` }}>
                        <div className="justify-end flex">
                            <div className="absolute bottom-0 left-0 p-10 text-left space-y-1">
                                <div className="rounded-2xl bg-white text-black text-center p-2 px-11">
                                    Streamline Your Review Process
                                </div>
                                <br />
                                <div>
                                    <span>
                                        Instantly play newly uploaded videos in CueCoLab Room
                                    </span>
                                    <br />
                                    <span>
                                        to collaboratively review and refine them before
                                    </span>
                                    <br />
                                    <span>
                                        they go public. Perfect your content with ease and precision
                                    </span>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-white relative">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div id="textdiv" className="h-screen relative z-1 text-[16px] m-11 rounded-3xl font-bold bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${'./approval.jpg'})` }}>
                        <div className="justify-end flex">
                            <div className="absolute bottom-0 right-0 p-10 text-right space-y-1">
                                <div className="rounded-2xl bg-white text-black text-center p-2 px-11">
                                    Publish Directly With Instant Approval
                                </div>
                                <br />
                                <div>
                                    <span>
                                        Publish Videos to your channel 
                                    </span>
                                    <br />
                                    <span>
                                        directly from CueCoLab Room with a single click
                                    </span>
                                    <br />
                                    <span>
                                        Simplify your workflow &
                                    </span>
                                    <br />
                                    <span>
                                        Share your content faster
                                    </span>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="flex flex-col text-white items-center p-2 m-16">
                    <hr className="border-t-2 border-white w-full mb-11" />
                    <div className="m-15">
                        © 2024 CueCoLab, All Rights Reserved
                    </div>
                    <div className="m-5 text-[8px]">
                        Background Image by <a href="https://www.freepik.com/free-vector/gradient-connection-background_44420737.htm#query=blue%20web%20background&position=1&from_view=keyword&track=ais_user&uuid=8ca93f68-c402-45df-800e-3932cbc99ebc">Freepik</a>
                    </div>
                </footer>

            </div>
        </main>
    );
}