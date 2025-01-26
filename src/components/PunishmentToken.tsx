import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import WarningIcon from '@mui/icons-material/Warning';

type PunishmentTokenProps = {
    size: 'small' | 'big';
};

const PUNISHMENT_TOKEN_STORAGE_KEY = 'punishmentTokenCount';

export default function PunishmentToken({ size }: PunishmentTokenProps) {
    const defaultCount =  0;
    const [punishmentTokenCount, setPunishmentTokenCount] = useState<number>(() => {
        const storedPunishmentTokenCount = sessionStorage.getItem(PUNISHMENT_TOKEN_STORAGE_KEY);
        return storedPunishmentTokenCount !== null ? parseInt(storedPunishmentTokenCount, 10) : defaultCount;
    });
    useEffect(() => {
        sessionStorage.setItem(PUNISHMENT_TOKEN_STORAGE_KEY, punishmentTokenCount.toString());
        window.dispatchEvent(new Event('punishmentToken:update'));
    }, [punishmentTokenCount]);

    const handleSimulatePunishment = () => {
        setPunishmentTokenCount((prevCount) => prevCount + 1);
        alert("Du hast ein Straftoken erhalten. Begründung: [...] [Diese Funktion ist nicht vollständig implementiert]");
    };


    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>          
                {size === 'small' ? (
                    <Tooltip title="Straftoken">
                        <Badge badgeContent={punishmentTokenCount} color="primary" showZero overlap="circular">
                            <IconButton
                                color='error'
                                disabled
                            >
                                <WarningIcon sx={{ fontSize: '70px' }} />
                            </IconButton>
                        </Badge>
                    </Tooltip>
                ) : (
                    Array.from({ length: 4 }).map((_, index) => (
                        <Tooltip key={index} title="Straftoken">
                            <IconButton
                                color='error'
                                sx={{ opacity: punishmentTokenCount > index ? 1 : 0.2 }}
                            >
                                <WarningIcon sx={{ fontSize: '90px' }} />
                            </IconButton>
                        </Tooltip>
                    ))
                )}
            </Box>
            <Box>
            {size != 'small' ? (
                    <Button 
                        variant='outlined' 
                        color='error'
                        onClick={handleSimulatePunishment}>
                    Strafe simulieren
                </Button>):(<></>)}
            </Box>
        </Box>
    );
}

