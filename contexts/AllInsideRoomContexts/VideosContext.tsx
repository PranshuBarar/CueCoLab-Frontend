'use client'
import { Video, VideosContextType } from "@/interfaces/types"
import React, { createContext, useContext, useState, useEffect, ReactNode, Children } from 'react';
import { useCurrentRoomId } from "./CurrentRoomIdContext";

const VideosContext = createContext<VideosContextType | undefined>(undefined);

export const useVideos = (): VideosContextType => {
    const context = useContext(VideosContext) as VideosContextType;
    if (!context) {
        throw new Error(`useVideos must be used within VideosProvider `);
    }
    return context;
}


export const VideosProvider = ({ children }: { children: ReactNode }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const { currentRoomId } = useCurrentRoomId();


    useEffect(() => {
        let eventSource: EventSource;
        if (currentRoomId) {
            eventSource = new EventSource(`https://api.cuecolab.com/subscribe/room_level_events/${currentRoomId}`, { withCredentials: true });


            const handleVideoListUpdateEvent = async (event: MessageEvent) => {
                const newVideo = JSON.parse(event.data);
                await addNewVideo(newVideo);
            }

            const handleVideoDeleteEvent = async (event: MessageEvent) => {
                const videoIdToBeRemoved = JSON.parse(event.data);
                
                removeVideo(videoIdToBeRemoved);

            }

            const handleVideoUnlockedEvent = async (event: MessageEvent) => {
                const videoIdToUnlock = JSON.parse(event.data);
                
                videoUnlock(videoIdToUnlock);
            }

            const handleVideoLockedEvent = async (event: MessageEvent) => {
                const videoIdToBeLocked = JSON.parse(event.data);
                
                videoLock(videoIdToBeLocked);
            }


            eventSource.onerror = (error) => {
                
                eventSource?.close();
            };

            eventSource.addEventListener('VideoListUpdateEvent', handleVideoListUpdateEvent);
            eventSource.addEventListener('VideoDeleteEvent', handleVideoDeleteEvent);
            eventSource.addEventListener('VideoLockedEvent', handleVideoLockedEvent);
            eventSource.addEventListener('VideoUnlockedEvent', handleVideoUnlockedEvent);
        }
        return () => {
            eventSource?.close();
        };
    }, [currentRoomId]);

    const videoUnlock = (videoId: string): void => {
        setVideos(prevVideos => {
            const videoIndex = prevVideos.findIndex(video => video.videoId === videoId) as number;
            //Make a copy of previous videos' list
            const updateVideos = [...prevVideos] as Video[];
            updateVideos[videoIndex] = { ...prevVideos[videoIndex], isLocked: false } as Video;
            return updateVideos as Video[];
        })
    }

    const videoLock = (videoId: string): void => {
        setVideos(prevVideos => {
            const videoIndex = prevVideos.findIndex(video => video.videoId === videoId) as number;
            //Make a copy of previous videos' list
            const updateVideos = [...prevVideos] as Video[];
            updateVideos[videoIndex] = { ...prevVideos[videoIndex], isLocked: true } as Video;
            return updateVideos as Video[];
        })
    }

    const updateVideos = (videos: Video[]): void => {
        setVideos(videos);
    }

    const addNewVideo = async (newVideo: Video) => {
        setVideos(prevVideos => {
            const videoIndex = prevVideos.findIndex(video => video.videoId === newVideo.videoId) as number;
            if (videoIndex > -1) {
                //Make a copy of previous videos' list
                const updatedVideos = [...prevVideos] as Video[];
                updatedVideos[videoIndex] = { ...prevVideos[videoIndex], ...newVideo } as Video;
                return updatedVideos as Video[];
            } else {
                return [...prevVideos, newVideo];
            }
        })
    }

    const removeVideo = (videoId: string): void => {
        setVideos(videos => videos.filter(video => video.videoId !== videoId));
    }

    const updateVideoStatus = (videoId: string) => {
        setVideos(videos => {
            const videoIndex = videos.findIndex(video => video.videoId === videoId) as number;
            const updatedVideos = [...videos] as Video[];
            updatedVideos[videoIndex] = { ...videos[videoIndex], uploadStatus: 'Completed' } as Video;
            return updatedVideos as Video[];
        })
    }

    const updateVideoProgress = (videoId: String, uploadPercent: number) => {
        setVideos(videos => {
            const videoIndex = videos.findIndex(video => video.videoId === videoId) as number;
            const updatedVideos = [...videos] as Video[];
            updatedVideos[videoIndex] = { ...videos[videoIndex], uploadProgress: uploadPercent } as Video;
            return updatedVideos as Video[];
        })
    }

    return (
        <VideosContext.Provider value={{ videos, updateVideos, removeVideo, updateVideoStatus, updateVideoProgress }}>
            {children}
        </VideosContext.Provider>
    )
}

