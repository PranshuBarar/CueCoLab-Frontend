'use client'
import { useParticipants } from "@/contexts/AllInsideRoomContexts/ParticipantsContext";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {
    List,
    Typography,
    Accordion,
    AccordionHeader,
    AccordionBody
} from "@material-tailwind/react";
import { Participant } from "@/interfaces/types";
import AddEditor from "@/ui/Room/Room Components/AddEditor";
import { useUserAccountDetails } from "@/contexts/UserAccountDetailsContext";
import { useRouter } from "next/router";
import { useParams, usePathname } from "next/navigation";

function Editors() {
    const [open, setOpen] = useState(0);
    const { participants, removeParticipant } = useParticipants();
    const pathname = usePathname();
    const urlContainsRoomInvites = pathname?.includes('room_invites');



    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    }

    const deleteRequestToBackend = async (roomParticipantId: string) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch(`https://api.cuecolab.com/rooms/delete_participant/${roomParticipantId}`, {
                method: 'DELETE',
                headers: headers,
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.text();
                removeParticipant(roomParticipantId);

            }
        } catch (error) {
            alert(error);
        }
    }

    const handleDeleteClick = (roomParticipantId: string) => {
        deleteRequestToBackend(roomParticipantId);
    }

    return (
        <div className="relative">
            <Accordion
                onChange={() => { }}
                onTransitionEndCapture={() => { }}
                placeholder=""
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
                open={open === 1}
                icon={
                    <img src="/dropdowniconblue.svg" alt="Dropdown" className={`h-4 w-4 text-blue-950 transition-transform ${open === 1 ? 'rotate-90' : ''}`} />
                }
                className=""
            >
                <div className="">
                    <AccordionHeader
                        onChange={() => { }}
                        onTransitionEndCapture={() => { }}
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }} onClick={() => handleOpen(1)} className="z-10 p-0.5 px-2 bg-blue-700 rounded-2xl text-[12px] items-center justify-center">
                        <Typography
                            onChange={() => { }}
                            onTransitionEndCapture={() => { }}
                            placeholder=""
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }} color="white" className="text-[12px] p-1">
                            Editors
                        </Typography>
                    </AccordionHeader>
                </div>

                <div className={`overflow-y-auto thinner-scrollbar absolute transition-opacity duration-700 ease-in-out ${open === 1 ? 'opacity-100' : 'opacity-0'} overflow-hidden bg-blue-950 rounded-3xl`} style={{ maxHeight: 300, }}>
                    <AccordionBody className=" justify-center items-center ">
                        <div className="flex flex-col items-center">
                            <List
                                onChange={() => { }}
                                onTransitionEndCapture={() => { }}
                                placeholder=""
                                onPointerEnterCapture={() => { }}
                                onPointerLeaveCapture={() => { }}>
                                {
                                    participants.map((participant: Participant) => (
                                        <div key={participant.roomParticipantId} className="text-white items-center space-x-2 flex flex-row rounded-3xl text-[11px] bg-blue-700 px-4 py-1">
                                            <div className="flex-grow">
                                                {participant.roomParticipantEmail}
                                            </div>
                                            {
                                                //If url does not contain 'room_invites' then only this delete button will 
                                                //be available
                                                !urlContainsRoomInvites && (
                                                    <div>
                                                        <MdDelete onClick={() => handleDeleteClick(participant.roomParticipantId)} />
                                                    </div>
                                                )

                                            }

                                        </div>
                                    ))
                                }
                            </List>
                            <div>
                                {
                                    //If url does not contain 'room_invites' then only this delete button will 
                                    //be available
                                    !urlContainsRoomInvites && (
                                        <AddEditor />
                                    )
                                }

                            </div>
                        </div>

                    </AccordionBody>
                </div>
            </Accordion>
        </div>
    )
}

export default Editors; 