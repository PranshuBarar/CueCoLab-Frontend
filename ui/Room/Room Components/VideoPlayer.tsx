'use client'
import { Video } from "@/interfaces/types";
import { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from "video.js/dist/types/player";
import 'videojs-contrib-quality-levels';
import qualitySelector from "videojs-hls-quality-selector";
import 'videojs-hls-quality-selector/dist/videojs-hls-quality-selector.css';
import hlsQualitySelector from "videojs-hls-quality-selector";
import { MdDelete, MdDownload } from "react-icons/md";
import UploadToChannelModal from "@/ui/Modals/UploadToChannelModal";
import VideoInfoModal from "@/ui/Modals/VideoInfoModal";
import { usePathname } from "next/navigation";
videojs.registerPlugin("hlsQualitySelector", hlsQualitySelector);


const VideoPlayer: React.FC<Video> = (video: Video) => {
    const videoRef = useRef<HTMLDivElement | null>(null); // This will hold the video DOM element container
    const playerRef = useRef<Player | null>(null);
    const [signedUrl, setSignedUrl] = useState<string>();
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [isUploadToChannelModalOpen, setIsUploadToChannelModalOpen] = useState<boolean>(false);
    const [isVideoInfoModalOpen, setIsVideoInfoModalOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const urlContainsRoomInvites = pathname?.includes('room_invites');




    const handleThumbnailClick = async () => {
        try {
            const response = await fetch(`https://api.cuecolab.com/videos/play/${video.videoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                const responseData = await response.text();
                setSignedUrl(responseData);

            }
        } catch (err) {

        }
    };

    const handlePlayerReady = (player: Player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    const initializePlayer = (url: string) => {
        const options = {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [{
                src: url,
                type: 'application/vnd.apple.mpegurl'
            }],
            plugins: {
                hlsQualitySelector: {
                    displayCurrentQuality: true
                }
            },
        };

        if (!playerRef.current) {
            const videoElement = document.createElement('video-js');
            videoElement.classList.add('vjs-big-play-centered', 'rounded-2xl', 'overflow-hidden');
            videoRef.current?.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                handlePlayerReady(player);
            });

        } else {
            const player = playerRef.current;
            player.src(options.sources);
            player.play();
        }
    };

    useEffect(() => {
        if (signedUrl) {
            initializePlayer(signedUrl);
        }
    }, [signedUrl]);

    useEffect(() => {
        return () => {
            const player = playerRef.current;
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    const shouldShowButtons = signedUrl || video.videoThumbnailS3URI;

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`https://api.cuecolab.com/videos/delete/${video.videoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                const responseData = await response.text();

            }
        } catch (err) {

        }
    }

    const handleDownloadClick = async () => {
        try {
            const response = await fetch(`https://api.cuecolab.com/videos/download/${video.videoId}`, {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                credentials: 'include'
            });
            if (response.ok) {
                const downloadUrl = await response.text();
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = video.videoFileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        } catch (err) {
            console.error("Failed to download the video:", err);
            alert("Error downloading the video. Please try again later.");
        }
    }

    const handleLockToggle = () => {
        setIsLocked(!isLocked);
    }
    const handleUploadToChannelOpen = () => {
        setIsUploadToChannelModalOpen(true);
    }

    const handleUploadToChannelClose = () => {
        setIsUploadToChannelModalOpen(false);
    }

    const handleVideoInfoOpen = () => {
        setIsVideoInfoModalOpen(true);
    }

    const handleVideoInfoClose = () => {
        setIsVideoInfoModalOpen(false);
    }

    return (
        <div id="boxdiv" className="min-w-full rounded-3xl aspect-w-16 aspect-h-9 bg-blue-950 p-2 flex flex-col">
            {
                signedUrl || video.videoThumbnailS3URI
                    ?
                    <>
                        <div ref={videoRef} className="w-full h-full rounded-3xl flex-1">
                            {
                                signedUrl
                                    ? <div ref={videoRef} className="w-full h-full rounded-3xl"></div>
                                    : <div className="w-full h-full object-cover" onClick={handleThumbnailClick}>
                                        <img
                                            src={video.videoThumbnailS3URI}
                                            alt={`Thumbnail for ${video.videoFileName}`}
                                            className="object-cover rounded-2xl w-full h-full cursor-pointer"
                                        />
                                    </div>
                            }
                        </div>
                        {shouldShowButtons && (
                            <div className="button-group flex justify-between mt-2 text-[11px]">
                                <div className="bg-blue-950 rounded-2xl px-5 py-1 border-2 hover:bg-blue-500 hover:text-black">
                                    <MdDownload className="text-white h-5 w-5" onClick={handleDownloadClick} />
                                </div>
                                {!urlContainsRoomInvites &&
                                    <div className="flex space-x-3">
                                        <button className="bg-blue-950 rounded-2xl px-5 py-1 border-2 hover:bg-blue-500 hover:text-black" onClick={handleUploadToChannelOpen}>
                                            Upload To Channel
                                        </button>
                                        <UploadToChannelModal isOpen={isUploadToChannelModalOpen} onClose={handleUploadToChannelClose} videoId={video.videoId} />
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" />
                                            {/* <div className=""> */}
                                                <div
                                                    className="relative w-11 h-6 bg-gray-200 
                                                    peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                                                    
                                                >
                                                </div>
                                            {/* </div> */}
                                            {/* {
                                                isLocked ?
                                                    <div className="text-[8px]">
                                                        Unlock
                                                        <span
                                                            className="lockunlockspan absolute bottom-full mb-2 hidden text-[9px] text-white bg-gray-700 rounded-2xl p-2"
                                                        >
                                                            {
                                                                <>
                                                                    <p>Video will get unlocked!</p>
                                                                    <br />
                                                                    <p>Everybody will be able to delete the video</p>
                                                                </>


                                                            }
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="text-[8px]">
                                                        Lock
                                                    </div>
                                            }
 */}

                                        </label>
                                    </div>
                                }
                                <button
                                    className="bg-blue-950 rounded-2xl px-5 py-1 border-2 hover:bg-blue-500 hover:text-black"
                                    onClick={handleVideoInfoOpen}
                                >
                                    Info
                                </button>

                                <VideoInfoModal isOpen={isVideoInfoModalOpen} onClose={handleVideoInfoClose} videoId={video.videoId} />

                                {

                                    <button
                                        className="uploadedby relative bg-blue-950 rounded-2xl px-5 py-1 border-2 hover:bg-blue-500 hover:text-black flex justify-center"
                                    >
                                        Uploaded By
                                        <span
                                            className="uploadedbyspan absolute bottom-full mb-2 hidden text-[9px] text-white bg-gray-700 rounded-2xl p-2"
                                        >
                                            {
                                                video.uploadedBy
                                            }
                                        </span>
                                    </button>
                                }


                                <div className="bg-blue-950 rounded-2xl px-2 py-1 border-2 hover:bg-blue-500 hover:text-black">
                                    <MdDelete className="text-white h-5 w-5" onClick={handleDeleteClick} />
                                </div>

                            </div>
                        )}
                    </>
                    :
                    <div className="flex items-center justify-center text-white text-center w-full h-full bg-blue-950">
                        {
                            video.uploadProgress < 100 ? (
                                <div className="relative flex items-center w-full h-5 bg-black rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-black bg-white transition-all duration-300"
                                        style={{ width: `${video.uploadProgress}%` }}>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center text-white transition-all duration-300"
                                        style={{ width: `${100 - video.uploadProgress}%` }}>
                                    </div>
                                </div>
                            ) : (
                                <div className="processing-animation text-white text-center">
                                    Processing
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default VideoPlayer;