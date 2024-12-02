import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type TokenFormProps = {
    speakingTokens: number;
    timerTokens: number;
    onTokenChange: (newSpeakingTokens: number, newTimerTokens: number) => void;
};

export default function TokenForm({
    speakingTokens,
    timerTokens,
    onTokenChange,
}: TokenFormProps) {

    const handleSpeakingTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeakingTokens = parseInt(e.target.value) || 0;
        onTokenChange(newSpeakingTokens, timerTokens);
    };

    const handleTimerTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTimerTokens = parseInt(e.target.value) || 0;
        onTokenChange(speakingTokens, newTimerTokens);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 300,
                margin: '0 auto',
                padding: 2,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1,
            }}
        >
            <TextField
                label="Redetoken"
                type="number"
                value={speakingTokens}
                onChange={handleSpeakingTokensChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Zeittoken"
                type="number"
                value={timerTokens}
                onChange={handleTimerTokensChange}
                variant="outlined"
                fullWidth
            />
        </Box>
    );
}

