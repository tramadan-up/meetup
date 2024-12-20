import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack'
import PdfViewerEx from '../components/PdfViewerEx';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft } from '@mui/icons-material';
import TimerComponent from '../components/TimerComponent';

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
              <TimerComponent viewType='slide'/>
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
                  <PdfViewerEx isCoordinator={true} />
                </Box>
              </Grid>
            </Stack>
          </Grid>
          <Grid container size="grow" display="flex" justifyContent="center" alignItems="stretch" flex={1} >
            <Stack direction="column" spacing={1} display="flex" justifyContent="center" alignItems="stretch" flex={1}>
              <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
                <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '90%', width: '90%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <Tooltip title="Back to Main View">
                    <IconButton onClick={handleBackClick} aria-label="Back to MainView">
                      <ChevronLeft sx={{ fontSize: '70px' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box >
    </Box >
  );
}
