import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function IntroTextDisplay() {
    const handleClearSessionStorage = () => {
        sessionStorage.clear();
    };

    return (
        <Box sx={{
            border: '1px solid grey',
            borderRadius: '8px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Stack direction="column" spacing={3} sx={{ height: '90%', width:'75%', paddingTop: '2vh', paddingBottom: '2vh' }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4" textAlign={"center"}>Meeting App Prototyp</Typography>
                    <Typography variant="h6">Rote Buttons dienen ausschließlich zum Navigieren und sind nicht Teil der App.</Typography>
                    <Typography variant="h6">Erklärung/zusätzlicher Text</Typography>
                    <Typography variant="h4">Code</Typography>
                    <Typography variant="h6">Koordinator: 111</Typography>
                    <Typography variant="h6">Teilnehmer: 666</Typography>
                </ThemeProvider>
                <Button variant='outlined' color='error' onClick={handleClearSessionStorage} sx={{width: '25%'}}>
                    Session storage löschen
                </Button>
            </Stack>
        </Box>
        
        /** 
        <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'left', p: 2, height: '75%', width: '75%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="column" spacing={3} sx={{ height: '90%', width: '75%' }}>
                <Typography variant="h4" textAlign="center">Meeting App Prototyp</Typography>
                <Typography variant="h6">Rote Buttons dienen ausschließlich zum Navigieren und sind nicht Teil der App.</Typography>
                <Typography variant="h6">Erklärung/zusätzlicher Text</Typography>
                <Typography variant="h4">Code</Typography>
                <Typography variant="h6">Koordinator: 111</Typography>
                <Typography variant="h6">Teilnehmer: 666</Typography>
                <Button variant='outlined' color='error' onClick={handleClearSessionStorage} sx={{width: '25%'}}>
                    Session storage löschen
                    </Button>
            </Stack>
        </Box>
        */
    );
}
