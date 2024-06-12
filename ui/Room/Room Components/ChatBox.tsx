import AttachmentButton from "@/ui/Buttons/Buttons-User/ChatBoxButtons/AttachmentButton";
import ChatSendButton from "@/ui/Buttons/Buttons-User/ChatBoxButtons/ChatSendButton";
import VideoCallButton from "@/ui/Buttons/Buttons-User/ChatBoxButtons/VideoCallButton";
import "@/ui/Room/Room Components/customroomstyle.css";
import LogoutButton from "@/ui/Buttons/Buttons-User/SideNavButtons/LogoutButton";

function ChatBox() {
    return (
        <div className="flex flex-col  h-full m-1 mb-0 ml-0.5 rounded-2xl items-center relative bg-sky-700">
            <div className="h-full w-full flex flex-row rounded-2xl">
                <div id="thisone" className="flex flex-col items-center bg-sky-900 w-[30%] rounded-2xl">
                    <div className="bg-blue-950 rounded-2xl w-[50%] text-center text-[12px] text-white py-0.5 mt-1">
                        Chats
                    </div>
                    <div className=" h-full w-full rounded-2xl flex flex-col relative">
                        
                    </div>
                    <div className="mb-1 mt-1 ">
                        
                        {/* </CreateChatButton > */}
                    </div>
                </div>
                <div className="bg-sky-700 w-full flex flex-col rounded-r-2xl relative ">
                    <div id="chatbox" className="flex flex-col bg-blue-400 m-2 p-2 rounded-2xl overflow-y-auto  max-h-[calc(100%-8.5rem)]">
                        
                        
                        
                    </div>
                    <div id="textarea&icons" className="flex flex-col bottom-0 w-full right-0 absolute rounded-2xl ">
                        <div className="flex flex-row  relative mx-2 bg-blue-500 rounded-2xl mb-1.5">
                            <VideoCallButton />
                            <div className=" flex flex-row items-center justify-center absolute h-full right-0">
                                <AttachmentButton />
                                <ChatSendButton />
                            </div>

                        </div>
                        <div className="flex rounded-3xl overflow-hidden ">
                            <textarea className="mr-1 ml-1 mb-1 w-full h-full resize-none rounded-2xl p-2"></textarea>
                        </div>
                    </div>
                </div>


            </div>



        </div >
    )
}

export default ChatBox;