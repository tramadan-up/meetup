import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const USER_TYPE_KEY = 'userType';

export default function LoginForm() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [userType, setUserType] = useState(() => {
            const storedUserType = sessionStorage.getItem(USER_TYPE_KEY);
            return storedUserType ? JSON.parse(storedUserType) : true;
    });
    useEffect(() => {
        const syncUserType = () => {
            const storedUserType = sessionStorage.getItem(USER_TYPE_KEY);
            if (storedUserType !== null) {
                setUserType(JSON.parse(storedUserType));
            }
        };

        window.addEventListener('storage', syncUserType);
        return () => {
            window.removeEventListener('storage', syncUserType);
        };
    }, []);

    const toggleUserType = () => {
        const newValue = !userType;
        setUserType(newValue);
        sessionStorage.setItem(USER_TYPE_KEY, JSON.stringify(newValue));
        window.dispatchEvent(new Event('storage'));
    };

    const handleLogin = () => {
        sessionStorage.setItem('name', name);

        if (name && userType) {
            navigate('/coordinator');
        } else if (name && !userType) {
            navigate('/participant');
        } else {
            alert('Invalid code or missing name! Please enter a valid code and a name.');
        }
    };


    return (
        <Box sx={{
            border: '1px solid grey',
            borderRadius: '8px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Stack direction="column" spacing={2} sx={{ height: '90%', width: '50%', paddingTop: '2vh', paddingBottom: '2vh' }}>
                <ThemeProvider theme={theme}>
                <Typography variant="h4">Willkommen!</Typography>
                </ThemeProvider>
                <TextField
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button variant='outlined' onClick={toggleUserType}>{userType ? 'Koordinator/in' : 'Teilnehmer/in'}</Button>
                <Button
                    variant="contained"
                    onClick={handleLogin}
                >
                    Start
                </Button>
            </Stack>
        </Box>
    );
}

