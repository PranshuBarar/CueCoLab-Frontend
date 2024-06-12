'use client'
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useRoomSummaryList } from "@/contexts/RoomSummaryContext";
import { RoomSummaryDTO } from "@/interfaces/types";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody
} from "@material-tailwind/react";
import {
    ChevronRightIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline";
import Dashboard from "./Buttons/Buttons-User/SideNavButtons/DashboardButton";
import CreateRoom from "./Buttons/Buttons-User/SideNavButtons/CreateRoomButton";
import Invites from "./Buttons/Buttons-User/SideNavButtons/RoomInvitesButton";
import LogoutButton from "./Buttons/Buttons-User/SideNavButtons/LogoutButton";
import { MdDelete } from "react-icons/md";
import RoomInvitesButton from "./Buttons/Buttons-User/SideNavButtons/RoomInvitesButton";

export default function SideNavNew() {
    const [open, setOpen] = useState(0);
    const [listMaxHeight, setListMaxHeight] = useState(0);
    const router = useRouter();
    const { roomSummaryDTOList, removeRoomSummary } = useRoomSummaryList();
    const handleClick = (roomId: string) => {
        router.push(`/user/rooms/${roomId}`);
    }
    const pathname = usePathname();

    useEffect(() => {
        // Recalculate the list max height on component mount and window resize
        const calculateHeight = () => {
            const fixedFooterHeight = document.getElementById('fixedFooters')?.clientHeight || 0;
            const fixedHeaderHeight = document.getElementById('fixedHeaders')?.clientHeight || 0;
            const fixedRoomButtonHeight = document.getElementById('fixedRoomButton')?.clientHeight || 0;
            const totalHeightOfSideNavNew = window.innerHeight;
            const scrollableHeight = totalHeightOfSideNavNew - (fixedFooterHeight + fixedHeaderHeight + fixedRoomButtonHeight) - 32;
            setListMaxHeight(scrollableHeight);
        };

        calculateHeight(); // Call once to set initial height
        window.addEventListener('resize', calculateHeight); // Update on resize

        return () => window.removeEventListener('resize', calculateHeight); // Clean up
    }, [open]);

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    const handleDeleteClick = async (roomId: string) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')

        try {
            
            const response = await fetch(`https://api.cuecolab.com/rooms/delete_room/${roomId}`, {
                method: 'DELETE',
                headers: headers,
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.text();
                removeRoomSummary(roomId);
            }
        } catch (error) {

        }

        const urlContainsThisRoomId = pathname?.includes(roomId);
        if (urlContainsThisRoomId) {
            router.push('/user');
        }


    }
    return (
        <Card
            onChange={() => { }}
            onTransitionEndCapture={() => { }}
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }} className="w-full h-full max-w-[20rem] p-0 shadow-xl bg-blue-950 flex flex-col m-1">
            <div id="fixedHeaders" className="flex flex-col">
                <div className="mb-0.5 mt-1 flex items-center gap-4 p-1 justify-center">
                    <img src="/logo.svg" alt="brand" className="h-[90%] w-[90%]" />
                </div>
                <Dashboard />
                <hr className="my-2 border-blue-gray-50" />
            </div>
            <div className="flex flex-col flex-grow">
                <List
                    onChange={() => { }}
                    onTransitionEndCapture={() => { }}
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}>
                    <Accordion
                        onChange={() => { }}
                        onTransitionEndCapture={() => { }}
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto ml-1 h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <div id="fixedRoomButton" className="">
                            <ListItem
                                onChange={() => { }}
                                onTransitionEndCapture={() => { }}
                                placeholder=""
                                onPointerEnterCapture={() => { }}
                                onPointerLeaveCapture={() => { }} className="p-0" selected={open === 1}>
                                <AccordionHeader
                                    onChange={() => { }}
                                    onTransitionEndCapture={() => { }}
                                    placeholder=""
                                    onPointerEnterCapture={() => { }}
                                    onPointerLeaveCapture={() => { }} onClick={() => handleOpen(1)} className="border-b-0 p-1 bg-gray-400 rounded-2xl text-[12px] items-center justify-center">
                                    <Typography
                                        onChange={() => { }}
                                        onTransitionEndCapture={() => { }}
                                        placeholder=""
                                        onPointerEnterCapture={() => { }}
                                        onPointerLeaveCapture={() => { }} color="black" className="font-normal">
                                        Rooms
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                        </div>
                        <div id="listDiv" style={{ maxHeight: listMaxHeight }} className={`overflow-y-auto bg-blue-800 flex-grow rounded-3xl m-1 verflow-auto thinner-scrollbar rounded-lg transition-opacity duration-700 ease-in-out ${open === 1 ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
                            <AccordionBody className="p-0 flex flex-col">
                                <List
                                    onChange={() => { }}
                                    onTransitionEndCapture={() => { }}
                                    placeholder=""
                                    onPointerEnterCapture={() => { }}
                                    onPointerLeaveCapture={() => { }}>
                                    {
                                        roomSummaryDTOList.map((roomSummarDTO: RoomSummaryDTO) => (
                                            <div className="flex flex-row items-center" key={roomSummarDTO.roomId}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleClick(roomSummarDTO.roomId)}
                                                    className="flex flex-row flex-grow bg-blue-950 text-white rounded-3xl items-center  px-2 py-1 text-black text-[12px] hover:bg-blue-600 justify-center m-0.5"
                                                    key={roomSummarDTO.roomId}
                                                >
                                                    {roomSummarDTO.roomName}
                                                </button>
                                                <div>
                                                    <MdDelete key={roomSummarDTO.roomId} className="text-white" onClick={() => handleDeleteClick(roomSummarDTO.roomId)} />
                                                </div>
                                            </div>

                                        ))
                                    }
                                </List>
                            </AccordionBody>
                        </div>

                    </Accordion>
                </List>
            </div>
            <div id='fixedFooters' className="sticky bottom-0">
                <hr className="border-blue-gray-50" />
                <List
                    onChange={() => { }}
                    onTransitionEndCapture={() => { }}
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }} className="">
                    <ListItem
                        onChange={() => { }}
                        onTransitionEndCapture={() => { }}
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }} className="flex flex-col p-0.5">
                        <CreateRoom />
                    </ListItem>
                    <ListItem
                        onChange={() => { }}
                        onTransitionEndCapture={() => { }}
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }} className="flex flex-col p-0.5">
                        <RoomInvitesButton />
                    </ListItem>
                    <ListItem
                        onChange={() => { }}
                        onTransitionEndCapture={() => { }}
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }} className="flex flex-col p-0.5">
                        <LogoutButton />
                    </ListItem>
                </List>
            </div>
        </Card>
    );
}
