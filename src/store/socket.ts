'use client';

import io from 'socket.io-client';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

export const socket = io(apiUrl, {
    transports: ['websocket'],
    autoConnect: true,
});