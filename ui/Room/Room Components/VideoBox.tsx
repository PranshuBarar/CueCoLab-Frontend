import { useVideos } from "@/contexts/AllInsideRoomContexts/VideosContext";
import UploadVideo from "@/ui/Buttons/Buttons-User/RoomButtons/UploadVideo";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useState } from "react";
import '../../global.css';



function VideoBox(){

    const [listMaxHeight, setListMaxHeight] = useState(0);
    const [listMinHeight, setListMinHeight] = useState(0);

    useEffect(() => {
        const calculateMaxHeight = () => {
            const fixedFooterHeight = document.getElementById(`conte`)?.clientHeight || 0;
            const totalHeightOfContd = window.innerHeight;
            const scrollableHeight = totalHeightOfContd - fixedFooterHeight - 60;
            setListMaxHeight(scrollableHeight);
            setListMinHeight(scrollableHeight);
        }
        calculateMaxHeight();
        window.addEventListener('resize', calculateMaxHeight);
        return () => window.removeEventListener('resize', calculateMaxHeight);
    });

    const { videos } = useVideos();

    return (
        <div id="contc" className="flex text-[12px] flex-col m-1 h-full mr-0.5 mb-0.5 rounded-3xl space-y-2 items-center" style={{maxHeight: listMaxHeight}}>
            <div id="contd" className="thinner-scrollbar flex flex-col text-[12px] flex-grow overflow-y-auto overflow-hidden bg-blue-900 space-y-7 items-center rounded-3xl p-2 w-full h-full text-white">
                {videos.map(video => (
                    <div id="thisdiv" key={video.videoId} className="flex flex-col items-center min-w-full aspect-w-16 aspect-h-9 rounded-3xl p-2">
                        <h3 className="text-[12px] font-bold text-center overflow-ellipsis max-w-[30ch] whitespace-nowrap overflow-hidden">
                            {video.videoFileName}
                        </h3>
                        <VideoPlayer {...video} />
                    </div>
                ))}
            </div>
            <div id="conte" className="">
                <UploadVideo />
            </div>
        </div>
    )
}

export default VideoBox;