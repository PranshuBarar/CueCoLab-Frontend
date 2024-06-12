'use client'
import { CurrentRoomIdContextType } from '@/interfaces/types';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const CurrentRoomIdContext = createContext<CurrentRoomIdContextType | undefined>(undefined);

export const useCurrentRoomId = (): CurrentRoomIdContextType => {
    const context = useContext(CurrentRoomIdContext) as CurrentRoomIdContextType;
    if(!context){
        throw new Error('useCurrentRoomId must be used within a CurrentRoomIdProvider');
    }
    return context;
}

export const CurrentRoomIdProvider = ( {children}: {children: ReactNode}) => {
    const [currentRoomId, setCurrentRoomId] = useState<string>('');
    const updateCurrentRoomId = (roomId: string) => {
        setCurrentRoomId(roomId);
    }

    return (
        <CurrentRoomIdContext.Provider value={{currentRoomId, setCurrentRoomId}}>
            {children}
        </CurrentRoomIdContext.Provider>
    )
}

