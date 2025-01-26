import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import ChatIcon from '@mui/icons-material/Chat';


type SpeakingTokenProps = {
    size: 'small' | 'big';
};

const SPEAKING_TOKEN_STORAGE_KEY = 'speakingTokenCount';

export default function SpeakingToken({ size }: SpeakingTokenProps) {
    const defaultCount =  4;
    const [speakingTokenCount, setSpeakingTokenCount] = useState<number>(() => {
        const storedSpeakingTokenCount = sessionStorage.getItem(SPEAKING_TOKEN_STORAGE_KEY);
        return storedSpeakingTokenCount !== null ? parseInt(storedSpeakingTokenCount, 10) : defaultCount;
    });
    useEffect(() => {
        sessionStorage.setItem(SPEAKING_TOKEN_STORAGE_KEY, speakingTokenCount.toString());
        window.dispatchEvent(new Event('speakingToken:update'));
    }, [speakingTokenCount]);

    const handleTokenClick = () => {
        if (size === 'small' && speakingTokenCount > 0) {
            setSpeakingTokenCount((prevCount) => prevCount - 1);
        }
    };

    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>          
            {size === 'small' ? (
                <Tooltip title="Redetoken">
                    <Badge badgeContent={speakingTokenCount} color="primary" showZero overlap="circular">
                        <IconButton
                            color='primary'
                            onClick={handleTokenClick}
                        >
                            <ChatIcon sx={{ fontSize: '70px' }} />
                        </IconButton>
                    </Badge>
                </Tooltip>
            ) : (
                Array.from({ length: 4 }).map((_, index) => (
                    <Tooltip key={index} title="Redetoken">
                        <IconButton
                            color='primary'
                            sx={{ opacity: speakingTokenCount > index ? 1 : 0.2 }}
                            onClick={() => {
                                setSpeakingTokenCount((prevCount) => (prevCount > index ? prevCount - 1 : prevCount));
                            }}
                        >
                            <ChatIcon sx={{ fontSize: '90px' }} />
                        </IconButton>
                    </Tooltip>
                ))
            )}
        </Box>
    );
}