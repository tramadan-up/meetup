import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import ChatIcon from '@mui/icons-material/Chat';
import TimerIcon from '@mui/icons-material/Timer';
import WarningIcon from '@mui/icons-material/Warning';
import { Typography } from '@mui/material';

type TokenProps = {
    type: 'speaking' | 'punishment' | 'time';
    size: 'small' | 'big';
};

const TOKEN_STORAGE_KEY = 'tokenCount';

export default function Token({ type, size }: TokenProps) {
    const defaultCount = type === 'punishment' ? 0 : 4;

    const [tokenCount, setTokenCount] = useState<number>(() => {
        const storedTokenCount = sessionStorage.getItem(`${TOKEN_STORAGE_KEY}_${type}`);
        return storedTokenCount !== null ? parseInt(storedTokenCount, 10) : defaultCount;
    });

    useEffect(() => {
        sessionStorage.setItem(`${TOKEN_STORAGE_KEY}_${type}`, tokenCount.toString());
    }, [tokenCount, type]);

    const handleTokenClick = () => {
        if (size === 'small' && tokenCount > 0) {
            setTokenCount((prevCount) => prevCount - 1);
        }
    };

    const handleSimulatePunishment = () => {
        setTokenCount((prevCount) => prevCount + 1);
    };

    const getTokenIcon = () => {
        switch (type) {
            case 'speaking':
                return <ChatIcon sx={{ fontSize: size === 'big' ? '90px' : '70px' }} />;
            case 'time':
                return <TimerIcon sx={{ fontSize: size === 'big' ? '90px' : '70px' }} />;
            case 'punishment':
                return <WarningIcon sx={{ fontSize: size === 'big' ? '90px' : '70px' }} />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                {size === 'small' ? (
                    <Tooltip title={`${type.charAt(0).toUpperCase() + type.slice(1)} Token`}>
                        <Badge badgeContent={tokenCount} color="primary" showZero overlap="circular">
                            <IconButton
                                color={type === 'punishment' ? 'error' : 'primary'}
                                onClick={type === 'punishment' ? undefined : handleTokenClick}
                                disabled={type === 'punishment'}
                            >
                                {getTokenIcon()}
                            </IconButton>
                        </Badge>
                    </Tooltip>
                ) : (
                    Array.from({ length: 4 }).map((_, index) => (
                        <Tooltip key={index} title={`${type.charAt(0).toUpperCase() + type.slice(1)} Token`}>
                            <IconButton
                                color={type === 'punishment' ? 'error' : 'primary'}
                                sx={{ opacity: tokenCount > index ? 1 : 0.2 }}
                                onClick={() => {
                                    if (type !== 'punishment') {
                                        setTokenCount((prevCount) => (prevCount > index ? prevCount - 1 : prevCount));
                                    }
                                }}
                            >
                                {getTokenIcon()}
                            </IconButton>
                        </Tooltip>
                    ))
                )}
                
            </Box>
            <Box>
                {type === 'punishment' && size != 'small' ? (
                    <Button 
                        variant='outlined' 
                        color='error'
                        onClick={handleSimulatePunishment}>
                    Strafe simulieren
                </Button>):(<Typography></Typography>)}
            </Box>
        </Box>
    );
}

