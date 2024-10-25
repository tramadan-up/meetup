import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function LoginView() {
  const navigate = useNavigate();
  const handleCoordinatorClick = () => {
    navigate('/coordinator');
  };
  const handleParticipantClick = () => {
    navigate('/participant');
  };

  return (
    <Box sx={{ flex: 1, paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '1vh' }}>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={5} display="flex" justifyContent="center" alignItems="stretch" flex={1} minHeight="90vh" flexWrap="wrap">
          <Grid container size="auto" display="flex" justifyContent="center" alignItems="stretch" flex={2}>
            <Grid size={2} display="flex" justifyContent="center" alignItems="center" flex={1}>
              <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '75%', width: '75%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <Typography variant="h6">Cognitive Walkthrough Intro</Typography>
                <Typography>CW Intro Component</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} >
            <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
              <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '75%', width: '75%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <Typography variant="h6">Login</Typography>
                <Typography>Login Component</Typography>
                <button onClick={handleCoordinatorClick}>Create Meeting as Coordinator</button>
                <button onClick={handleParticipantClick}>Join a Meeting as Participant</button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box >
    </Box >
  );
}