import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import TimerIcon from '@mui/icons-material/Timer';
import ChatIcon from '@mui/icons-material/Chat';
import WarningIcon from '@mui/icons-material/Warning';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const TIME_TOKEN_STORAGE_KEY = 'timeTokenCount';
const SPEAKING_TOKEN_STORAGE_KEY = 'speakingTokenCount';
const PUNISHMENT_TOKEN_STORAGE_KEY = 'punishmentTokenCount';

type TokenCounts = {
  speaking: number;
  time: number;
  punishment: number;
};

export default function ParticipantHighscore() {
  const defaultTokens = 4;
  const pointsPerSpeakingToken = 100;
  const pointsPerTimeToken = 100;
  const pointsPerPunishmentToken = -50;

  const [tokenCounts, setTokenCounts] = useState<TokenCounts>({
    speaking: defaultTokens,
    time: defaultTokens,
    punishment: 0,
  });

  const [scoreDetails, setScoreDetails] = useState({
    speaking: 0,
    time: 0,
    punishment: 0,
    total: 0,
  });

  useEffect(() => {
    const timeTokens = parseInt(sessionStorage.getItem(TIME_TOKEN_STORAGE_KEY) || `${defaultTokens}`, 10);
    const speakingTokens = parseInt(sessionStorage.getItem(SPEAKING_TOKEN_STORAGE_KEY) || `${defaultTokens}`, 10);
    const punishmentTokens = parseInt(sessionStorage.getItem(PUNISHMENT_TOKEN_STORAGE_KEY) || '0', 10);

    setTokenCounts({ speaking: speakingTokens, time: timeTokens, punishment: punishmentTokens });

    const usedSpeakingTokens = defaultTokens - speakingTokens;
    const usedTimeTokens = defaultTokens - timeTokens;

    const speakingScore = usedSpeakingTokens * pointsPerSpeakingToken;
    const timeScore = usedTimeTokens * pointsPerTimeToken;
    const punishmentScore = punishmentTokens * pointsPerPunishmentToken;
    const totalScore = speakingScore + timeScore + punishmentScore;

    setScoreDetails({
      speaking: speakingScore,
      time: timeScore,
      punishment: punishmentScore,
      total: totalScore,
    });
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        border: '2px',
        borderRadius: 3,
        height:'100%',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography variant="h4" gutterBottom>
          Score - Du bist auf Rang 2!
        </Typography>
        <Divider sx={{ marginBottom: 6 }} />
        <Box sx={{ marginBottom: 6 }}>
        <Box sx={{ marginBottom: 6 }}>
            <Typography variant="h5">
              Übrige Zeittoken <Badge><TimerIcon color='primary' /></Badge>: {tokenCounts.time}
            </Typography>
            <Typography variant="body1" color='grey'>
              Punkte durch Zeittoken: {scoreDetails.time}
            </Typography>
            <Typography color='grey'>
            (100 Punkte pro Token)
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 6 }}>
            <Typography variant="h5">
              Übrige Redetoken <Badge><ChatIcon color='primary'/></Badge>: {tokenCounts.speaking}
            </Typography>
            <Typography variant="body1" color='grey'>
              Punkte durch Redetoken: {scoreDetails.speaking}
            </Typography>
            <Typography color='grey'>
            (100 Punkte pro Token)
            </Typography>
          </Box>
          
          <Box sx={{ marginBottom: 6 }}>
            <Typography variant="h5">
              Straftoken <Badge><WarningIcon color='error'/></Badge>: {tokenCounts.punishment}
            </Typography>
            <Typography variant="body1" color='grey'>
              Punkte durch Straftoken verloren: {scoreDetails.punishment}
            </Typography>
            <Typography color='grey'>
            (-50 Punkte pro Token)
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 3 }}>
          Ergebins: {scoreDetails.total} XP
        </Typography>
      </ThemeProvider>
    </Box>
  );
}
