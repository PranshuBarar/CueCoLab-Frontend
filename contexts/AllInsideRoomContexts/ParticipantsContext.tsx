'use client'
import { Participant, ParticipantsContextType } from '@/interfaces/types';
import React, { createContext, useContext, useState, ReactNode, useEffect} from 'react';
import { useCurrentRoomId } from './CurrentRoomIdContext';

const ParticipantsContext = createContext<ParticipantsContextType | undefined>(undefined);

export const useParticipants = (): ParticipantsContextType => {
    const context = useContext(ParticipantsContext) as ParticipantsContextType;
    if (!context) {
        throw new Error('useParticipants must be used within ParticipantsProvider');
    }
    return context;
}



export const ParticipantsProvider = ({ children }: { children: ReactNode }) => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const { currentRoomId } = useCurrentRoomId();

    useEffect(() => {
        let eventSource: EventSource;
        if (currentRoomId) {
            eventSource = new EventSource(`https://api.cuecolab.com/subscribe/room_level_events/${currentRoomId}`, { withCredentials: true });
            
            
            const handleNewEditorAddedEvent = (event: MessageEvent) => {
                const newRoomParticipant = JSON.parse(event.data);
                addParticipant(newRoomParticipant);
            }

            const handleEditorRemovedEvent = (event: MessageEvent) => {
                const roomParticipantIdToBeRemoved = JSON.parse(event.data);
                removeParticipant(roomParticipantIdToBeRemoved);
            }


            eventSource.onerror = (error) => {
                
                eventSource?.close();
            };

            eventSource.addEventListener('NewEditorAddedEvent', handleNewEditorAddedEvent);
            eventSource.addEventListener('EditorRemovedEvent', handleEditorRemovedEvent);

        }
        return () => {
            eventSource?.close();
        };
    }, [currentRoomId]);



    const updateParticipants = (participants: Participant[]) => {
        setParticipants(participants);
    }

    const addParticipant = (participant: Participant) => {
        setParticipants(participants => [...participants, participant]);
    }
    
    const removeParticipant = (participantId: string) => {
        setParticipants(participants => participants.filter(participant => participant.roomParticipantId !== participantId));
    }

    return (
        <ParticipantsContext.Provider value={{ participants, updateParticipants, addParticipant, removeParticipant }} >
            {children}
        </ParticipantsContext.Provider>
    )
}