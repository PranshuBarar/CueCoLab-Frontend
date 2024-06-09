export interface UserAccountDetails {
    userId: string;
    email?: string;
    socialLogin?: string;
    isPro?: boolean;
    storageUsed?: number;
    maxStorage?: number;
    destination: string
}

export interface UserAccountDetailsContextType {
    userAccountDetails: UserAccountDetails;
}

export interface EmailContextType {
    emailString: string;
    setEmailString: (emailString: string) => void;
}

export interface RoomSummaryDTO {
    roomId: string;
    roomName: string;
}

export interface RoomSummaryContextType {

    //List of room summaries (basically room summary DTOs)
    roomSummaryDTOList: RoomSummaryDTO[];

    //Now a function named addRoomSummary which will accept an argument of RoomSummary type named 
    //newRoomSummary and will return nothing
    addNewRoomSummary: (newRoomSummaryDTO: RoomSummaryDTO) => void;

    removeRoomSummary: (roomId: string) => void;
}

export interface RoomInvitesSummaryDTO {
    roomSummaryDTO: RoomSummaryDTO;
    hostEmail: string;
}


export interface RoomData {
    roomId: string;
    roomName: string;
    chats:
    {
        chatId: string;
        chatName: string;
    }[];

    videos: Video[];

    // videos:
    // {
    //     videoId: string;
    //     videoName: string;
    //     videoThumbnailURL: string;
    // }[];

    participants:
    {
        roomParticipantId: string;
        roomParticipantEmail: string;
    }[];
}

export interface RoomProps {
    roomId: string;
    roomName: string;
}

export interface ParticipantsContextType {
    participants: Participant[];
    updateParticipants: (participants: Participant[]) => void;
    addParticipant: (participant: Participant) => void;
    removeParticipant: (participantId: string) => void;

}

export interface Participant {
    roomParticipantId: string;
    roomParticipantEmail: string;
}

export interface CurrentRoomIdContextType {
    currentRoomId: string;
    setCurrentRoomId: (currentRoomId: string) => void;
}

export interface RoomInvitesContextType {
    roomInvites: RoomInvitesSummaryDTO[];
    updateRoomInvites: (roomInvites: RoomInvitesSummaryDTO[]) => void;
    addNewRoomInvite: (roomInvite: RoomInvitesSummaryDTO) => void;
    removeRoomInvite: (roomInviteId: string) => void;
}

export interface VideoUploadDTO {
    roomId: string;
    uploader_UserId: string;
    videoFileName: string;
    videoFileSize: number;
}

export interface Video {
    videoId: string;
    videoFileName: string;
    videoThumbnailS3URI: string;
    isLocked: boolean;
    uploadProgress: number;
    uploadStatus: string;
    uploadedBy: string;
}

export interface VideosContextType {
    videos: Video[];
    updateVideos: (videos: Video[]) => void;
    removeVideo: (videoId: string) => void;
    updateVideoProgress: (videoId: string, uploadPercent: number) => void;
    updateVideoStatus: (videoId: string) => void;
    
}

export interface DestinationContextType {
    destinationList: Destination[];
    addDestination: (destination: Destination) => void;
    removeDestination: (destinationId: string) => void;
}

export interface Destination {
    destinationId: string;
    destinationType: string;
    destinationUserName: string;
}