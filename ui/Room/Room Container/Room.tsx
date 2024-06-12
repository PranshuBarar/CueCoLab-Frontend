'use client'
import Editors from "@/ui/Buttons/Buttons-User/RoomButtons/Editors";
import VideoBox from "@/ui/Room/Room Components/VideoBox";
import ChatBox from "../Room Components/ChatBox";
import { RoomProps } from "@/interfaces/types";
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { Participant, RoomData } from "@/interfaces/types";
import { useParticipants } from "@/contexts/AllInsideRoomContexts/ParticipantsContext";
import { useCurrentRoomId } from "@/contexts/AllInsideRoomContexts/CurrentRoomIdContext";
import { useUserAccountDetails } from "@/contexts/UserAccountDetailsContext";
import { useVideos } from "@/contexts/AllInsideRoomContexts/VideosContext";


function Room() {

  const participants = useParticipants();
  const videos = useVideos();

  const { roomId } = useParams() as { roomId: string };

  //As we have already extracted roomId from URI, we need to fill it up in the CurrentRoomIdContext,
  //so that it can be used down the line in other components
  const { setCurrentRoomId } = useCurrentRoomId();
  useEffect(() => {
    setCurrentRoomId(roomId);
  })


  const [roomData, setRoomData] = useState<RoomData>({
    "roomId": "",
    "roomName": "",
    "chats": [],
    "videos": [],
    "participants": []
  }
  );
  useEffect(() => {


    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    async function fetchRoomDetails() {
      try {
        const response = await fetch(`https://api.cuecolab.com/rooms/${roomId}`, {
          method: 'GET',
          headers: headers,
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const roomData: RoomData = data;
          setRoomData(roomData);
          participants.updateParticipants(roomData.participants);
          videos.updateVideos(roomData.videos);
        }
      }
      catch (error) {
        
        alert('Request failed');
      }
    }
    fetchRoomDetails();
  }, [])
  return (
    <div id="RoomContainer" className="relative flex flex-col h-full w-full rounded-2xl bg-blue-500 text-[12px]">
      <div className="flex flex-grow flex-row justify-between justify-center items-center rounded-2xlr relative p-1">
        <div>
          <Editors />
        </div>
        <div className="absolute mx-auto w-max inset-0 flex flex-col justify-center items-center">
          <div className="bg-sky-300 rounded-2xl p-1 pl-20 pr-20 text-[12px]">
            {roomData.roomName}
          </div>
        </div>
      </div>
      <div id="conta" className="flex flex-row rounded-2xl m-0 h-full justify-center  text-[12px]">
        <div id="contb" className="flex flex-col w-1/2 rounded-2xl overflow-hidden">
          <VideoBox />
        </div>
        {/* <div className="flex flex-col w-[50%] rounded-2xl">
          <ChatBox />
        </div> */}
      </div>
    </div>
  );
}

export default Room;











