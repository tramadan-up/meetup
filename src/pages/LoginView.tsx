import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import IntroTextDisplay from '../components/IntroTextDisplay';
import LoginForm from '../components/LoginForm';

export default function LoginView() {

  return (
    <Box sx={{
      flex:1,
      paddingLeft: '5vw',
      paddingRight: '5vw',
      paddingTop: '1vh'
    }}>
      <Grid container spacing={5} flexWrap="wrap-reverse" display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
        <Grid size={{ xs: 12, md: 8, lg: 6 }}>
          <IntroTextDisplay />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <LoginForm />
        </Grid>
      </Grid>
    </Box>
  );
}
