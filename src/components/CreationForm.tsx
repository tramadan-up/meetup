import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableItem from './SortableItem'
import TokenForm from './TokenForm'
import PdfUploader from './PdfUploader'
import MeetingTime from './MeetingTime'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

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
const SHOW_VALUES_KEY = 'showValues';

export default function CreationForm() {
    const [name, setName] = useState('');
    const [meetingName, setMeetingName] = useState('Team meeting');
    const [entries, setEntries] = useState<Entry[]>([]);
    const [speakingTokens, setSpeakingTokens] = useState<number>(
        parseInt(sessionStorage.getItem(SPEAKING_TOKENS_KEY) || '3', 10)
    );
    const [timerTokens, setTimerTokens] = useState<number>(
        parseInt(sessionStorage.getItem(TIMER_TOKENS_KEY) || '3', 10)
    );
    const [showValues, setShowValues] = useState(() => {
        const storedShowValues = sessionStorage.getItem(SHOW_VALUES_KEY);
        return storedShowValues ? JSON.parse(storedShowValues) : true;
    });


    const navigate = useNavigate();
    const handleCreationClick = () => {
        navigate('/coordinator/main');
    };
    const handleBackClick = () => {
        navigate('/');
    };

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

    useEffect(() => {
        sessionStorage.setItem(SHOW_VALUES_KEY, JSON.stringify(showValues));
    }, [showValues]);

    useEffect(() => {
        sessionStorage.setItem(MEETING_NAME_STORAGE_KEY, meetingName);
    }, [meetingName]);

    useEffect(() => {
        if (entries.length > 0) {
            sessionStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries));
        }
    }, [entries]);

    const setDefaultEntries = () => {
        const defaultEntries: Entry[] = [
            { id: '1', name: 'Thema 1', value: 15 },
            { id: '2', name: 'Thema 2', value: 15 },
            { id: '3', name: 'Thema 3', value: 15 },
            { id: '4', name: 'Thema 4', value: 15 },
        ];
        setEntries(defaultEntries);
        sessionStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(defaultEntries));
    };

    const handleMeetingNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingName(event.target.value);
    };

    const saveNewEntry = (newEntry: { name: string; value: number }) => {
        setEntries([...entries, { id: `${entries.length + 1}`, ...newEntry }]);
    };
    const removeEntry = (id: string) => {
        if (entries.length > MIN_ENTRIES) {
            const updatedEntries = entries
                .filter((entry) => entry.id !== id)
                .map((entry, index) => ({
                    ...entry,
                    id: (index + 1).toString(),
                }));
            setEntries(updatedEntries);
        }
    };



    const changeEntryName = (id: string, newName: string) => {
        setEntries(entries.map((entry) => (entry.id === id ? { ...entry, name: newName } : entry)));
    };

    const changeEntryValue = (id: string, newValue: number) => {
        setEntries(entries.map((entry) => (entry.id === id ? { ...entry, value: newValue } : entry)));
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = entries.findIndex((entry) => entry.id === active.id);
            const newIndex = entries.findIndex((entry) => entry.id === over.id);
            setEntries(arrayMove(entries, oldIndex, newIndex));
        }
    };

    useEffect(() => {
        sessionStorage.setItem(SPEAKING_TOKENS_KEY, speakingTokens.toString());
        sessionStorage.setItem(TIMER_TOKENS_KEY, timerTokens.toString());
    }, [speakingTokens, timerTokens]);

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
        else if (entries.length === 4) {
            const updatedEntries = entries.map((entry, index) => {
                switch (index) {
                    case 0:
                        return { ...entry, value: 15 };
                    case 1:
                        return { ...entry, value: 15 };
                    case 2:
                        return { ...entry, value: 15 };
                    case 3:
                        return { ...entry, value: 15 };
                    default:
                        return entry;
                }
            });
            setEntries(updatedEntries);
        }
    };
    
    const toggleShowValues = () => {
        setShowValues((prev: boolean) => !prev);
    };

    return (

        <Box sx={{
            border: '1px solid grey',
            borderRadius: '8px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            paddingTop: '1vh',
            paddingBottom: '1vh',
        }}>
            <Grid container spacing={5} flexWrap="wrap" display="flex" justifyContent="center" alignItems="center">
                <Grid size={{xs:12, md:4, lg:6}} textAlign="center">
                    <ThemeProvider theme={theme}>
                        <Typography variant="h5">Willkommen, {name}!</Typography>
                    </ThemeProvider>
                    <Box sx={{ml:2, mr:2}}>
                        <TextField
                            label="Meeting Name"
                            value={meetingName}
                            onChange={handleMeetingNameChange}
                            variant="outlined"
                            fullWidth
                            sx={{ maxWidth: 400 }}
                        />
                    </Box>
                </Grid>
                <Grid container spacing={6} flexWrap="wrap" display="flex" justifyContent="center" alignItems="center" textAlign="center">
                    <Grid container spacing={1} size={{xs:12, md:8, lg:7}} direction="column" display="flex" justifyContent="center">
                        <Box sx={{ml:2, mr:2}}>
                            <MeetingTime entries={entries} onAutoClick={onAutoClick} showValues={showValues} />
                        </Box>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h6">Einteilung des Meetings</Typography>
                        </ThemeProvider>
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={entries} strategy={verticalListSortingStrategy}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1, ml:2, mr:2 }}>
                                    {entries.map((entry) => (
                                        <SortableItem
                                            key={`${entry.id}-${entries.length}`}
                                            entry={showValues ? entry : { id: entry.id, name: entry.name }}
                                            onNameChange={changeEntryName}
                                            onValueChange={changeEntryValue}
                                            onRemove={() => removeEntry(entry.id)}
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
                        <Box textAlign='center'>
                            <Tooltip sx={{fontSize:'15px'}} title={showValues ? "Auto-Funktion: überlasse die Berechnungen unserer App. [Diese Funktion ist nicht vollständig implementiert.]" : "Manuell: für volle Kontrolle."}>
                                <Button variant="contained" onClick={toggleShowValues} sx={{width: '25%'}}>
                                    {showValues ? 'Auto' : 'Manuell'}
                                </Button>
                            </Tooltip>
                        </Box>
                        
                    </Grid>
                    <Grid size={{xs:12, md:6, lg:5}}>
                        <Box sx={{ml:2, mr:2}}>
                            <ThemeProvider theme={theme}>
                                <Typography variant="h6">Anzahl der Token</Typography>
                            </ThemeProvider>
                            <TokenForm
                                speakingTokens={speakingTokens}
                                timerTokens={timerTokens}
                                onTokenChange={(newSpeakingTokens, newTimerTokens) => {
                                    setSpeakingTokens(newSpeakingTokens);
                                    setTimerTokens(newTimerTokens);
                                }}
                            />
                        </Box>
                        <Box sx={{ml:2, mr:2, paddingTop:2}}>
                            <ThemeProvider theme={theme}>
                                <Typography variant="h6">PDF Upload</Typography>
                            </ThemeProvider>
                            <PdfUploader />
                        </Box>
                    </Grid>
                </Grid>
                <Grid>
                    <Box sx={{ml:2, mr:2, textAlign:'center'}}>
                        <Button variant='contained' color='primary' onClick={handleCreationClick} sx={{width: '45%'}}>Meeting starten</Button>
                        <Button variant='outlined' color='error' onClick={handleBackClick} sx={{width: '45%'}}>Zurück zum Login</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>


        /** 
        <Box sx={{
                border: '1px solid grey',
                borderRadius: '8px',
                textAlign: 'center',
                p: 2,
                height: '95%',
                maxWidth: '50vw',
                flex: 1,
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5vh'
                }}>
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
                <Grid height="60%" width="100%" minWidth="30vw">
                    <Stack direction="row" spacing={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                                margin: '0 auto',
                                padding: 2,
                                backgroundColor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 1,
                                minHeight: '400px',
                                minWidth: '25vw'
                            }}
                        >
                            <MeetingTime entries={entries} onAutoClick={onAutoClick} showValues={showValues} />
                            <Typography>Einteilung des Meetings:</Typography>
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={entries} strategy={verticalListSortingStrategy}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: 400, mt: 2 }}>
                                        {entries.map((entry) => (
                                            <SortableItem
                                                key={`${entry.id}-${entries.length}`}
                                                entry={showValues ? entry : { id: entry.id, name: entry.name }}
                                                onNameChange={changeEntryName}
                                                onValueChange={changeEntryValue}
                                                onRemove={() => removeEntry(entry.id)}
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
                            <Button variant="contained" onClick={toggleShowValues}>
                                {showValues ? 'Smart' : 'Basic'}
                            </Button>
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
                    <Button variant='contained' color='primary' onClick={handleCreationClick}>Meeting starten</Button>
                    <Button variant='outlined' color='error' onClick={handleBackClick}>Zurück zum Login</Button>
                </Grid>
            </Stack>
        </Box>
        */
    );
}
