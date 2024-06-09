'use client'
import { RoomInvitesContextType, RoomInvitesSummaryDTO, RoomSummaryDTO } from "@/interfaces/types";
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useUserAccountDetails } from "./UserAccountDetailsContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


const RoomInvitesContext = createContext<RoomInvitesContextType | undefined>(undefined);

export const useRoomInvites = (): RoomInvitesContextType => {
    const context = useContext(RoomInvitesContext) as RoomInvitesContextType;
    if (!context) {
        throw new Error('useRoomInvites should be used within RoomInvitesProvider');
    }
    return context;
}

export const RoomInvitesProvider = ({ children }: { children: ReactNode }) => {
    const [roomInvites, setRoomInvites] = useState<RoomInvitesSummaryDTO[]>([]);
    const { userAccountDetails } = useUserAccountDetails();
    const userId = userAccountDetails.userId;
    const [currentPathname, setCurrentPathname] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
    

    useEffect(()=>{
        setCurrentPathname(pathname);
    }, [pathname]);
    

    useEffect(() => {
        let eventSource: EventSource;

        eventSource = new EventSource(`https://api.cuecolab.com/subscribe/user_account_level_events`, { withCredentials: true });


        const handleNewRoomInviteAddedEvent = (event: MessageEvent) => {
            const roomInvitesSummaryDTO = JSON.parse(event.data);
            addNewRoomInvite(roomInvitesSummaryDTO);
        }

        const handleRoomInviteRevokedEvent = (event: MessageEvent) => {
            const invitedRoomIdToBeRemoved = JSON.parse(event.data);
            
            removeRoomInvite(invitedRoomIdToBeRemoved);
            
            const urlContainsRoomId = currentPathname?.includes(invitedRoomIdToBeRemoved);
            
            if (urlContainsRoomId) {
                router.push('/user/room_invites');
            }
        }

        

        eventSource.onerror = (error) => {
            
            eventSource?.close();
        };

        eventSource.addEventListener('NewRoomInviteAddedEvent', handleNewRoomInviteAddedEvent);
        eventSource.addEventListener('RoomInviteRevokedEvent', handleRoomInviteRevokedEvent);
        // roomLevelEventSource.addEventListener('CurrentRoomDeletedEvent', handleCurrentRoomDeletedEvent);


        return () => {
            eventSource?.close();
        };
    }, [userId, currentPathname])

    const updateRoomInvites = (roomInvites: RoomInvitesSummaryDTO[]) => {
        setRoomInvites(roomInvites);
    }

    const addNewRoomInvite = (newRoomInvite: RoomInvitesSummaryDTO) => {
        setRoomInvites(roomInvites => [...roomInvites, newRoomInvite]);
    }

    const removeRoomInvite = (roomId: string) => {
        setRoomInvites(roomInvites => roomInvites.filter(roomInvite => roomInvite.roomSummaryDTO.roomId !== roomId));
    }

    return (
        <RoomInvitesContext.Provider value={{ roomInvites, updateRoomInvites, addNewRoomInvite, removeRoomInvite }}>
            {children}
        </RoomInvitesContext.Provider>
    )

}