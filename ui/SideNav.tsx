
import Dashboard from "@/ui/Buttons/Buttons-User/SideNavButtons/DashboardButton";
import Invites from "@/ui/Buttons/Buttons-User/SideNavButtons/RoomInvitesButton";
import LogoutButton from "@/ui/Buttons/Buttons-User/SideNavButtons/LogoutButton";
import Rooms from "@/ui/Buttons/Buttons-User/SideNavButtons/RoomsButton";
import CreateRoom from "./Buttons/Buttons-User/SideNavButtons/CreateRoomButton";


function SideNav() {
    return (
        <div className="flex flex-col bg-blue-950 w-auto m-1 rounded-2xl h-full">
            <div>
                <img src="/logo.svg" alt="Logo Image" className="px-11 pt-5 pb-1" />
            </div>
            <div className="rounded-2xl mx-2 my-0.25 text-center text-[15px] bg-indigo-400">
                Workplace
            </div>
            <div className="my-1 mx-0.5 flex flex-col">
                <Dashboard />
            </div>
            <div className="mb-1 flex-grow overflow-auto mx-0.5 flex flex-col">
                <Rooms />
            </div>
            <div id='sideNavFooter' className="flex flex-col w-full mt-2">
                <div className="mb-1 mx-0.5 flex flex-col">
                    <CreateRoom />
                </div>
                <div className="mb-1 mx-0.5 flex flex-col">
                    <Invites />
                </div>
                <div className="mb-1 mx-0.5 flex flex-col">
                    <LogoutButton />
                </div>
            </div>

        </div>
    );
}

export default SideNav;

