import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import PdfViewerEx from '../components/PdfViewerEx';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft } from '@mui/icons-material';
import TimerComponent from '../components/TimerComponent';
import ParticipantList from '../components/ParticipantList';

export default function CSlideView() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/coordinator/main');
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
              <TimerComponent viewType='slide'/>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid size={{xs:12, sm:12, md:12, lg:10}}>
            <PdfViewerEx isCoordinator={true} />
          </Grid>
          <Grid size={{xs:12, sm:12, md:12, lg:2}}>
            
            <Box sx={{justifyContent:'center', paddingLeft:10}}>
              <Tooltip title="Zurück zur Hauptansicht">
                <IconButton onClick={handleBackClick} aria-label="Zurück zur Hauptansicht">
                  <ChevronLeft color='primary' sx={{ fontSize: '90px' }} />
                </IconButton>
              </Tooltip>
            </Box>
            <ParticipantList isSlideView={true} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
