'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { RoomSummaryDTO, RoomSummaryContextType } from '@/interfaces/types';

const RoomSummaryContext = createContext<RoomSummaryContextType | undefined>(undefined);
export const useRoomSummaryList = (): RoomSummaryContextType => {
    const context = useContext(RoomSummaryContext) as RoomSummaryContextType;
    if (!context) {
        throw new Error('useRoomSummaryList must be used within a RoomSummaryProvider');
    }
    return context;
}
export const RoomSummaryProvider = ({ children }: { children: ReactNode }) => {
    const [roomSummaryDTOList, setRoomSummaryDTOList] = useState<RoomSummaryDTO[]>([]);

    const updateRoomSummaryDTOListOnUserVisit = async () => {
        try {
            const response = await fetch('https://api.cuecolab.com/user/userdata', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const responseData = await response.text();
                const userData = JSON.parse(responseData);
                const roomSummaryDTOList = userData.roomSummaryDTOList;
                setRoomSummaryDTOList(roomSummaryDTOList);
            }
        } catch (err) {
            
        }
    }
    const removeRoomSummary = (roomId: string) => {
        setRoomSummaryDTOList(roomSummaryDTOList => roomSummaryDTOList.filter(roomSummaryDTO => roomSummaryDTO.roomId !== roomId));
    }
    const addNewRoomSummary = (newRoomSummaryDTO: RoomSummaryDTO) => {
        setRoomSummaryDTOList([...roomSummaryDTOList, newRoomSummaryDTO]);
    }
    useEffect(() => {
        updateRoomSummaryDTOListOnUserVisit();
    }, []);

    return (
        <RoomSummaryContext.Provider value={{ roomSummaryDTOList, addNewRoomSummary, removeRoomSummary }}>
            {children}
        </RoomSummaryContext.Provider>
    );
}














// 'use client'
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { RoomSummaryDTO, RoomSummaryContextType } from '@/interfaces/types';

// // Creating a context with a default undefined value. This is because at the time of creation,
// // we don't yet have a specific value to give it. It's a placeholder until we provide actual values
// // via the Provider component below.
// const RoomSummaryContext = createContext<RoomSummaryContextType | undefined>(undefined);

// // A custom hook that allows any component that calls it to access the context's value.
// export const useRoomSummaryList = (): RoomSummaryContextType => {
//     const context = useContext(RoomSummaryContext) as RoomSummaryContextType;
//     if (!context) {
//         throw new Error('useRoomSummaryList must be used within a RoomSummaryProvider');
//     }
//     return context;
// }

// //NOW ACTUALLY THIS IS THE CORE OF THIS ROOMSUMMARYCONTEXT
// export const RoomSummaryProvider = ({ children }: { children: ReactNode }) => {
//     //Before moving further and doing ANYTHING else, first we will create a variable named roomSummaryDTOList which
//     //will contain the present state of the roomSummaryDTOList. We will use useState hook to update this variable in future
//     const [roomSummaryDTOList, setRoomSummaryDTOList] = useState<RoomSummaryDTO[]>([]);

//     //A function that reads userData from session storage, parses that data, extracts the roomSummaryDTOList from that data
//     //and updates the roomSummaryDTOList state which is initialized above using useState();
//     const updateRoomSummaryDTOListFromStorage = () => {
//         const storedUserData = sessionStorage.getItem('userData');
//         if (storedUserData) {
//             const roomSummaryDTOListFromStorage = JSON.parse(storedUserData).roomSummaryDTOList;
//             setRoomSummaryDTOList(roomSummaryDTOListFromStorage);
//         }
//     };

//     const removeRoomSummary = (roomId: string) => {
//         setRoomSummaryDTOList(roomSummaryDTOList => roomSummaryDTOList.filter(roomSummaryDTO => roomSummaryDTO.roomId !== roomId));
//         const storedUserData = sessionStorage.getItem('userData');
//         if(storedUserData) {
//             const storedUserDataJSON = JSON.parse(storedUserData);
//             storedUserDataJSON.roomSummaryDTOList = storedUserDataJSON.roomSummaryDTOList.filter((roomSummaryDTO: RoomSummaryDTO) => roomSummaryDTO.roomId !== roomId);
//             sessionStorage.setItem('userData', JSON.stringify(storedUserDataJSON));
//         }
//     }

//     //Now we are going to have a function which will actually update the roomSummaryDTOList at both the places, 1- in storage 
//     //2- here in context also
//     const addNewRoomSummary = (newRoomSummaryDTO: RoomSummaryDTO) => {
//         //First we will retrieve the present data from session storage
//         const storedUserData = sessionStorage.getItem('userData');


//         //Now if storedUserData is not empty we will parse it to get json object of it and then we will update the roomSummaryDTOList
//         //by adding newRoomSummaryDTO to that list and putting that list back again in the storedUserDataJSON
//         if (storedUserData) {

//             //We will parse the storedUserData to get the JSON Object of the userData
//             const storedUserDataJSON = JSON.parse(storedUserData);

//             //Now we will reference the roomSummaryDTOList present in the storedUserDataJSON and will update it by adding 
//             //newRoomSummaryDTO to that list
//             storedUserDataJSON.roomSummaryDTOList = [...storedUserDataJSON.roomSummaryDTOList, newRoomSummaryDTO];

//             //Now again we will stringify the storedUserDataJSON back
//             const updatedStoredUserDataString = JSON.stringify(storedUserDataJSON);

//             //Now we will do two things, 1- save this update in session storage 2- update the roomSummaryDTOList state in this context

//             //Implementing 1:
//             sessionStorage.setItem('userData', updatedStoredUserDataString);

//             //Implementing 2:
//             setRoomSummaryDTOList(storedUserDataJSON.roomSummaryDTOList);
//             //(here above actually we are not doing anything specific, since we already have the reference to that updated list above, hence we are just updating the state of roomSummaryDTOList using that reference only)
//         }
//     }


//     //We already know that code inside useEffect() hook runs when the component is completely rendered and attached to the DOM
//     useEffect(() => {
//         //This is nothing just an initial update of the state of the roomSummaryDTOList. This will do nothing but just fetch the data from the session storage
//         //for the first time when the component is rendered and will update the state of the roomSummaryDTOList with that data, you can visit this function to
//         //see how it works
//         updateRoomSummaryDTOListFromStorage();


//         //Now actually this function will be called when there is any event happening in the storage. Be it create, delete, update, etc. or anything for that matter
//         //This function takes that storage event and checks that whether the key of that event is 'userData'. Because if the key is 'userData' it means the change 
//         //has been done in that userData object only. If the key is indeed 'userData' it will again run that same function which it was running first time after 
//         //the component got rendered and mounted: "updateRoomSummaryDTOListFromStorage()"
//         const handleStorageChange = (event: StorageEvent) => {
//             if (event.key === 'userData') {
//                 updateRoomSummaryDTOListFromStorage();
//             }
//         };

//         //Now we will add an event listener to the window which will call that just above handleStorageChange() function if the event is 'storage'
//         window.addEventListener('storage', handleStorageChange);

//         //What is this doing? I am unable to understand. And why is it doing so?
//         return () => window.removeEventListener('storage', handleStorageChange);
//     }, []);

//     return (
//         <RoomSummaryContext.Provider value={{ roomSummaryDTOList, addNewRoomSummary, removeRoomSummary }}>
//             {children}
//         </RoomSummaryContext.Provider>
//     );
// }