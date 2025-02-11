import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import PdfViewerEx from '../components/PdfViewerEx';
import TimeToken from '../components/TimeToken';
import SpeakingToken from '../components/SpeakingToken';
import PunishmentToken from '../components/PunishmentToken';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip';
import { ChevronLeft } from '@mui/icons-material';
import TimerComponent from '../components/TimerComponent';


export default function SlideView() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/participant/main');
  };
  return (
    <Box sx={{
      flex:1,
      paddingLeft: '5vw',
      paddingRight: '5vw',
      paddingTop: '1vh'
    }}>
      <Grid container spacing={2} direction="column">
        <Grid size={{xs:12, sm:12, md:12, lg:12}}>
          <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '100px', textAlign: 'center', color: 'black' }}>
            <Toolbar>
              <TimerComponent userType={true} viewType='slide'/>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid size={{xs:11, sm:11, md:11, lg:11}}>
            <PdfViewerEx />
          </Grid>
          <Grid size={{xs:1, sm:1, md:1, lg:1}} 
            sx={{
              border: '1px solid grey', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width:'100%',
              paddingTop:'1vh'
          }}>
            <TimeToken size="small" />
            <SpeakingToken size="small" />
            <PunishmentToken size="small" />
            <Tooltip title="Zurück zur Hauptansicht">
              <IconButton onClick={handleBackClick} aria-label="Zurück zur Hauptansicht">
                <ChevronLeft sx={{ fontSize: '70px' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
