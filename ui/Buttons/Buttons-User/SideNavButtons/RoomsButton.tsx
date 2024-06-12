'use client'
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useRoomSummaryList } from "@/contexts/RoomSummaryContext";
import { RoomSummaryDTO } from "@/interfaces/types";
import { transform } from "next/dist/build/swc";

type RoomProps = {
  onClick?: (value: number) => void;
};

function Rooms(roomProps: RoomProps) {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { roomSummaryDTOList } = useRoomSummaryList();

  const toggleDropDown = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  const rotationStyle = isOpen ? { transform: 'rotate(90deg)' } : {};



  return (
    <div className="rounded-3xl flex flex-col">
      <button
        type="button"
        onClick={() => {
          toggleDropDown();
          roomProps.onClick;
        }}
        className={`flex flex-row items-center px-4 py-1 mt-2 text-black text-[12px] justify-center ${isOpen ? 'bg-blue-600' : 'bg-gray-400 hover:bg-blue-600'} rounded-3xl
                }`}>
        <img
          src="/dropdowniconblack.svg"
          alt="Dropdown"
          className="mr-1 h-4 w-4 transition-transform duration-200 ease-in-out"
          style={rotationStyle}
        />
        Rooms
      </button>
      {/* 
            {
                isOpen && (
                    <div className="bg-blue-200 p-0.5 rounded-b-xl">
                        <div className="flex flex-col bg-blue-950 overflow-auto flex-grow rounded-3xl p-2">
                            {
                                roomSummaryDTOList.map((roomSummarDTO: RoomSummaryDTO) => (
                                    <button
                                        type="button"
                                        className="flex flex-row bg-gray-400 rounded-3xl items-center px-4 py-1 text-black text-[12px] hover:bg-blue-600 justify-center m-0.5"
                                        key={roomSummarDTO.roomId}
                                    >
                                        {roomSummarDTO.roomName}
                                    </button>
                                ))
                            }
                        </div>

                    </div>
                )
            } */}
    </div>
  )
}


export default Rooms;