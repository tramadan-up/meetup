import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';

export default function FeedbackForm() {
  const [score, setScore] = useState<number>(3);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = () => {
    console.log('Feedback Submitted:', { score, comment });
    setScore(3);
    setComment('');
  };

  return (
    <Box
      sx={{
        padding: 4,
        border: '2px',
        borderRadius: 3,
        maxWidth: '95%',
        height: '90%',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bewerte das Meeting
      </Typography>

      <Box sx={{ marginBottom: 3, display: 'flex', alignItems: 'center', gap: 2, height: '15%' }}>
        <Typography variant="h6">Deine Bewertung:</Typography>
        <StarIcon color="primary" sx={{ fontSize: 30 }} />
        <Slider
          value={score}
          onChange={(_, newValue) => setScore(newValue as number)}
          min={1}
          max={5}
          step={1}
          marks
          valueLabelDisplay="auto"
          sx={{ flex: 1 }}
        />
      </Box>

      <Box sx={{ 
        marginBottom: 3,
        height: '60%'
       }}>
        <TextField
          fullWidth
          label="Kommentar"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={14}
          placeholder="Enter your feedback here..."
        />
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ width: '15%', padding: 1 }}
      >
        Abgeben
      </Button>
    </Box>
  );
}
