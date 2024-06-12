'use client'
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useCurrentRoomId } from "@/contexts/AllInsideRoomContexts/CurrentRoomIdContext";
import { useParticipants } from "@/contexts/AllInsideRoomContexts/ParticipantsContext";


interface AddEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddEditorModal: React.FC<AddEditorModalProps> = ({ isOpen, onClose }) => {
    const [editorEmail, setEditorEmail] = useState('');
    const { currentRoomId } = useCurrentRoomId();
    const { addParticipant } = useParticipants();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onClose();

        //Now we want to send the new editor's email filled in the input form to the backend so that 
        //a new editor gets added to this room
        //We will also send this particular room's roomId so that the backend should be able to 
        //know that for which room this new editor is being added 
        submitDataToBackend();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setEditorEmail(value);
    }

    const submitDataToBackend = async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const roomId = currentRoomId;
        const email = editorEmail;
        try {
            const response = await fetch(`https://api.cuecolab.com/rooms/${roomId}/add_room_participant`, {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: email,
            });

            if (response.ok) {
                const data = await response.text();
                
            } else {
                const data = await response.text();
                alert(data);

            }
        } catch (error) {
            
            alert("Failed to add new participant to the room " + error);
        }
    };

    const [containerDiv, setContainerDiv] = useState<HTMLElement|null>(null);

    useEffect(() => {
        const containerDivFromDOM = document.getElementById("RoomContainer");
        if (containerDivFromDOM !== null) {
            setContainerDiv(containerDivFromDOM);
        }
    }, [])
    
    if (!isOpen || !containerDiv) {
        return null;
    }


    return (
        ReactDOM.createPortal(
            <div
                className="rounded-3xl ml-1 absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
                onClick={onClose}
            >
                <div
                    className="bg-white p-5 rounded-3xl text-center"
                    onClick={(e) => e.stopPropagation()} //This prevents the clicks (if happening within the
                //modal) from closing it 
                >
                    <p>
                        Enter Editor's Email Here
                    </p>
                    <form
                        className="flex flex-col space-y-2"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type='text'
                            placeholder="Editor's Email"
                            className="border-2 p-2 text-center"
                            onChange={handleChange}
                        >
                        </input>
                        <button
                            type='submit'
                            className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-950"
                        >
                            Add Editor
                        </button>
                    </form>
                </div>
            </div>,
            containerDiv
        )
    )
    
}

export default AddEditorModal;