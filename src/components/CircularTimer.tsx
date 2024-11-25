import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ENTRIES_STORAGE_KEY = 'entries';

type Entry = {
  id: string;
  name: string;
  value: number;
};

type CircularTimerProps = {
    useDefaults?: boolean;
  };

export default function CircularTimer({ useDefaults = false }: CircularTimerProps) {
    const navigate = useNavigate();
    const handleEndClick = () => {
        if (useDefaults) {
            navigate('/participant/review');
        } else {
            navigate('/coordinator/review');
        }
      };
      const defaultEntries: Entry[] = [
        { id: '1', name: 'Welcome', value: 5 },
        { id: '2', name: 'Discussion', value: 10 },
        { id: '3', name: 'Q&A', value: 7 },
      ];
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentEntryIndex, setCurrentEntryIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (useDefaults) {
      setEntries(defaultEntries);
    } else {
      const storedEntries = sessionStorage.getItem(ENTRIES_STORAGE_KEY);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      } else {
        sessionStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(defaultEntries));
        setEntries(defaultEntries);
      }
    }
  }, [useDefaults]);

  const handleNext = () => {
    if (currentEntryIndex < entries.length - 1) {
      setCurrentEntryIndex((prevIndex) => prevIndex + 1);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handlePrevious = () => {
    if (currentEntryIndex > 0) {
      setCurrentEntryIndex((prevIndex) => prevIndex - 1);
      setIsRunning(false);
    }
  };

  const currentEntry = entries[currentEntryIndex] || { id: '0', name: 'Loading...', value: 1 };

  return (
    <Box
      sx={{
        textAlign: 'center',
        width: '80%',
        margin: '0 auto',
        padding: 4,
        border: '2px',
        borderRadius: 3,
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Timer
      </Typography>
      <Typography variant="h6">{currentEntry.name}</Typography>

      <CountdownCircleTimer
        key={currentEntry.id}
        isPlaying={isRunning}
        duration={currentEntry.value * 60}
        colors={['#4caf50', '#f9a825', '#d32f2f']}
        colorsTime={[currentEntry.value * 60, (currentEntry.value * 60) / 2, 0]}
        onComplete={() => {
          handleNext();
        }}
      >
        {({ remainingTime }) => (
          <Typography variant="h4">
            {Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, '0')}
          </Typography>
        )}
      </CountdownCircleTimer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentEntryIndex === 0}
        >
          Vorheriges Thema
        </Button>
        <Button variant="contained" onClick={() => setIsRunning((prev) => !prev)} disabled={entries.length === 0}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          onClick={currentEntryIndex === entries.length - 1 ? handleEndClick : handleNext}
          disabled={entries.length === 0}
        >
          {currentEntryIndex === entries.length - 1 ? 'Meeting beenden' : 'Nächstes Thema'}
        </Button>
      </Box>
    </Box>
  );
}
