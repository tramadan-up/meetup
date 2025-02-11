import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import TimerIcon from '@mui/icons-material/Timer';


type TimeTokenProps = {
    size: 'small' | 'big';
};

const TIME_TOKEN_STORAGE_KEY = 'timeTokenCount';

export default function TimeToken({ size }: TimeTokenProps) {
    const defaultCount =  4;
    const [timeTokenCount, setTimeTokenCount] = useState<number>(() => {
        const storedTimeTokenCount = sessionStorage.getItem(TIME_TOKEN_STORAGE_KEY);
        return storedTimeTokenCount !== null ? parseInt(storedTimeTokenCount, 10) : defaultCount;
    });
    useEffect(() => {
        sessionStorage.setItem(TIME_TOKEN_STORAGE_KEY, timeTokenCount.toString());
        window.dispatchEvent(new Event('timeToken:update'));
    }, [timeTokenCount]);

    const handleTokenClick = () => {
        if (size === 'small' && timeTokenCount > 0) {
            setTimeTokenCount((prevCount) => prevCount - 1);
            alert("Du hast ein Zeittoken benutzt und den Timer um eine Minute verlängert. [Diese Funktion ist nicht vollständig implementiert.]");
        }
    };

    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>          
            {size === 'small' ? (
                <Tooltip title="Zeittoken">
                    <Badge badgeContent={timeTokenCount} color="primary" showZero overlap="circular">
                        <IconButton
                            color='primary'
                            onClick={handleTokenClick}
                        >
                            <TimerIcon sx={{ fontSize: '70px' }} />
                        </IconButton>
                    </Badge>
                </Tooltip>
            ) : (
                Array.from({ length: 4 }).map((_, index) => (
                    <Tooltip key={index} title="Zeittoken">
                        <IconButton
                            color='primary'
                            sx={{ opacity: timeTokenCount > index ? 1 : 0.2 }}
                            onClick={() => {
                                setTimeTokenCount((prevCount) => (prevCount > index ? prevCount - 1 : prevCount));
                                alert("Du hast ein Zeittoken benutzt und den Timer um eine Minute verlängert. [Diese Funktion ist nicht vollständig implementiert.]");
                            }}
                        >
                            <TimerIcon sx={{ fontSize: '90px' }} />
                        </IconButton>
                    </Tooltip>
                ))
            )}
        </Box>
    );
}