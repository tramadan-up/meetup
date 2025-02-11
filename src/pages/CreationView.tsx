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
  );
}
