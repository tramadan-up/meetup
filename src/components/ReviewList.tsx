import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

type Participant = {
  id: string;
  name: string;
};

type Review = {
  participantId: string;
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Teilnehmerbewertungen {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    color={index < averageScore ? 'primary' : 'disabled'}
                  />
                ))}
      </Typography>
      <Box
        sx={{
          height: '75%',
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          padding: 1,
        }}
      >
        {reviews.map((review) => {
          const participant = participants.find((p) => p.id === review.participantId);
          return (
            <Box
              key={review.participantId}
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
              <Typography variant="h6" sx={{ flex: 1 }}>
                {participant?.name || 'Unbekannter Teilnehmer'}
              </Typography>

              <Typography
                variant="body2"
                sx={{ flex: 3, textAlign: 'center', marginX: 2 }}
              >
                {review.comment}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
