"use client";
import React, { useState } from "react";
import CreateRoomModal from "@/ui/Modals/CreateRoomModal";

function CreateRoom() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  return (
    <>
      <button
        type="button"
        className="flex flex-row bg-gray-400 rounded-3xl items-center px-4 py-1 w-full text-black text-[12px] hover:bg-blue-600 justify-center"
        onClick={handleOpenModal}
      >
        Create Room
      </button>
      <CreateRoomModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default CreateRoom;
