'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserAccountDetails, UserAccountDetailsContextType } from '@/interfaces/types';

const UserAccountDetailsContext = createContext<UserAccountDetailsContextType | undefined>(undefined);

export const useUserAccountDetails = (): UserAccountDetailsContextType => {
    const context = useContext(UserAccountDetailsContext) as UserAccountDetailsContextType;
    if (!context) {
        throw new Error('"useUserAccountDetails" hook must be used within a userAccountDetailsProvider');
    }
    return context;
}

export const UserAccountDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [userAccountDetails, setUserAccountDetails] = useState<UserAccountDetails>({
        email: "Not available",
        socialLogin: "Not available",
        isPro: false,
        storageUsed: 0,
        maxStorage: 0,
        userId: "",
        destination: "No Integration"
    });

    const updateUserAccountDetailsOnUserVisit = async () => {
        try {
            const response = await fetch('https://api.cuecolab.com/user/userdata', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                const responseData = await response.text();
                const userData = JSON.parse(responseData);
                const userAccountDetails = userData.userAccountDetailsResponseDTO;
                setUserAccountDetails(userAccountDetails);
            }
        } catch (err) {
            
        }
    }


    useEffect(() => {
        updateUserAccountDetailsOnUserVisit();
    }, [])

    useEffect(()=> {
        let eventSource: EventSource;
        eventSource = new EventSource(`https://api.cuecolab.com/subscribe/user_account_level_events`, { withCredentials: true });

        const handleStorageUpdateEvent = (event: MessageEvent) => {
            const newStorage = JSON.parse(event.data);
            setUserAccountDetails({
                ...userAccountDetails,
                storageUsed: newStorage
            });
        }

        eventSource.onerror = (error) => {
            
            eventSource?.close();
        };

        eventSource.addEventListener('StorageUpdateEvent', handleStorageUpdateEvent);
        return () => {
            eventSource?.close();
        };

    })

    return (
        <UserAccountDetailsContext.Provider value={{ userAccountDetails }}>
            {children}
        </UserAccountDetailsContext.Provider>
    )
}
