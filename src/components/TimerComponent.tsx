import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ENTRIES_STORAGE_KEY = 'entries';
const TIMER_STATE_STORAGE_KEY = 'timerState';

type Entry = {
  id: string;
  name: string;
  value: number;
};

type TimerState = {
  remainingTimes: number[];
  currentEntryIndex: number;
  isRunning: boolean;
};

type TimerComponentProps = {
  userType?: boolean;
  viewType: 'main' | 'slide';
};

export default function TimerComponent({ userType = false, viewType }: TimerComponentProps) {
  const navigate = useNavigate();

  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentEntryIndex, setCurrentEntryIndex] = useState<number>(0);
  const [remainingTimes, setRemainingTimes] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);


  const defaultEntries: Entry[] = [
    { id: '1', name: 'Organisation', value: 10 },
    { id: '2', name: 'Agenda 1', value: 10 },
    { id: '3', name: 'Präsentation', value: 10 },
    { id: '4', name: 'Diskussion', value: 10 },
  ];

  useEffect(() => {
    const storedEntries = sessionStorage.getItem(ENTRIES_STORAGE_KEY);

    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      setEntries(parsedEntries);
      restoreTimerState(parsedEntries);
    } else {
      const initialTimes = defaultEntries.map((entry) => entry.value * 60);
      sessionStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(defaultEntries));
      setEntries(defaultEntries);
      setRemainingTimes(initialTimes);
      setCurrentEntryIndex(0);
      setIsRunning(false);
    }
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      sessionStorage.setItem(
        TIMER_STATE_STORAGE_KEY,
        JSON.stringify({ remainingTimes, currentEntryIndex, isRunning })
      );
    }
  }, [remainingTimes, currentEntryIndex, isRunning, entries]);

  const restoreTimerState = (entries: Entry[]) => {
    const storedTimerState = sessionStorage.getItem(TIMER_STATE_STORAGE_KEY);

    if (storedTimerState) {
      const { remainingTimes, currentEntryIndex, isRunning }: TimerState = JSON.parse(storedTimerState);
      setRemainingTimes(remainingTimes || entries.map((entry) => entry.value * 60));
      setCurrentEntryIndex(currentEntryIndex);
      setIsRunning(isRunning);
    } else {
      const initialTimes = entries.map((entry) => entry.value * 60);
      setRemainingTimes(initialTimes);
      setCurrentEntryIndex(0);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setRemainingTimes((prevTimes) => {
          const updatedTimes = [...prevTimes];
          if (updatedTimes[currentEntryIndex] <= 1) {
            clearInterval(timerRef.current!);
            handleNext();
            updatedTimes[currentEntryIndex] = 0;
          } else {
            updatedTimes[currentEntryIndex] -= 1;
          }
          return updatedTimes;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, currentEntryIndex]);

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

  const handleEndClick = () => {
    if (userType) {
      navigate('/participant/review');
    } else {
      navigate('/coordinator/review');
    }
  };

  const currentEntry = entries[currentEntryIndex] || { id: '0', name: 'Loading...', value: 1 };
  const currentRemainingTime = remainingTimes[currentEntryIndex] || 0;

  if (viewType === 'slide') {
    return (

      <Box sx={{
        paddingTop: '1vh',
        paddingBottom: '1vh',
        width: '100%',
        maxHeight: '70px',
        height: '8vh',
        position: 'relative',
      }}>
        <LinearProgress
          variant="determinate"
          value={(currentRemainingTime / (currentEntry.value * 60)) * 100 || 0}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
            backgroundColor: '#ddd',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#3f51b5',
            },
          }}
        />
        <Box sx={{
          position:'absolute',
          top:'0',
          left:'0',
          width:'100%',
          height:'100%',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          color: 'white',
          textShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        }}>
          <Grid container>
            <ThemeProvider theme={theme}>
              <Typography variant="h4" sx={{ marginRight: 2 }}>
                {currentEntry.name}
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Typography variant="h4" sx={{ marginRight: 2 }}>
                {Math.floor(currentRemainingTime / 60)}:{String(currentRemainingTime % 60).padStart(2, '0')}
              </Typography>
            </ThemeProvider>
            <Grid container spacing={1}>
              <Button 
                variant="contained" 
                color={userType ? 'error' : 'primary'}
                onClick={handlePrevious} 
                disabled={currentEntryIndex === 0}>
                  Vorheriges Thema
              </Button>
              <Button
                variant="contained"
                color={userType ? 'error' : 'primary'}
                onClick={() => setIsRunning((prev) => !prev)}
                disabled={entries.length === 0}
              >
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              <Button
                variant="contained"
                color={userType ? 'error' : 'primary'}
                onClick={currentEntryIndex === entries.length - 1 ? handleEndClick : handleNext}
                disabled={entries.length === 0}
              >
                {currentEntryIndex === entries.length - 1 ? 'Meeting beenden' : 'Nächstes Thema'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      /** 
      <Box
        sx={{
          width: '100%',
          height: '8vh',
          backgroundColor: '#f9f9f9',
          position: 'relative',
        }}
      >
        <LinearProgress
          variant="determinate"
          value={(currentRemainingTime / (currentEntry.value * 60)) * 100 || 0}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
            backgroundColor: '#ddd',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#3f51b5',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4" sx={{ marginRight: 2 }}>
              {currentEntry.name}
            </Typography>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Typography variant="h4" sx={{ marginRight: 2 }}>
              {Math.floor(currentRemainingTime / 60)}:{String(currentRemainingTime % 60).padStart(2, '0')}
            </Typography>
          </ThemeProvider>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color={userType ? 'error' : 'primary'}
              onClick={handlePrevious} 
              disabled={currentEntryIndex === 0}>
              Vorheriges Thema
            </Button>
            <Button
          variant="contained"
          color={userType ? 'error' : 'primary'}
          onClick={() => setIsRunning((prev) => !prev)}
          disabled={entries.length === 0}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
            <Button
              variant="contained"
              color={userType ? 'error' : 'primary'}
              onClick={currentEntryIndex === entries.length - 1 ? handleEndClick : handleNext}
              disabled={entries.length === 0}
            >
              {currentEntryIndex === entries.length - 1 ? 'Meeting beenden' : 'Nächstes Thema'}
            </Button>
          </Box>
        </Box>
      </Box>
      */
    );
  }

  return (
    <Box sx={{
      border: '1px solid grey',
      borderRadius: '8px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      paddingTop: '1vh',
      paddingBottom: '1vh',
      //width: '100%',
      textAlign:'center'
    }}>
      <ThemeProvider theme={theme}>
        <Typography variant="h4">{currentEntry.name}</Typography>
      </ThemeProvider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {currentEntry?.value ? (
          <CircularProgress
            variant="determinate"
            value={(currentRemainingTime / (currentEntry.value * 60)) * 100 || 0}
            size={200}
            sx={{ opacity: isRunning ? 1 : 0.5 }}
          />
        ) : (
          <Typography>Invalid Timer Entry</Typography>
        )}
        <ThemeProvider theme={theme}>
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
          }}>
            {Math.floor(currentRemainingTime / 60)}:{String(currentRemainingTime % 60).padStart(2, '0')}
          </Typography>
        </ThemeProvider>
        
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mr:2, ml:2 }}>
        <Button
          variant="outlined"
          color={userType ? 'error' : 'primary'}
          onClick={handlePrevious}
          disabled={currentEntryIndex === 0}
          
        >
          Vorheriges Thema
        </Button>
        <Button
          variant="contained"
          color={userType ? 'error' : 'primary'}
          onClick={() => setIsRunning((prev) => !prev)}
          disabled={entries.length === 0}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          color={userType ? 'error' : 'primary'}
          onClick={currentEntryIndex === entries.length - 1 ? handleEndClick : handleNext}
          disabled={entries.length === 0}
        >
          {currentEntryIndex === entries.length - 1 ? 'Meeting beenden' : 'Nächstes Thema'}
        </Button>
      </Box>
    </Box>
    /**
    <Box
      sx={{
        textAlign: 'center',
        maxWidth: 400,
        margin: '0 auto',
        padding: 4,
        border: '2px',
        borderRadius: 3,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4">{currentEntry.name}</Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {currentEntry?.value ? (
          <CircularProgress
            variant="determinate"
            value={(currentRemainingTime / (currentEntry.value * 60)) * 100 || 0}
            size={200}
            sx={{ opacity: isRunning ? 1 : 0.5 }}
          />
        ) : (
          <Typography>Invalid Timer Entry</Typography>
        )}
        <Typography
          variant="h4"
          sx={{
            position: 'absolute',
          }}
        >
          {Math.floor(currentRemainingTime / 60)}:{String(currentRemainingTime % 60).padStart(2, '0')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button
          variant="outlined"
          color={userType ? 'error' : 'primary'}
          onClick={handlePrevious}
          disabled={currentEntryIndex === 0}
          
        >
          Vorheriges Thema
        </Button>
        <Button
          variant="contained"
          color={userType ? 'error' : 'primary'}
          onClick={() => setIsRunning((prev) => !prev)}
          disabled={entries.length === 0}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          color={userType ? 'error' : 'primary'}
          onClick={currentEntryIndex === entries.length - 1 ? handleEndClick : handleNext}
          disabled={entries.length === 0}
        >
          {currentEntryIndex === entries.length - 1 ? 'Meeting beenden' : 'Nächstes Thema'}
        </Button>
      </Box>
    </Box>
    */
  );
}
