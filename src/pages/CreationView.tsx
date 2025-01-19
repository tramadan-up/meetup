import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import CreationForm from '../components/CreationForm'

export default function CreationView() {

  return (
    <Box sx={{
      flex:1,
      paddingLeft: '5vw',
      paddingRight: '5vw',
      paddingTop: '5vh',
      justifyContent: 'center',
      alignItems:'center'
    }}>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        <Grid size={{ xs: 12, sm: 12, md: 10, lg: 8, xl: 6 }}>
          <CreationForm />
        </Grid>
      </Grid>
    </Box>
    /** 
    <Box sx={{ flex: 1, paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '1vh' }}>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={5} display="flex" justifyContent="center" alignItems="stretch" flex={1} minHeight="90vh" flexWrap="wrap">
          <Grid container size="auto" display="flex" justifyContent="center" alignItems="stretch" flex={1}>
            <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1} >
              <CreationForm />
            </Grid>
          </Grid>
        </Grid>
      </Box >
    </Box >
    */
  );
}
