import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import PdfViewer from '../components/PdfViewer';
import Notes from '../components/Notes';
import Token from '../components/Token';
import TimerComponent from '../components/TimerComponent';


export default function MainView() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };
  return (
    <Box sx={{ flex: 1, paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '1vh' }}>
      <Grid minHeight="5vh">
        <Box sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '8px', textAlign: 'center', color: 'black' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Meeting Name, Datum, etc. SCORE
              </Typography>
              <button onClick={handleBackClick}>Back to Waiting View</button>
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
  );
}
