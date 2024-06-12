import { useDestination } from "@/contexts/DestinationContext";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { MdDelete } from "react-icons/md";

interface VideoInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
}

const VideoInfoModal = ({ isOpen, onClose, videoId }: VideoInfoModalProps) => {

    const [containerDiv, setContainerDiv] = useState<HTMLElement | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string>('');


    const handleVideoInfoSaveClick = async () => {
        const videoInfo = {
            title: title, 
            description: description, 
            tags: tags
        }
        try {
            const response = await fetch(`https://api.cuecolab.com/videos/save_info/${videoId}`,{
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoInfo)
            });
            if(response.ok){
                const responseData = await response.text();
                alert(responseData);
            }
            
        } catch (error) {
            alert(error);
        }
    }

    const getVideoInfo = async () => {
        try {
            const response = await fetch(`https://api.cuecolab.com/videos/get_info/${videoId}`,{
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                
            });
            if(response.ok){
                const responseData = await response.json();
                setTitle(responseData.title);
                setDescription(responseData.description);
                setTags(responseData.tags);
            }
            
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        if(isOpen) {
            getVideoInfo();    
        }
        
    }, [isOpen, videoId])



    useEffect(() => {
        const containerDivFromDOM = document.getElementById("RoomContainer");
        if (containerDivFromDOM !== null) {
            setContainerDiv(containerDivFromDOM);
        }
    }, []);

    if (!isOpen || !containerDiv) {
        return null;
    };

    return (
        ReactDOM.createPortal(
            <div
                className="fixed flex absolute top-0 left-0 right-0 bottom-0 rounded-2xl bg-black bg-opacity-50 justify-center items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    id="modalContainer"
                    className="bg-gray-500 h-3/4 w-1/2 rounded-2xl flex flex-col items-center overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        id="modal"
                        className="bg-blue-950 rounded-2xl h-full w-full thinner-scrollbar flex flex-col "
                        style={{
                            height: 'calc(100% - 1rem)', // Subtract the top and bottom margins
                            width: 'calc(100% - 1rem)', // Subtract the left and right margins
                            margin: '0.5rem' // Set the margin around the modal
                        }}
                    >
                        <div className="bg-blue-800 text-white flex flex-col m-2 rounded-2xl p-2 text-center">
                            Title
                            <textarea
                                className="border-2 rounded-2xl m-2 text-black p-4 resize-none bg-gray-400 h-16 thinner-scrollbar"
                                maxLength={200}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="bg-blue-800 text-white flex flex-col m-2 rounded-2xl p-2 text-center">
                            Description
                            <textarea
                                className="border-2 rounded-2xl m-2 text-black p-4 bg-gray-400 h-32 thinner-scrollbar"
                                maxLength={1000}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="bg-blue-800 text-white flex flex-col m-2 rounded-2xl p-2 text-center">
                            Tag
                            <textarea
                                className="border-2 rounded-2xl m-2 text-black p-4 bg-gray-400 h-28 thinner-scrollbar"
                                maxLength={500}
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex  w-full rounded-2xl items-center justify-between">
                        <button
                            className="bg-blue-950 border-white rounded-2xl m-2 px-5 py-3 text-white hover:bg-blue-700 border-2"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="bg-blue-950 border-white rounded-2xl m-2 px-5 py-3 text-white hover:bg-blue-700 border-2"
                            onClick={handleVideoInfoSaveClick}
                        >
                            Save
                        </button>

                    </div>

                </div>

            </div>,
            containerDiv
        )
    );

}

export default VideoInfoModal;