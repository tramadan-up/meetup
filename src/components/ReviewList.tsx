import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';

let theme = createTheme();
theme = responsiveFontSizes(theme);

type Participant = {
  id: string;
  name: string;
};

type Review = {
  participantId: string;
  name: string,
  comment: string;
  score: number;
};

const PARTICIPANT_LIST_KEY = 'participantList';
const REVIEW_LIST_KEY = 'reviewList';

export default function ReviewList() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageScore, setAverageScore] = useState<number>(0);

  useEffect(() => {
    const storedParticipants = sessionStorage.getItem(PARTICIPANT_LIST_KEY);
    if (storedParticipants) {
      setParticipants(JSON.parse(storedParticipants));
    }

    const storedReviews = sessionStorage.getItem(REVIEW_LIST_KEY);
    if (storedReviews) {
      const parsedReviews = JSON.parse(storedReviews);
      setReviews(parsedReviews);
      calculateAverageScore(parsedReviews);
    } else {
      const germanReviews = [
        { id: '1', name: 'Lukas', comment: 'Sehr hilfreiche Person, danke!', score: 5 },
        { id: '2', name: 'Max', comment: 'Gut gemacht, ich bin zufrieden.', score: 4 },
        { id: '3', name: 'Felix', comment: 'Ganz okay, es gibt Raum für Verbesserungen.', score: 3 },
        { id: '4', name: 'Jonas', comment: 'Wunderbar, ich bin beeindruckt.', score: 5 },
        { id: '5', name: 'Paul', comment: 'Nicht schlecht, aber nicht perfekt.', score: 3 },
        { id: '6', name: 'Leon', comment: 'Sehr freundlich und hilfsbereit!', score: 5 },
        { id: '7', name: 'Finn', comment: 'Durchschnittlich, könnte besser sein.', score: 2 },
        { id: '8', name: 'Elias', comment: 'Fantastische Arbeit, sehr zufrieden!', score: 5 },
        { id: '9', name: 'Julian', comment: 'Es war okay, aber ich habe mehr erwartet.', score: 3 },
        { id: '10', name: 'Moritz', comment: 'Einfach großartig, besser geht es nicht.', score: 5 },
      ];

      const defaultReviews = germanReviews.map((review, index) => ({
        participantId: String(index + 1),
        name: review.name,
        comment: review.comment,
        score: review.score,
      }));

      setReviews(defaultReviews);
      sessionStorage.setItem(REVIEW_LIST_KEY, JSON.stringify(defaultReviews));
      calculateAverageScore(defaultReviews);
    }
  }, [participants]);

  const calculateAverageScore = (reviews: Review[]) => {
    if (reviews.length === 0) return;
    const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
    const avg = totalScore / reviews.length;
    setAverageScore(avg);
  };
  const fileContent = reviews.map(review => `${review.name}: ${review.comment}`).join('\n');
  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bewertungen.txt';
    link.click();
    URL.revokeObjectURL(url);
};

  return (
    <Box sx={{
      border: '1px solid grey',
      borderRadius: '8px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '5vw',
      paddingRight: '5vw',
      paddingTop: '1vh',
      height:'100%'
    }}>
      <Grid container direction="column">
        <Grid>
          <Stack direction="row" spacing={2}>
            <ThemeProvider theme={theme}>
              <Typography variant="h4" gutterBottom>
                Teilnehmerbewertungen {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    color={index < averageScore ? 'primary' : 'disabled'}
                  />
                ))}
              </Typography>
            </ThemeProvider>
            <Tooltip title="Bewertungen herunterladen">
                <IconButton
                    color="primary"
                    onClick={handleDownload}
                    aria-label="Bewertungen herunterladen">
                    <DownloadIcon />
                </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid>
          {reviews.map((review) => {
            const participant = participants.find((p) => p.id === review.participantId);
            return (
              <Box
                key={review.participantId}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  padding: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  ':last-child': { borderBottom: 'none' },
                }}
              >
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" sx={{ flex: 1 }}>
                    {participant?.name || 'Unbekannter Teilnehmer'}
                  </Typography>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="body2"
                    sx={{ flex: 3, textAlign: 'center', marginX: 2 }}
                  >
                    {review.comment}
                  </Typography>
                </ThemeProvider>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
