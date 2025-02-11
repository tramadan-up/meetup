import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

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
      const parsedParticipants = JSON.parse(storedParticipants);
      parsedParticipants.sort((a: Participant, b: Participant) => b.score - a.score);
      setParticipants(parsedParticipants);
    }
  }, []);

  return (
    <Box sx={{
      border: '1px solid grey',
      borderRadius: '8px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '5vw',
      paddingRight: '5vw',
      paddingTop: '1vh',
      height:'100%'
    }}>
      <Grid container direction="column" justifyContent="center">
        <Grid>
          <ThemeProvider theme={theme}>
            <Typography variant="h4" gutterBottom>
              Highscores
            </Typography>
          </ThemeProvider>
        </Grid>
        <Grid>
          {participants.map((participant) => (
            <Box
              key={participant.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                ':last-child': { borderBottom: 'none' },
              }}
            >
              <ThemeProvider theme={theme}>
                <Typography variant="h6">{participant.name}</Typography>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Typography variant="h6">{participant.score} Punkte</Typography>
              </ThemeProvider>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
