import UploadVideoModal from "@/ui/Modals/UploadVideoModal";
import { useState } from "react";

function Upload() {

    return (
        <>
            <button
                type="submit"
                className="bg-blue-950 rounded-3xl p-1 text-white text-[12px] hover:scale-110 transition-transform duration-700 px-7"
            >
                Upload Video
            </button>
        </>

    )
}

export default Upload;