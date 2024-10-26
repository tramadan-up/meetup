import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableItem from './SortableItem'
import TokenForm from './TokenForm'
import PdfUploader from './PdfUploader'
import MeetingTime from './MeetingTime'


type Entry = {
  id: string;
  name: string;
  value: number;
};

const MIN_ENTRIES = 4;
const MAX_ENTRIES = 5;
const ENTRIES_STORAGE_KEY = 'entries';
const MEETING_NAME_STORAGE_KEY = 'meetingName';
const SPEAKING_TOKENS_KEY = 'speakingTokens';
const TIMER_TOKENS_KEY = 'timerTokens';

export default function CreationForm() {
  // Stored Values
  const [name, setName] = useState('');
  const [meetingName, setMeetingName] = useState('Meeting Name');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [speakingTokens, setSpeakingTokens] = useState<number>(
    parseInt(sessionStorage.getItem(SPEAKING_TOKENS_KEY) || '3', 10)
  );
  const [timerTokens, setTimerTokens] = useState<number>(
    parseInt(sessionStorage.getItem(TIMER_TOKENS_KEY) || '3', 10)
  );


  // Navigation
  const navigate = useNavigate();
  const handleCreationClick = () => {
    navigate('/coordinator/main');
  };
  const handleBackClick = () => {
    navigate('/');
  };

  // Load values from sessionStorage
  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }

    const storedMeetingName = sessionStorage.getItem(MEETING_NAME_STORAGE_KEY);
    if (storedMeetingName) {
      setMeetingName(storedMeetingName);
    }

    const storedEntries = sessionStorage.getItem(ENTRIES_STORAGE_KEY);
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      if (Array.isArray(parsedEntries) && parsedEntries.length > 0) {
        setEntries(parsedEntries);
      } else {
        setDefaultEntries();
      }
    } else {
      setDefaultEntries();
    }
  }, []);

  // Save meeting Name to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(MEETING_NAME_STORAGE_KEY, meetingName);
  }, [meetingName]);

  // Save entries to sessionStorage
  useEffect(() => {
    if (entries.length > 0) {
      sessionStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries]);

  // Provide default Entries
  const setDefaultEntries = () => {
    const defaultEntries: Entry[] = [
      { id: '1', name: 'Einleitung', value: 15 },
      { id: '2', name: 'Präsentation 1', value: 15 },
      { id: '3', name: 'Präsentation 2', value: 15 },
      { id: '4', name: 'Diskussion', value: 15 },
    ];
    setEntries(defaultEntries);
    sessionStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(defaultEntries));
  };

  const handleMeetingNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingName(event.target.value);
  };

  // Entry utility
  const saveNewEntry = (newEntry: { name: string; value: number }) => {
    setEntries([...entries, { id: `${entries.length + 1}`, ...newEntry }]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > MIN_ENTRIES) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const changeEntryName = (id: string, newName: string) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, name: newName } : entry)));
  };

  const changeEntryValue = (id: string, newValue: number) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, value: newValue } : entry)));
  };

  // Drag and Drop utility
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = entries.findIndex((entry) => entry.id === active.id);
      const newIndex = entries.findIndex((entry) => entry.id === over.id);
      setEntries(arrayMove(entries, oldIndex, newIndex));
    }
  };

  // Token change utility
  useEffect(() => {
    sessionStorage.setItem(SPEAKING_TOKENS_KEY, speakingTokens.toString());
    sessionStorage.setItem(TIMER_TOKENS_KEY, timerTokens.toString());
  }, [speakingTokens, timerTokens]);

  // Auto adjust values
  const onAutoClick = () => {
    if (entries.length === 5) {
      const updatedEntries = entries.map((entry, index) => {
        switch (index) {
          case 0:
            return { ...entry, value: 5 };
          case 1:
            return { ...entry, value: 15 };
          case 2:
            return { ...entry, value: 15 };
          case 3:
            return { ...entry, value: 15 };
          case 4:
            return { ...entry, value: 10 };
          default:
            return entry;
        }
      });
      setEntries(updatedEntries);
    }
  };

  return (
    <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '85%', maxWidth: '50vw', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction="column" spacing={5}>
        <Grid>
          <Typography>Willkommen, {name}!</Typography>

        </Grid>
        <Grid>
          <TextField
            label="Meeting Name"
            value={meetingName}
            onChange={handleMeetingNameChange}
            variant="outlined"
            fullWidth
            sx={{ maxWidth: 400 }}
          />
        </Grid>
        <Grid spacing={4} height="60%" width="100%">
          <Stack direction="row" spacing={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                margin: '0 auto',
                padding: 2,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1,
                minHeight: '400px',
              }}
            >
              <Typography>Einteilung des Meetings:</Typography>
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={entries} strategy={verticalListSortingStrategy}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: 400, mt: 2 }}>
                    {entries.map((entry) => (
                      <SortableItem
                        key={entry.id}
                        entry={entry}
                        onNameChange={changeEntryName}
                        onValueChange={changeEntryValue}
                        onRemove={removeEntry}
                        isRemoveDisabled={entries.length <= MIN_ENTRIES}
                      />
                    ))}
                    {entries.length < MAX_ENTRIES && (
                      <SortableItem
                        entry={{ id: '', name: '', value: 15 }}
                        isNew
                        onSave={saveNewEntry}
                      />
                    )}
                  </Box>
                </SortableContext>
              </DndContext>
              <MeetingTime entries={entries} onAutoClick={onAutoClick} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                margin: '0 auto',
                padding: 2,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1,
                minHeight: '400px',
              }}
            >
              <Typography>Anzahl der Token</Typography>
              <TokenForm
                speakingTokens={speakingTokens}
                timerTokens={timerTokens}
                onTokenChange={(newSpeakingTokens, newTimerTokens) => {
                  setSpeakingTokens(newSpeakingTokens);
                  setTimerTokens(newTimerTokens);
                }}
              />
              <Typography>PDF</Typography>
              <PdfUploader />
            </Box>
          </Stack>
        </Grid>
        <Grid>
          <button onClick={handleCreationClick}>Start Meeting</button>
          <button onClick={handleBackClick}>Back to Login</button>
        </Grid>
      </Stack>
    </Box>
  );
}
