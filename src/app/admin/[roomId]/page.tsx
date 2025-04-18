'use client';

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import io from 'socket.io-client';
import {Alert} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {roomsApi} from '@/services';

let socket: any = null;

export default function AdminPage() {
    const params = useParams();
    const roomId = params.roomId as string;

    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async () => {
        setError(null);
        try {
            const isValid = await roomsApi.validateAdmin(roomId, password);
            if (isValid) {
                setIsAuthorized(true);
            } else {
                setError('Senha incorreta!');
            }
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401) {
                setError('Senha incorreta!');
            } else if (err.response?.status === 404) {
                setError('Sala não encontrada!');
            } else {
                setError('Erro ao validar admin!');
            }
        }
    };

    useEffect(() => {
        if (!isAuthorized || socket) return;

        socket = io(`${process.env.NEXT_PUBLIC_API_URL!}/hearts`);
        socket.emit('joinRoom', { roomId });

        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        return () => {
            socket.disconnect();
            socket = null;
        };
    }, [isAuthorized, roomId]);

    if (!isAuthorized) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white">
                <h2 className="text-2xl text-black mb-2">Entrar como admin na sala: {roomId}</h2>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha admin"
                    className="mb-2 w-64"
                />
                {error && <Alert variant="destructive" className="mb-2">{error}</Alert>}
                <Button onClick={handleAuth} className="w-64">
                    Entrar
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-2xl font-bold text-black mb-2">Sala {roomId}</h1>
            <p className="text-black mb-4">Status: {isConnected ? 'Conectado' : 'Desconectado'}</p>
            <Button
                onClick={() => socket.emit('spawnHeart', { roomId })}
                className="text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-200 transition"
            >
                Spawn ❤️
            </Button>
        </div>
    );
}
