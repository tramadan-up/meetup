import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import PdfViewer from '../components/PdfViewer';
import Notes from '../components/Notes';
import TimerComponent from '../components/TimerComponent';
import TimeToken from '../components/TimeToken';
import SpeakingToken from '../components/SpeakingToken';
import PunishmentToken from '../components/PunishmentToken';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const TIME_TOKEN_STORAGE_KEY = 'timeTokenCount';
const SPEAKING_TOKEN_STORAGE_KEY = 'speakingTokenCount';
const PUNISHMENT_TOKEN_STORAGE_KEY = 'punishmentTokenCount';

export default function MainView() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString()

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const defaultCount =  4;
  const defaultPunishmentCount = 0;
  const [timeTokenCount, setTimeTokenCount] = useState<number>(() => {
    const storedTimeTokenCount = sessionStorage.getItem(TIME_TOKEN_STORAGE_KEY);
    return storedTimeTokenCount !== null ? parseInt(storedTimeTokenCount, 10) : defaultCount;
  });
  const [speakingTokenCount, setSpeakingTokenCount] = useState<number>(() => {
    const storedSpeakingTokenCount = sessionStorage.getItem(SPEAKING_TOKEN_STORAGE_KEY);
    return storedSpeakingTokenCount !== null ? parseInt(storedSpeakingTokenCount, 10) : defaultCount;
  });
  const [punishmentTokenCount, setPunishmentTokenCount] = useState<number>(() => {
    const storedPunishmentTokenCount = sessionStorage.getItem(PUNISHMENT_TOKEN_STORAGE_KEY);
    return storedPunishmentTokenCount !== null ? parseInt(storedPunishmentTokenCount, 10) : defaultPunishmentCount;
  });

  useEffect(() => {
    const syncTimeTokenCount = () => {
        const storedTimeTokenCount = sessionStorage.getItem(TIME_TOKEN_STORAGE_KEY);
        if (storedTimeTokenCount !== null) {
            setTimeTokenCount(parseInt(storedTimeTokenCount, 10));
        }
    };
    const syncSpeakingTokenCount = () => {
      const storedSpeakingTokenCount = sessionStorage.getItem(SPEAKING_TOKEN_STORAGE_KEY);
      if (storedSpeakingTokenCount !== null) {
          setSpeakingTokenCount(parseInt(storedSpeakingTokenCount, 10));
      }
    };
    const syncPunishmentTokenCount = () => {
      const storedPunishmentTokenCount = sessionStorage.getItem(PUNISHMENT_TOKEN_STORAGE_KEY);
      if (storedPunishmentTokenCount !== null) {
          setPunishmentTokenCount(parseInt(storedPunishmentTokenCount, 10));
      }
    };

    window.addEventListener('timeToken:update', syncTimeTokenCount);
    window.addEventListener('speakingToken:update', syncSpeakingTokenCount);
    window.addEventListener('punishmentToken:update', syncPunishmentTokenCount);
    return () => {
        window.removeEventListener('timeToken:update', syncTimeTokenCount);
        window.removeEventListener('speakingToken:update', syncSpeakingTokenCount);
        window.removeEventListener('punishmentToken:update', syncPunishmentTokenCount);
    };
  }, []);


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
                  Pausenreform - {formattedDate}
                </Typography>
              </ThemeProvider>
              
              <Button variant='outlined' color='error' onClick={handleBackClick}>Zurück</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container direction="row" spacing={4}>
          <Grid container direction="column" spacing={9} size={{xs:12, sm:12, md:6, lg:6, xl:3.5}} sx={{alignItems:'center', justifyContent:'center', height:'100%'}}>
          <Grid sx={{
              border: '1px solid grey', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width:'100%',
              paddingLeft: '1vw',
              paddingRight: '1vw',
              paddingTop: '1vh',
              paddingBottom: '1vh'
              }}>
              <ThemeProvider theme={theme}>
                <Typography variant="h4">Zeittoken: {timeTokenCount} <Tooltip title="Ein Zeittoken verlängert den Timer eines Themas um eine vorgegebene Zeit. [Diese Funktion ist nicht vollständig implementiert.]"><Badge><InfoIcon color='primary' /></Badge></Tooltip></Typography>
              </ThemeProvider>
              <TimeToken size="big" />
            </Grid>
            <Grid sx={{
              border: '1px solid grey', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width:'100%',
              paddingLeft: '1vw',
              paddingRight: '1vw',
              paddingTop: '1vh',
              paddingBottom: '1vh'
              }}>
              <ThemeProvider theme={theme}>
                <Typography variant="h4">Redetoken: {speakingTokenCount} <Tooltip title="Ein Redetoken singalisiert dem/der Koordinator/in, dass du zur Diskussion beitragen möchtest."><Badge><InfoIcon color='primary' /></Badge></Tooltip></Typography>
              </ThemeProvider>
              <SpeakingToken size="big" />
            </Grid>
            <Grid sx={{
              border: '1px solid grey', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width:'100%',
              paddingLeft: '1vw',
              paddingRight: '1vw',
              paddingTop: '1vh',
              paddingBottom: '1vh'
              }}>
              <ThemeProvider theme={theme}>
                <Typography variant="h4">Straftoken: {punishmentTokenCount} <Tooltip title="Ein Straftoken wird von dem/der Koordinator/in für unangebrachtes Verhalten vergeben."><Badge><InfoIcon color='primary' /></Badge></Tooltip></Typography>
              </ThemeProvider>
              <PunishmentToken size="big" />
            </Grid>
          </Grid>


          <Grid container direction="column" spacing={6} size={{xs:12, sm:12, md:6, lg:6, xl:2.5}} sx={{alignItems:'center', justifyContent:'center', height:'100%'}}>
            <Grid sx={{width:'100%'}}>
              <TimerComponent userType={true} viewType='main'/>
            </Grid>
            <Grid sx={{width:'100%'}}>
              <Notes isParticipant={true} />
            </Grid>
          </Grid>


          <Grid container direction="column" spacing={4} size={{xs:12, sm:12, md:12, lg:12, xl:6}} sx={{ justifyContent:'center', height:'100%'}}>
            <Grid sx={{height:'100%'}}>
              <PdfViewer />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Box>

    /**
    <Box sx={{ flex: 1, paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '1vh' }}>
      <Grid minHeight="5vh">
        <Box sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '8px', textAlign: 'center', color: 'black' }}>
            <Toolbar>
              <ThemeProvider theme={theme}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Meeting Name, Datum, etc.
                </Typography>
              </ThemeProvider>
              
              <Button variant='outlined' color='error' onClick={handleBackClick}>Zurück</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={5} display="flex" justifyContent="center" alignItems="stretch" flexGrow={1} minHeight="90vh" flexWrap="wrap">
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} marginTop={3} marginBottom={3}>
            <Stack direction="column" spacing={1} display="flex" justifyContent="space-between" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{
                          border: '1px solid grey',
                          borderRadius: '8px',
                          textAlign: 'center',
                          p: 1,
                          height: '90%',
                          width: '75%',
                          flex: 1,
                          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-start'
                          }}>
                  <Stack direction="column" spacing={8} padding={5}>
                    <Typography variant="h4">Redetoken</Typography>
                    <Token type="speaking" size="big" />
                  </Stack>
                </Box>
              </Grid>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{
                          border: '1px solid grey',
                          borderRadius: '8px',
                          textAlign: 'center',
                          p: 1,
                          height: '90%',
                          width: '75%',
                          flex: 1,
                          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-start'
                          }}>
                  <Stack direction="column" spacing={8} padding={5}>
                    <Typography variant="h4">Straftoken</Typography>
                    <Token type="punishment" size="big" />
                  </Stack>
                </Box>
              </Grid>
            </Stack>
          </Grid>
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} marginTop={3} marginBottom={3}>
            <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
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
                <TimerComponent userType={true} viewType='main'/>
                <Stack direction="column" spacing={8} padding={5}>
                    <Typography variant="h4">Zeittoken</Typography>
                    <Token type="time" size="big" />
                  </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} marginTop={3} marginBottom={3}>
            <Stack direction="column" spacing={1} display="flex" justifyContent="center" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{
                          border: '1px solid grey',
                          borderRadius: '8px',
                          textAlign: 'center',
                          p: 1,
                          height: '90%',
                          width: '75%',
                          flex: 1,
                          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                          }}>
                  <PdfViewer />
                </Box>
              </Grid>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{
                          border: '1px solid grey',
                          borderRadius: '8px',
                          textAlign: 'center',
                          p: 1, height: '90%',
                          width: '75%',
                          flex: 1,
                          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                          }}>
                  <Notes isParticipant={true} />
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
