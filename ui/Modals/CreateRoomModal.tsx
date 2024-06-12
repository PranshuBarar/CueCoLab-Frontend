import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useRoomSummaryList } from "@/contexts/RoomSummaryContext";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose }) => {
  const [roomName, setRoomName] = useState("");
  const { addNewRoomSummary } = useRoomSummaryList();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
    //Now we want to send the roomName filled in the input form to the backend so that a new room gets created
    //we will also send the userId so that the backend creates a new room for this particular user
    submitDataToBackend();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setRoomName(value);
  };

  //This is an async function which will be called when the data has to be submitted to the backend
  const submitDataToBackend = async () => {
    //We will first create headers
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      
      const response = await fetch("https://api.cuecolab.com/rooms/create_room", {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: roomName,
      });
      if (response.ok) {
        const newRoomSummaryDTO = await response.json();
        addNewRoomSummary(newRoomSummaryDTO);
      } else {
        alert("Failed to create room: Response not OK");
      }
    } catch (error) {
      
      alert("Failed to create room: Exception caught");
    }
  };

  return isOpen
    ? ReactDOM.createPortal(
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white p-5 rounded-3xl text-center"
          onClick={(e) => e.stopPropagation()} // Prevent clicks within the modal from closing it
        >
          <p>Enter Room Name Here</p>
          <form
            className="flex flex-col space-y-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Room Name"
              className="border-2 p-2 text-center"
              onChange={handleChange}
              maxLength={16}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-950"
            >
              Create Room
            </button>
          </form>
        </div>
      </div>,
      document.body
    )
    : null;
};

export default CreateRoomModal;
