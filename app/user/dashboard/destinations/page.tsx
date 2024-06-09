"use client";
import { useDestination } from "@/contexts/DestinationContext";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";


function Page() {
    const router = useRouter();
    const destinations = useDestination();
    const [listMaxHeight, setListMaxHeight] = useState(0);
    const destinationList = destinations.destinationList;

    const handleClick = async () => {
        router.push('https://api.cuecolab.com/youtube/authorize')
    }


    useEffect(() => {
        const calculateMaxHeight = () => {
            const scrollableHeight = window.innerHeight - 150;
            setListMaxHeight(scrollableHeight);
        }
        calculateMaxHeight();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center m-5 space-y-5">
            <div id="buttonContainer" className="rounded-2xl">
                <button
                    className="bg-blue-950 text-white rounded-3xl border-2 px-5 p-2 hover:bg-blue-700 text-[12px] hover:text-black"
                    onClick={handleClick}
                >
                    Add Destination
                </button>
            </div>
            <div id="listContainer" style={{ maxHeight: listMaxHeight }} className="overflow-hidden thinner-scrollbar flex flex-col items-center w-2/5 text-white bg-blue-500 rounded-3xl p-2 space-y-7">
                {destinationList.length > 0
                    ?
                    (
                        destinationList.map((destination) => (
                            <div key={destination.destinationId} className="bg-blue-950 p-4 w-full rounded-3xl">
                                {
                                    <div className="flex flex-row space-x-2 justify-between items-center">
                                        <span>
                                            {
                                                destination.destinationUserName
                                            }
                                        </span>

                                        <div className="flex items-center space-x-5">
                                            {
                                                destination.destinationType === 'YOUTUBE' && (
                                                    <img src="/youtubeicon.png" className="w-10 right-0" />
                                                )
                                            }
                                            <button>
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))

                    )
                    :
                    (
                        <div className="space-y-7">
                            <div className="text-center text-white">
                                No Destinations Added
                            </div>
                        </div>

                    )
                }
            </div>
            <div className="bg-blue-500 rounded-3xl p-4 m-2">
                Integrating your Youtube Channel is only available for 100 Testing Users right now
                <br />
                Contact us at support@cuecolab.com if you want to Test this feature.
            </div>
        </div>
    )
}

export default Page;