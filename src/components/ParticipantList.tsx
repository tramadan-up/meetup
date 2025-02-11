import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import Badge from '@mui/material/Badge';
import ChatIcon from '@mui/icons-material/Chat';
import TimerIcon from '@mui/icons-material/Timer';
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

type Participant = {
    id: string;
    name: string;
    speakingTokens: number;
    timeTokens: number;
    punishmentTokens: number;
    score: number;
};

type ParticipantListProps = {
    participants?: Participant[];
    isSlideView?: boolean;
};

const PARTICIPANT_LIST_KEY = 'participantList';

const defaultParticipants: Participant[] = [
    { id: '1', name: 'Lukas', speakingTokens: 2, timeTokens: 1, punishmentTokens: 0, score: 250 },
    { id: '2', name: 'Max', speakingTokens: 1, timeTokens: 2, punishmentTokens: 0, score: 200 },
    { id: '3', name: 'Eva', speakingTokens: 2, timeTokens: 1, punishmentTokens: 1, score: 200 },
    { id: '4', name: 'Jonas', speakingTokens: 3, timeTokens: 0, punishmentTokens: 2, score: 250 },
    { id: '5', name: 'Paul', speakingTokens: 1, timeTokens: 3, punishmentTokens: 0, score: 250 },
    { id: '6', name: 'Anna', speakingTokens: 2, timeTokens: 1, punishmentTokens: 0, score: 250 },
    { id: '7', name: 'Natalie', speakingTokens: 1, timeTokens: 2, punishmentTokens: 1, score: 150 },
    { id: '8', name: 'Maria', speakingTokens: 2, timeTokens: 2, punishmentTokens: 0, score: 300 },
    { id: '9', name: 'Emma', speakingTokens: 1, timeTokens: 1, punishmentTokens: 1, score: 100 },
    { id: '10', name: 'Moritz', speakingTokens: 2, timeTokens: 0, punishmentTokens: 1, score: 150 },
];

export default function ParticipantList({ participants, isSlideView=false }: ParticipantListProps) {
    const [participantList, setParticipantList] = useState<Participant[]>(
        participants || JSON.parse(sessionStorage.getItem(PARTICIPANT_LIST_KEY) || '[]') || defaultParticipants
    );

    useEffect(() => {
        if (!sessionStorage.getItem(PARTICIPANT_LIST_KEY)) {
            sessionStorage.setItem(PARTICIPANT_LIST_KEY, JSON.stringify(defaultParticipants));
            setParticipantList(defaultParticipants);
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem(PARTICIPANT_LIST_KEY, JSON.stringify(participantList));
    }, [participantList]);

    const calculateScore = (participant: Participant) => {
        return (
            participant.speakingTokens * 100 +
            participant.timeTokens * 50 +
            participant.punishmentTokens * -50
        );
    };

    const handleTokenChange = (id: string, type: 'increase' | 'decrease') => {
        const updatedList = participantList.map((participant) => {
            if (participant.id === id) {
                const newPunishmentTokens =
                    type === 'increase' ? participant.punishmentTokens + 1 : participant.punishmentTokens - 1;
                const newScore = calculateScore({
                    ...participant,
                    punishmentTokens: newPunishmentTokens,
                });

                return {
                    ...participant,
                    punishmentTokens: newPunishmentTokens,
                    score: newScore,
                };
            }
            return participant;
        });

        setParticipantList(updatedList);
    };

    return (
        <Box sx={{
            border: '1px solid grey',
            borderRadius: '8px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '1vh',
            paddingBottom: '1vh',
        }}>
            <Grid container spacing={1} direction="column">
                <ThemeProvider theme={theme}>
                    <Typography variant="h4" gutterBottom>
                        Teilnehmer
                    </Typography>
                </ThemeProvider>
                
                <Grid container spacing={3} direction="column">
                    {participantList.map((participant) => (
                        <Grid container spacing={3} direction="row" key={participant.id} justifyContent="space-evenly" borderRadius="8px" boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">
                            <Box sx={{width:'10%'}}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h6">{participant.name}</Typography>
                                </ThemeProvider>
                            </Box>
                            <Grid container spacing={1}>
                                    <Badge badgeContent={participant.speakingTokens} color="success" showZero>
                                        <ChatIcon color="success" />
                                    </Badge>
                                    <Badge badgeContent={participant.timeTokens} color="primary" showZero>
                                        <TimerIcon color="primary" />
                                    </Badge>
                                    <Grid container spacing={0} direction="row">
                                        <Badge badgeContent={participant.punishmentTokens} color="error" showZero>
                                            <WarningIcon color="error" />
                                        </Badge>
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => handleTokenChange(participant.id, 'increase')}
                                            sx={{ padding: 0 }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                            color="success"
                                            size="small"
                                            onClick={() => handleTokenChange(participant.id, 'decrease')}
                                            sx={{ padding: 0 }}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </Grid>
                            </Grid>
                            {!isSlideView ?
                                <Box>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h6">Score: {participant.score}</Typography>
                                    </ThemeProvider>
                                </Box>
                            : null}
                            
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

