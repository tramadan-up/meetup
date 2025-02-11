import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

type NotesProps = {
    isParticipant?: boolean;
};

const NOTES_STORAGE_KEY = 'userNotes';

export default function Notes({ isParticipant = false }: NotesProps) {
    const [note, setNote] = useState('');

    useEffect(() => {
        const storedNote = sessionStorage.getItem(NOTES_STORAGE_KEY);
        if (storedNote) {
            setNote(storedNote);
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem(NOTES_STORAGE_KEY, note);
    }, [note]);

    const handleDownload = () => {
        const blob = new Blob([note], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'note.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{
            position: 'relative',
            border: '1px solid grey',
            borderRadius: '8px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}>
            <TextField
                label="Notizen"
                multiline
                rows={isParticipant ? 10 : 10}
                variant="outlined"
                fullWidth
                value={note}
                onChange={(e) => setNote(e.target.value)}
                sx={{ height: '100%' }}
            />
            <Tooltip title="Notizen herunterladen">
                <IconButton
                    color="primary"
                    onClick={handleDownload}
                    aria-label="Download Notes"
                    sx={{
                        position: 'absolute',
                        bottom: 15,
                        right: 8,
                    }}
                >
                    <TextSnippetIcon/>
                </IconButton>
            </Tooltip>
        </Box>
    );
}
