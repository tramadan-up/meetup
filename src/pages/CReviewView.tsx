import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Highscore from '../components/Highscore';
import ReviewList from '../components/ReviewList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const MEETING_NAME_STORAGE_KEY = 'meetingName';
const NOTES_STORAGE_KEY = 'userNotes';


export default function CReviewView() {
  const [meetingName, setMeetingName] = useState('Meeting Name');
  const [note, setNote] = useState('');
  const date = new Date();
  const formattedDate = date.toLocaleDateString()

  useEffect(() => {
      const storedMeetingName = sessionStorage.getItem(MEETING_NAME_STORAGE_KEY);
      if (storedMeetingName) {
          setMeetingName(storedMeetingName);
      }
  }, []);

  useEffect(() => {
    const storedNote = sessionStorage.getItem(NOTES_STORAGE_KEY);
    if (storedNote) {
        setNote(storedNote);
    }
  }, []);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/coordinator/main');
  };

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
      flex:1,
      paddingLeft: '5vw',
      paddingRight: '5vw',
      paddingTop: '1vh'
    }}>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid size={{xs:12, sm:12, md:12, lg:12}}>
          <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '8px', textAlign: 'center', color: 'black' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {meetingName} - {formattedDate}
              </Typography>
              <Tooltip title="Notizen herunterladen">
                <IconButton
                    color="primary"
                    onClick={handleDownload}
                    aria-label="Notizen herunterladen">
                    <TextSnippetIcon/>
                </IconButton>
              </Tooltip>
              <Button variant='outlined' color='error' onClick={handleBackClick}>Zurück zum Meeting</Button>
            </Toolbar>
          </AppBar>
        </Grid>
          <Grid size={{xs:12, sm:12, md:8, lg:8}}>
            <ReviewList/>
          </Grid>
          <Grid size={{xs:12, sm:12, md:4, lg:4}}>
            <Highscore/>
          </Grid>

      </Grid>
    </Box>
  );
}
