import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack'
import PdfViewerEx from '../components/PdfViewerEx';
import Token from '../components/Token';
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
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width:'100%'
          }}>
            <Token type="speaking" size="small" />
            <Token type="time" size="small" />
            <Token type="punishment" size="small" />
            <Tooltip title="Back to Main View">
              <IconButton onClick={handleBackClick} aria-label="Back to MainView">
                <ChevronLeft sx={{ fontSize: '70px' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>


    </Box>




    /** 
    <Box sx={{ flex: 1, paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '1vh' }}>
      <Grid minHeight="5vh">
        <Box sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '8px', textAlign: 'center', color: 'black' }}>
            <Toolbar>
              <TimerComponent userType={true} viewType='slide'/>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={5} display="flex" justifyContent="center" alignItems="stretch" flex={1} minHeight="90vh" flexWrap="wrap">
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={6}>
            <Stack direction="column" spacing={1} display="flex" justifyContent="center" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={10}>
                <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '90%', width: '90%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <PdfViewerEx />
                </Box>
              </Grid>
            </Stack>
          </Grid>
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} >
            <Stack direction="column" spacing={1} display="flex" justifyContent="center" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '90%', width: '90%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <Stack direction="column" display="flex" justifyContent="center" alignItems="center" spacing={10} paddingTop={10}>
                    <Token type="speaking" size="small" />
                    <Token type="time" size="small" />
                    <Token type="punishment" size="small" />
                    <Tooltip title="Back to Main View">
                      <IconButton onClick={handleBackClick} aria-label="Back to MainView">
                        <ChevronLeft sx={{ fontSize: '70px' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box >
    </Box >
    */
  );
}
