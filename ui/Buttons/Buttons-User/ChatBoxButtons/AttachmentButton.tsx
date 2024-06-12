function AttachmentButton() {
    return (
        <button className="group w-8 h-8 rounded-2xl transition duration-700 hover-transform hover:scale-150 mx-2.5">
            <svg className="h-8 w-8 fill-current group-hover:text-white text-blue-950" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M330-240q-104 0-177-73T80-490q0-104 73-177t177-73h370q75 0 127.5 52.5T880-560q0 75-52.5 127.5T700-380H350q-46 0-78-32t-32-78q0-46 32-78t78-32h370v80H350q-13 0-21.5 8.5T320-490q0 13 8.5 21.5T350-460h350q42-1 71-29.5t29-70.5q0-42-29-71t-71-29H330q-71-1-120.5 49T160-490q0 70 49.5 119T330-320h390v80H330Z" /></svg>
        </button>
    )
}

export default AttachmentButton;