import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'


export default function CSlideView() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/coordinator/main');
  };

  return (
    <Box sx={{ flex: 1, paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '1vh' }}>
      <Grid minHeight="5vh">
        <Box sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '8px', textAlign: 'center', color: 'black' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Countdowntimer, Zurück-Button
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={5} display="flex" justifyContent="center" alignItems="stretch" flex={1} minHeight="90vh" flexWrap="wrap">
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={6}>
            <Stack direction="column" spacing={1} display="flex" justifyContent="center" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={10}>
                <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '90%', width: '90%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <Typography variant="h6">Slides</Typography>
                  <Typography>Slides Component</Typography>
                </Box>
              </Grid>
            </Stack>
          </Grid>
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} >
            <Stack direction="column" spacing={1} display="flex" justifyContent="center" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '90%', width: '90%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <Typography variant="h6">Token/Navigation</Typography>
                  <Typography>Token/Navigation Component</Typography>
                  <button onClick={handleBackClick}>Back to Main View</button>
                </Box>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box >
    </Box >
  );
}
