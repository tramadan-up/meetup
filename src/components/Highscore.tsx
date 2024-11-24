import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type Participant = {
  id: string;
  name: string;
  score: number;
};

const PARTICIPANT_LIST_KEY = 'participantList';

export default function Highscore() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const storedParticipants = sessionStorage.getItem(PARTICIPANT_LIST_KEY);
    if (storedParticipants) {
      setParticipants(JSON.parse(storedParticipants));
    }
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Highscores
      </Typography>
      <Box
        sx={{
          height: '50%',
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          padding: 1,
        }}
      >
        {participants.map((participant) => (
          <Box
            key={participant.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Typography variant="h6">{participant.name}</Typography>
            <Typography variant="h6">{participant.score} Punkte</Typography>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
