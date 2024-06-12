import { useDestination } from "@/contexts/DestinationContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { MdDelete } from "react-icons/md";

interface UploadToChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
}

const UploadToChannelModal: React.FC<UploadToChannelModalProps> = ({ isOpen, onClose, videoId }) => {
    const [containerDiv, setContainerDiv] = useState<HTMLElement | null>(null);
    const [listMaxHeight, setListMaxHeight] = useState(0);
    const modalContainerRef = useRef<HTMLDivElement | null>(null);
    const destination = useDestination();
    const destinationList = destination.destinationList;
    const router = useRouter();


    useEffect(() => {
        const calculateMaxHeight = () => {
            const titleHeight = 20;
            const padding = 60;
            const footerPadding = document.getElementById('AddDestinationButtonContainer')?.clientHeight || 0;
            if (modalContainerRef.current) {
                const scrollableHeight = (modalContainerRef.current?.clientHeight - footerPadding - titleHeight - padding * 2) || 0;
                setListMaxHeight(scrollableHeight);
            }
        }
        if (isOpen && modalContainerRef.current) {
            calculateMaxHeight();
        }

    }, [[isOpen, destinationList.length, modalContainerRef.current]])

    useEffect(() => {
        const containerDivFromDOM = document.getElementById("RoomContainer");
        if (containerDivFromDOM !== null) {
            setContainerDiv(containerDivFromDOM);
        }
    }, [])



    const handleClick = async () => {
        router.push('/user/dashboard/destinations')
    }

    const handleDestinationClick = async (destinationId: string) => {

        const VideoUploadToDestinationRequestDTO = {
            videoId: videoId,
            destinationId: destinationId,
            privacyStatus: 'public'
        }

        try {
            const response = await fetch('https://api.cuecolab.com/videos/upload_to_destination', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(VideoUploadToDestinationRequestDTO)
            })
            if(response.ok) {
                const responseData = await response.text();
                alert(responseData);
            }
        } catch (err) {
            
            alert(err);
        }
    }


    if (!isOpen || !containerDiv) {
        return null;
    };

    return (
        ReactDOM.createPortal(
            <div
                className="fixed flex absolute top-0 left-0 right-0 bottom-0 rounded-2xl bg-black bg-opacity-50 justify-center items-center"
                onClick={onClose}
            >
                <div
                    id="UploadToChannelModalContainer"
                    ref={modalContainerRef}
                    className="bg-white flex flex-col h-2/3 rounded-2xl p-5 text-center space-y-5"
                    onClick={(e) => e.stopPropagation()} // Prevent clicks within the modal from closing it
                >
                    <div className="bg-blue-300 rounded-2xl p-2">
                        Choose Destination
                    </div>
                    <div className="m-1 p-1">
                        <div style={{ maxHeight: listMaxHeight }} id="listContainer" className="overflow-hidden m-1 p-5 thinner-scrollbar flex flex-col items-center text-white bg-blue-700 rounded-2xl p-1 space-y-2">
                            {destinationList.length > 0
                                ?
                                (
                                    destinationList.map((destination) => (
                                        <div key={destination.destinationId} className="bg-blue-950 p-4 w-full rounded-3xl" onClick={() => handleDestinationClick(destination.destinationId)}>
                                            {
                                                <div>
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
                                                        </div>
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
                        <div>
                            <button
                                className="bg-blue-950 text-white rounded-3xl border-2 px-5 p-2 hover:bg-blue-700 text-[12px] hover:text-black"
                                onClick={handleClick}
                            >
                                Add Destination
                            </button>
                        </div>
                    </div>

                </div>
            </div>,
            containerDiv
        )
    );
}

export default UploadToChannelModal;