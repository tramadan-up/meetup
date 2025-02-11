import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Notes from '../components/Notes';
import PdfViewer from '../components/PdfViewer';
import ParticipantList from '../components/ParticipantList';
import TimerComponent from '../components/TimerComponent';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const MEETING_NAME_STORAGE_KEY = 'meetingName';

export default function CMainView() {
  const [meetingName, setMeetingName] = useState('Meeting Name');
  const date = new Date();
  const formattedDate = date.toLocaleDateString()

  useEffect(() => {
    const storedMeetingName = sessionStorage.getItem(MEETING_NAME_STORAGE_KEY);
    if (storedMeetingName) {
        setMeetingName(storedMeetingName);
    }
}, []);

  const navigate = useNavigate();
  const handleEndClick = () => {
    navigate('/coordinator/review');
  };
  const handleBackClick = () => {
    navigate('/coordinator');
  };

  return (
    <Box sx={{
      flex:1,
      paddingLeft: '5vw',
      paddingRight: '5vw',
      paddingTop: '1vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Grid container spacing={4} direction="column">
        <Grid size={{xs:12, sm:12, md:12, lg:12}}>
          <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '8px', textAlign: 'center', color: 'black' }}>
            <Toolbar>
              <ThemeProvider theme={theme}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {meetingName} - {formattedDate}
                </Typography>
              </ThemeProvider>
              <Button variant='outlined' color='error' onClick={handleEndClick}>Meeting beenden</Button>
              <Button variant='outlined' color='error' onClick={handleBackClick}>Zurück</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container spacing={3} direction="row">
          <Grid size={{xs:12, sm:12, md:8, lg:6}}>
            <PdfViewer isCoordinator={true} />
          </Grid>
          <Grid container direction="column" size={{xs:12, sm:12, md:4, lg:3}}>
            <Grid size={{xs:12, sm:12, md:12, lg:12}}>
              <TimerComponent viewType='main'/>
            </Grid>
            <Grid size={{xs:12, sm:12, md:12, lg:12}}>
              <Notes />
            </Grid>
          </Grid>
          <Grid size={{xs:12, sm:12, md:12, lg:3}}>
            <ParticipantList />
          </Grid>
        </Grid>
      </Grid>

    </Box>
  );
}
