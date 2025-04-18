'use client';
import {motion} from 'framer-motion';

type Heart = {
    id: number;
    left: number;
};

type HeartsProps = {
    hearts: Heart[];
};

export function Hearts({ hearts }: HeartsProps) {
    if (hearts.length === 0) return null;

    return (
        <>
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute text-3xl"
                    style={{ left: `${heart.left}%`, bottom: 0 }}
                    animate={{ y: -500, opacity: 0 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                >
                    ❤️
                </motion.div>
            ))}
        </>
    );
}
