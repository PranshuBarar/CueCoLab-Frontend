'use client'
import { useState, useEffect, ChangeEvent } from "react";
import ReactDOM from "react-dom";
import Upload from "../Buttons/Buttons-User/RoomButtons/UploadFile";
import { FormEvent } from "react";
import { useParams } from "next/navigation";
import { useUserAccountDetails } from "@/contexts/UserAccountDetailsContext";
import axios, { AxiosProgressEvent } from 'axios';
import { progress } from "@material-tailwind/react";
import { useVideos } from "@/contexts/AllInsideRoomContexts/VideosContext";
import { Video } from "@/interfaces/types";



interface UploadVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadVideoModal = ({ isOpen, onClose }: UploadVideoModalProps) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [containerDiv, setContainerDiv] = useState<HTMLElement | null>(null);
    // const [fileSizeInMb, setFileSizeInMb] = useState<number>(0);
    const { roomId } = useParams() as { roomId: string };
    const { userAccountDetails } = useUserAccountDetails();
    const { userId } = userAccountDetails;
    const videos = useVideos();


    useEffect(() => {
        const containerDivFromDOM = document.getElementById("RoomContainer");
        if (containerDivFromDOM !== null) {
            setContainerDiv(containerDivFromDOM);
        }
    }, [])


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //Now we will send the request to the backend server for signed cookies 
        if (selectedFile) {
            const fileSizeInMb = selectedFile.size / (1024 * 1024);
            
            onClose();
            submitDataToBackend(fileSizeInMb);
        } else {
            alert("Please select a file to upload");
        }
    };

    const submitDataToBackend = async (fileSizeInMb: number) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const videoUploadDTO = {
            roomId: roomId,
            uploader_UserId: userId,
            videoFileName: selectedFile?.name,
            videoFileSize: fileSizeInMb,
        };

        


        try {
            
            const response = await axios.put("https://api.cuecolab.com/videos/upload", videoUploadDTO,{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            
            });
            if (response.status === 200) {
                const responseData = await response.data;
                
                const signedUrl = responseData[0];
                const videoId = responseData[1];
                // videoToBeUpdated = videos.videos.find(v => v.videoId === videoId);
                
                if (selectedFile !== null) {
                    try {
                        const response = await axios.put(signedUrl, selectedFile, {
                            headers: {
                                'x-amz-meta-content-disposition': `attachment; filename="${selectedFile.name}"`
                            },
                            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                                if(progressEvent.total) {
                                    const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                                    videos.updateVideoProgress(videoId, percentCompleted);
                                    
                                }
                            }
                        });
                        if (response.status === 200) {
                            
                        }
                    }
                    catch (err) {
                        
                    }
                }

            }
        } catch (error) {
            const messageOnFailure = 'Either the video file size is too large or format not supported';
            alert(messageOnFailure);
        }
    };

    if (!isOpen || !containerDiv) {
        return null;
    };
    return ReactDOM.createPortal(
        <div
            className="rounded-2xl absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
            onClick={onClose}
        >
            <div
                className="bg-white p-7 rounded-3xl text-center text-black text-[12px] flex flex-col space-y-5"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-[20px] bg-gray-300 p-2 rounded-3xl px-5">Choose file for Upload</h1>
                <form className="flex flex-col items-center justify-center overflow space-y-7" onSubmit={handleSubmit}>
                    <label htmlFor="file-upload" className="flex flex-col cursor-pointer">
                        <span className="bg-blue-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-blue-700 transition duration-200">Choose File</span>
                        {<span className="mt-2 text-[12px] truncate w-48">{selectedFile ? selectedFile.name : 'No File Choosen'}</span>}
                        <input id="file-upload" type="file" accept="video/*" className="hidden overflow" onChange={handleChange} />
                    </label>
                    <Upload />
                </form>
            </div>
        </div>,
        containerDiv
    );
}

export default UploadVideoModal;






