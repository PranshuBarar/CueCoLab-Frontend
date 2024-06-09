'use client'
import { Destination, DestinationContextType } from "@/interfaces/types";
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';


const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

export const useDestination = (): DestinationContextType => {
    const context = useContext(DestinationContext) as DestinationContextType;
    if (!context) {
        throw new Error('"useDestination" hook must be used within a DestinationProvider');
    }
    return context;
}

export const DestinationProvider = ({ children }: { children: ReactNode }) => {
    const [destinationList, setDestinationList] = useState<Destination[]>([]);

    const updateDestinationListOnUserVisit = async () => {
        try {
            const response = await fetch('https://api.cuecolab.com/user/destinations', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                const responseData = await response.json();
                const destinationList = responseData;
                setDestinationList(destinationList);
            }

        } catch (err) {
            
        }
    }

    const addDestination = (destination: Destination) => {
        setDestinationList([...destinationList, destination]);
    }

    const removeDestination = (destinationId: string) => {
        setDestinationList(destinationList => destinationList.filter(destination => destination.destinationId !== destinationId));
    }

    useEffect(() => {
        updateDestinationListOnUserVisit();
    },[]);

    return (
        <DestinationContext.Provider value={{destinationList, addDestination, removeDestination}}>
            {children}
        </DestinationContext.Provider>
    )
}