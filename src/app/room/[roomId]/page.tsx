'use client';
import {useParams} from 'next/navigation';
import {useEffect, useState} from "react";

export default function RoomPage() {
    const params = useParams();
    const roomId = params.roomId as string;
    // const { hearts, heartCount } = useRoomSocket(roomId);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    // const renderHeartsCont = () => {
    //     if(!isClient) return null;
    //     return <p className="text-lg text-black">❤️ {heartCount} hearts</p>
    // }

    return (
        <div className="relative w-full h-screen bg-white">
            <h1 className="text-3xl text-black">{roomId}</h1>
            {/*{renderHeartsCont()}*/}
            {/*<Hearts hearts={hearts} />*/}
        </div>
    );
}
