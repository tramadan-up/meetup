import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Notes from '../components/Notes';
import PdfViewer from '../components/PdfViewer';
import ParticipantList from '../components/ParticipantList';
import TimerComponent from '../components/TimerComponent';


export default function CMainView() {
  const navigate = useNavigate();
  const handleSlideClick = () => {
    navigate('/coordinator/slides');
  };
  const handleEndClick = () => {
    navigate('/coordinator/review');
  };
  const handleBackClick = () => {
    navigate('/coordinator');
  };

  return (
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
              <button onClick={handleEndClick}>Meeting beenden</button>
              <button onClick={handleBackClick}>Züruck</button>
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
                        height: '95%',
                        width: '90%',
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
  );
}
