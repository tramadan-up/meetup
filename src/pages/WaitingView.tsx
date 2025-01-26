import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import RankableItemList from '../components/RankableItemList';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const defaultEntries = [
  { id: '1', name: 'Thema 1', value: 0 },
  { id: '2', name: 'Thema 2', value: 0 },
  { id: '3', name: 'Thema 3', value: 0 },
  { id: '4', name: 'Thema 4', value: 0 },
];

export default function WaitingView() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStartClick = () => {
    navigate('/participant/main');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSubmitRanking = () => {
    setIsSubmitted(true);
  };

  return (
    <Box sx={{
      flex:1,
      paddingLeft: '5vw',
      paddingRight: '5vw',
      paddingTop: '1vh',
      height:'90vh',
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      textAlign:'center',
    }}>
      <Grid container direction="row">
      <Grid size={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}></Grid>
      <Grid size={{ xs: 10, sm: 8, md: 6, lg:6, xl: 6 }}>
        <Box sx={{
          border: '1px solid grey',
          borderRadius: '8px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          padding:2,
          display:'flex',
          minWidth:'20vw',
          minHeight:'20vh'
        }}>
      {!isSubmitted ? (
        <>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:12, md:12, lg:12}}>
            <ThemeProvider theme={theme}>
              <Typography variant="h5" gutterBottom>
                Ranking der einzelnen Themen
              </Typography>
            </ThemeProvider>
          </Grid>
          <Grid size={{xs:12, sm:12, md:12, lg:12}}>
            <RankableItemList entries={defaultEntries} />
          </Grid>
          <Grid size={{xs:12, sm:12, md:12, lg:12}}>
            <Button 
              variant="contained"
              onClick={handleSubmitRanking}
            >
              Ranking abgeben
            </Button>
            <Button 
              variant="outlined"
              color='error'
              onClick={handleBackClick}
            >
              Zurück zum Login
            </Button>
          </Grid>
        </Grid>
        </>
        ) : (
          <></>
        )}
        {isSubmitted && (
          <Grid container>
          <Grid size={{xs:12, sm:12, md:12, lg:12}}>
            <ThemeProvider theme={theme}>
              <Typography variant="h5">
                Bitte warten, das Meeting startet in Kürze...
              </Typography>
            </ThemeProvider>
          </Grid>
          <Grid>
          <Box sx={{ marginTop: 10, display: 'flex', gap: 3, padding:2 }}>
            <Button 
              variant="outlined"
              color='error'
              onClick={handleStartClick}
            >
              Meeting starten
            </Button>
            <Button 
              variant="outlined"
              color='error'
              onClick={handleBackClick}
            >
              Zurück zum Login
            </Button>
          </Box>
          </Grid>
        </Grid>
          
        )}
        </Box>
      </Grid>
      <Grid size={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}></Grid>
      </Grid>
    </Box>

    /** 
    <Box sx={{ flex: 1, paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '1vh' }}>
      <Box sx={{ flex: 1 }}>
        <Grid
          container
          spacing={5}
          display="flex"
          justifyContent="center"
          alignItems="stretch"
          flex={1}
          minHeight="90vh"
          flexWrap="wrap"
        >
          <Grid container size="auto" display="flex" justifyContent="center" alignItems="stretch" flex={1}>
            <Grid size="grow" display="flex" justifyContent="center" alignItems="center" flex={1}>
              <Box
                sx={{
                  border: '1px solid grey',
                  borderRadius: '8px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  height: '85%',
                  maxWidth: '50vw',
                  flex: 1,
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
              >
                {!isSubmitted ? (
                  <>
                    <Typography variant="h5" gutterBottom>
                      Ranking der einzelnen Themen
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        margin: '0 auto',
                        padding: 5,
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 1,
                        minWidth: '25vw',
                      }}
                    >
                      <RankableItemList entries={defaultEntries} />
                    </Box>
                    <Button 
                      variant="contained"
                      onClick={handleSubmitRanking}
                    >
                      Ranking abgeben
                    </Button>
                    <Button 
                      variant="outlined"
                      color='error'
                      onClick={handleBackClick}
                    >
                      Zurück zum Login
                    </Button>
                  </>
                ) : (
                  <Typography variant="h5">
                    Bitte warten, das Meeting startet in Kürze...
                  </Typography>
                )}
                {isSubmitted && (
                  <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
                    <Button 
                      variant="outlined"
                      color='error'
                      onClick={handleStartClick}
                    >
                      Meeting starten
                    </Button>
                    <Button 
                      variant="outlined"
                      color='error'
                      onClick={handleBackClick}
                    >
                      Zurück zum Login
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
    */
  );
}
