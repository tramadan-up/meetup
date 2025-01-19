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
    

    /** 
    *<Box sx={{ flex: 1, paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '1vh' }}>
    *  <Box sx={{ flex: 1 }}>
    *    <Grid container spacing={5} display="flex" justifyContent="center" alignItems="stretch" flex={1} minHeight="90vh" flexWrap="wrap">
    *      <Grid container size="auto" display="flex" justifyContent="center" alignItems="stretch" flex={2}>
    *        <Grid size={2} display="flex" justifyContent="center" alignItems="center" flex={1}>
    *          <IntroTextDisplay />
    *        </Grid>
    *      </Grid>
    *      <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} >
    *        <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
    *          <LoginForm />
    *        </Grid>
    *      </Grid>
    *    </Grid>
    *  </Box >
    * </Box >
    */
  );
}
