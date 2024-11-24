import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const TOKEN_STORAGE_KEY = 'tokenCount';

type TokenCounts = {
  speaking: number;
  time: number;
  punishment: number;
};

export default function ParticipantHighscore() {
  const defaultTokens = 4; // Default for speaking and time tokens
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
    // Retrieve token counts from sessionStorage
    const speakingTokens = parseInt(sessionStorage.getItem(`${TOKEN_STORAGE_KEY}_speaking`) || `${defaultTokens}`, 10);
    const timeTokens = parseInt(sessionStorage.getItem(`${TOKEN_STORAGE_KEY}_time`) || `${defaultTokens}`, 10);
    const punishmentTokens = parseInt(sessionStorage.getItem(`${TOKEN_STORAGE_KEY}_punishment`) || '0', 10);

    setTokenCounts({ speaking: speakingTokens, time: timeTokens, punishment: punishmentTokens });

    // Calculate scores
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
        maxWidth: '90%',
        height: '90%',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Score
      </Typography>
      <Divider sx={{ marginBottom: 6 }} />
      <Box sx={{ marginBottom: 6 }}>
        <Box sx={{ marginBottom: 6 }}>
          <Typography variant="h6">
            Übrige Rede Token: {tokenCounts.speaking}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            Punkte durch Rede Token: {scoreDetails.speaking}
          </Typography>
          <Typography>
          (100 Punkte pro Token)
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 6 }}>
          <Typography variant="h6">
            Übrige Zeit Token: {tokenCounts.time}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            Punktr durch Zeit Token: {scoreDetails.time}
          </Typography>
          <Typography>
          (100 Punkte pro Token)
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 6 }}>
          <Typography variant="h6">
            Straf Token: {tokenCounts.punishment}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            Punkte durch Straf Token verloren: {scoreDetails.punishment}
          </Typography>
          <Typography>
          (-50 Punkte pro Token)
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 3 }}>
        Ergebins: {scoreDetails.total} XP
      </Typography>
    </Box>
  );
}
