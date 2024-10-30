import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';

type NotesProps = {
  isParticipant?: boolean;
};

const NOTES_STORAGE_KEY = 'userNotes';

export default function Notes({ isParticipant = false }: NotesProps) {
  const [note, setNote] = useState('');

  // Load notes from sessionStorage on component mount
  useEffect(() => {
    const storedNote = sessionStorage.getItem(NOTES_STORAGE_KEY);
    if (storedNote) {
      setNote(storedNote);
    }
  }, []);

  // Save notes to sessionStorage whenever they change
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
    URL.revokeObjectURL(url); // Clean up the object URL
  };

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 1, height: '100%', width: '100%' }}>
      <TextField
        label="Notizen"
        multiline
        rows={isParticipant ? 14 : 10}
        variant="outlined"
        fullWidth
        value={note}
        onChange={(e) => setNote(e.target.value)}
        sx={{ height: '100%' }}
      />
      <Tooltip title="Download Notes">
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
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
