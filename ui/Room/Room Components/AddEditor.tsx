import AddEditorModal from "@/ui/Modals/AddEditorModal";
import { useState } from "react";


function AddEditor() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <button 
                type="button" 
                className="bg-sky-700 px-2 py-1 rounded-3xl text-white text-[12px]"
                onClick={handleOpenModal}
            >
                Add Editor
            </button>
            <AddEditorModal isOpen={isModalOpen} onClose={handleCloseModal}/>
        </>

    )
}

export default AddEditor;