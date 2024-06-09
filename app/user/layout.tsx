'use client'
import React, { useEffect } from "react";
import SideNavNew from "../../ui/SideNavNew";
import SideNav from "../../ui/SideNav";
import MyAccount from "../../ui/Buttons/Buttons-User/MyAccount";
import Upgrade from "../../ui/Buttons/Buttons-User/Upgrade";
import { UserAccountDetailsProvider } from "@/contexts/UserAccountDetailsContext";
import { RoomSummaryProvider } from "@/contexts/RoomSummaryContext";
import { ParticipantsProvider } from "@/contexts/AllInsideRoomContexts/ParticipantsContext";
import { CurrentRoomIdProvider } from "@/contexts/AllInsideRoomContexts/CurrentRoomIdContext";
import { RoomInvitesProvider } from "@/contexts/RoomInvitesContext";
import { VideosProvider } from "@/contexts/AllInsideRoomContexts/VideosContext";
import { DestinationProvider } from "@/contexts/DestinationContext";

function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <UserAccountDetailsProvider>
      <RoomInvitesProvider>
        <RoomSummaryProvider>
          <CurrentRoomIdProvider>
            <DestinationProvider>
              <ParticipantsProvider>
                <VideosProvider>
                  <div className="flex flex-row h-screen w-full bg-blue-400 fixed">
                    <div className=" flex flex-col w-full md:w-1/6 rounded-2xl">
                      <SideNavNew />
                    </div>
                    <div className="flex flex-col w-full h-full rounded-2xl mt-1">
                      <div className="flex flex-row relative mx-1 justify-between ">
                        <div className="flex flex-row justify-center w-full ">
                          <Upgrade />
                        </div>
                        <div className="absolute right-1.5 ">
                          {/* <MyAccount /> */}
                        </div>
                      </div>
                      <div className=" h-full rounded-2xl p-1 mr-1 mb-1">
                        {children}
                      </div>
                    </div>
                  </div>
                </VideosProvider>
              </ParticipantsProvider>
            </DestinationProvider>
          </CurrentRoomIdProvider>
        </RoomSummaryProvider>
      </RoomInvitesProvider>
    </UserAccountDetailsProvider>
  );
}

export default Layout;