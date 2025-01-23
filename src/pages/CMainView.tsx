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
              <Button variant='outlined' color='error' onClick={handleBackClick}>Züruck</Button>
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

    /** 
    <Box sx={{
            flex: 1,
            paddingLeft: '1%',
            paddingRight: '1%',
            paddingTop: '0.1%'
            }}>
      <Grid minHeight="1%">
        <Box sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '8px', textAlign: 'center', color: 'black' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Meeting Name, Datum, etc.
              </Typography>
              <Button variant='outlined' color='error' onClick={handleEndClick}>Meeting beenden</Button>
              <Button variant='outlined' color='error' onClick={handleBackClick}>Züruck</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Box sx={{
              flex: 1,
              paddingTop: '0.1%',
              spacing: '5',
              }}>
        <Grid container spacing={7} display="flex" justifyContent="center" alignItems="stretch" flexGrow={1} height="85%" width="100%" flexWrap="wrap">
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={2} marginTop={3} marginBottom={3}>
            <Stack direction="column" spacing={1} display="flex" justifyContent="center" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{
                        border: '1px solid grey',
                        borderRadius: '8px',
                        textAlign: 'center',
                        p: 2,
                        height: '90%',
                        width: '75%',
                        flex: 1,
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                        }}>
                  <PdfViewer isCoordinator={true} />
                </Box>
              </Grid>
            </Stack>
          </Grid>
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} marginTop={3} marginBottom={3}>
            <Stack direction="column" display="flex" justifyContent="center" alignItems="stretch" flex={1} spacing={2}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={2}>
                <Box sx={{
                        border: '1px solid grey',
                        borderRadius: '8px',
                        textAlign: 'center',
                        p: 1,
                        height: '95%',
                        width: '90%',
                        flex: 1,
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                        }}>
                  <TimerComponent viewType='main'/>
                </Box>
              </Grid>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{
                        border: '1px solid grey',
                        borderRadius: '8px',
                        p: 1,
                        height: '90%',
                        width: '90%',
                        flex: 1,
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                        }}>
                  <Notes />
                </Box>
              </Grid>
            </Stack>
          </Grid>
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} marginTop={3} marginBottom={3}>
            <Stack direction="column" spacing={1} display="flex" justifyContent="center" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{
                        border: '1px solid grey',
                        borderRadius: '8px',
                        textAlign: 'center',
                        p: 2, height: '95%',
                        width: '90%',
                        flex: 1,
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                        }}>
                  <ParticipantList />
                </Box>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box >
    </Box >
    */
  );
}
