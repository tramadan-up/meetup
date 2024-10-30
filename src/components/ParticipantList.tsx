import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack'
import Badge from '@mui/material/Badge';
import ChatIcon from '@mui/icons-material/Chat';
import TimerIcon from '@mui/icons-material/Timer';
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


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
};

const PARTICIPANT_LIST_KEY = 'participantList';

const defaultParticipants: Participant[] = [
  { id: '1', name: 'Lukas', speakingTokens: 2, timeTokens: 1, punishmentTokens: 0, score: 250 },
  { id: '2', name: 'Max', speakingTokens: 1, timeTokens: 2, punishmentTokens: 0, score: 200 },
  { id: '3', name: 'Felix', speakingTokens: 2, timeTokens: 1, punishmentTokens: 1, score: 200 },
  { id: '4', name: 'Jonas', speakingTokens: 3, timeTokens: 0, punishmentTokens: 2, score: 250 },
  { id: '5', name: 'Paul', speakingTokens: 1, timeTokens: 3, punishmentTokens: 0, score: 250 },
  { id: '6', name: 'Leon', speakingTokens: 2, timeTokens: 1, punishmentTokens: 0, score: 250 },
  { id: '7', name: 'Finn', speakingTokens: 1, timeTokens: 2, punishmentTokens: 1, score: 150 },
  { id: '8', name: 'Elias', speakingTokens: 2, timeTokens: 2, punishmentTokens: 0, score: 300 },
  { id: '9', name: 'Julian', speakingTokens: 1, timeTokens: 1, punishmentTokens: 1, score: 100 },
  { id: '10', name: 'Moritz', speakingTokens: 2, timeTokens: 0, punishmentTokens: 1, score: 150 },
];

export default function ParticipantList({ participants }: ParticipantListProps) {
  const [participantList, setParticipantList] = useState<Participant[]>(
    participants || JSON.parse(sessionStorage.getItem(PARTICIPANT_LIST_KEY) || '[]') || defaultParticipants
  );

  useEffect(() => {
    // Load default participants if none are in sessionStorage
    if (!sessionStorage.getItem(PARTICIPANT_LIST_KEY)) {
      sessionStorage.setItem(PARTICIPANT_LIST_KEY, JSON.stringify(defaultParticipants));
      setParticipantList(defaultParticipants);
    }
  }, []);

  // Save updated participant list to sessionStorage
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
          punishmentTokens: newPunishmentTokens > 0 ? newPunishmentTokens : 0,
          score: newScore,
        };
      }
      return participant;
    });

    setParticipantList(updatedList);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Teilnehmer
      </Typography>
      <Grid container>
        {participantList.map((participant) => (
          <Grid key={participant.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1,
                marginBottom: 2,
                width: 350,
                maxWidth: '100%',
                height: 18
              }}
            >
              <Stack direction="row" spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Stack direction="row" spacing={1}>
                    <Box sx={{ width: 100, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Typography variant="h6">{participant.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 150 }}>
                      <Stack direction="row" spacing={2} display="flex" justifyContent="center" alignItems="center">
                        <Badge badgeContent={participant.speakingTokens} color="success" showZero>
                          <ChatIcon color="success" />
                        </Badge>
                        <Badge badgeContent={participant.timeTokens} color="primary" showZero>
                          <TimerIcon color="primary" />
                        </Badge>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Stack direction="row" display="flex" justifyContent="center" alignItems="center" spacing={1}>
                            <Badge badgeContent={participant.punishmentTokens} color="error" showZero>
                              <WarningIcon color="error" />
                            </Badge>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleTokenChange(participant.id, 'increase')}
                                disabled={participant.score <= 0}
                                sx={{ padding: 0 }}
                              >
                                <AddIcon />
                              </IconButton>
                              <IconButton
                                color="success"
                                size="small"
                                onClick={() => handleTokenChange(participant.id, 'decrease')}
                                disabled={participant.punishmentTokens <= 0}
                                sx={{ padding: 0 }}
                              >
                                <RemoveIcon />
                              </IconButton>
                            </Box>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: 100 }}>
                  <Typography variant="h6">Score: {participant.score}</Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

