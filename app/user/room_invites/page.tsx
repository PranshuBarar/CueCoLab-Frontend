'use client'
import { useRoomInvites } from "@/contexts/RoomInvitesContext";
import { RoomInvitesSummaryDTO } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function Page() {

    const [listMaxHeight, setListMaxHeight] = useState(0);
    const { roomInvites, updateRoomInvites } = useRoomInvites();
    
    const router = useRouter();
    const fetchInvitedRoomsListFromBackend = async () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch(`https://api.cuecolab.com/rooms/get_invited_rooms`, {
                method: 'GET',
                headers: headers,
                credentials: 'include',
            });
            if (response.ok) {
                const text = await response.text();
                if (text) {
                    const data = JSON.parse(text) as RoomInvitesSummaryDTO[];
                    updateRoomInvites(data);
                }
            }
        } catch (error) {
            
            alert(error);
        }
    }

    useEffect(() => {
        fetchInvitedRoomsListFromBackend();
    }, [])

    const handleClick = (roomId: string) => {
        router.push(`/user/room_invites/${roomId}`);
    }

    useEffect(() => {
        const calculateMaxHeight = () => {
            const scrollableHeight = window.innerHeight - 150;
            setListMaxHeight(scrollableHeight);
        }
        calculateMaxHeight();
    }, [])


    return (
        <div className="flex flex-col justify-center items-center m-5 space-y-5">
            <div className="bg-blue-950 text-white p-2 rounded-3xl px-11 text-[12px]">
                Rooms to which you are invited
            </div>
            <div className="flex flex-col text-white bg-sky-500 rounded-3xl p-8 space-y-2" style={{maxHeight: listMaxHeight}}>
                {roomInvites.length > 0 ? (
                    roomInvites.map((roomInvite) => (
                        <div key={roomInvite.roomSummaryDTO.roomId} className="flex flex-row items-center justify-center bg-blue-950 p-2 rounded-3xl space-x-5 text-[12px] px-3 w-[98%]">
                            <button
                                onClick={() => handleClick(roomInvite.roomSummaryDTO.roomId)}
                                key={roomInvite.roomSummaryDTO.roomId}
                                className="bg-white rounded-3xl px-8 py-1 text-black hover:text-white hover:bg-black w-[50%]"
                            >
                                {roomInvite.roomSummaryDTO.roomName}
                            </button>
                            <div>
                                {
                                    `Host : ${roomInvite.hostEmail}`
                                }
                            </div>
                        </div>

                    ))
                ) : (
                    <div className="space-y-11 overflow-hidden thinner-scrollbar">
                        <div className="text-center text-white">
                            No Room Invites
                        </div>
                    </div>

                )
                }
            </div>
        </div>
    )
}

export default Page;