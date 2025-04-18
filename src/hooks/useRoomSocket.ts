'use client';
import {useEffect, useRef, useState} from 'react';
import type {Socket} from 'socket.io-client';
import io from 'socket.io-client';
import {roomsApi} from '@/services';

type Heart = {
    id: number;
    left: number;
};

export function useRoomSocket(roomId: string | undefined) {
    const [heartCount, setHeartCount] = useState(0);
    const [hearts, setHearts] = useState<Heart[]>([]);
    const socketRef = useRef<typeof Socket | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!roomId || !isClient) return;

        const fetchRoom = async () => {
            try {
                const room = await roomsApi.findRoom(roomId);
                setHeartCount(room.heartCount);
            } catch (e) {
                console.error('Erro ao buscar room:', e);
            }
        };

        fetchRoom();
    }, [roomId, isClient]);

    useEffect(() => {
        if (!roomId || socketRef.current || !isClient) return;

        const socket = io(`${process.env.NEXT_PUBLIC_API_URL!}/hearts`);
        socketRef.current = socket;

        socket.emit('joinRoom', { roomId });

        socket.on('heartSpawned', () => {
            const id = Date.now();
            const left = Math.random() * 90 + 5;

            setHearts((prev) => [...prev, { id, left }]);
            setHeartCount((prev) => prev + 1);

            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== id));
            }, 3000);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [roomId, isClient]);

    return { heartCount, hearts };
}
