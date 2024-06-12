function ChatSendButton(){
    return (
        <button className="group w-8 h-8 rounded-2xl transition duration-700 hover-transform hover:scale-150 mx-2.5" >
            <svg className="h-8 w-8 fill-current group-hover:text-white text-blue-950" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
        </button>
    )
}

export default ChatSendButton;