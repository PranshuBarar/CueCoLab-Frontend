import UploadVideoModal from "@/ui/Modals/UploadVideoModal";
import { useState } from "react";

function UploadVideo() {
    //here we will store the state of the condition of the modal. Like whether its open or closed, based on which 
    //we will decide that whether to show the modal or not 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    //This function will turn the state of the modal to true when the upload video button is clicked 
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    //This function will turn the state of the modal to false when the modal is submitted, essentially
    //closing the modal window
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    //So basically handleOpenModal will be used here in this Upload Video button component and 
    //handleCloseModal will be provided to modal component via prop so that when that modal is getting
    //submitted, it should close the modal window. 

    //Conclusion: handleOpenModal will be used here and handleCloseModal will be used in the modal component

    return (
        <>
            <button
                type="button"
                className="bg-blue-950 rounded-3xl p-1 text-white text-[12px] hover:scale-110 transition-transform duration-700 px-7"
                onClick={handleOpenModal}
            >
                Upload Video
            </button>

            <UploadVideoModal isOpen={isModalOpen} onClose={handleCloseModal} />


        </>

    )
}

export default UploadVideo;