'use client'
import { useRouter } from "next/navigation";

function RoomInvitesButton() {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/user/room_invites');
    }

    return (
        <button type="button" onClick={handleClick} className="flex flex-row w-full bg-gray-400 rounded-3xl items-center px-4 py-1 text-black text-[12px] hover:bg-blue-600 justify-center">
            Room Invites
        </button>
    )
}

export default RoomInvitesButton;

