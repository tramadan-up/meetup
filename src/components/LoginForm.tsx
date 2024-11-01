import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function LoginForm() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('code', code);

        if (name && code === '111111') {
            navigate('/coordinator');
        } else if (name && code === '666666') {
            navigate('/participant');
        } else {
            alert('Invalid code or missing name! Please enter a valid code and a name.');
        }
    };

    return (
        <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'center', p: 2, height: '75%', width: '75%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="column" spacing={2} sx={{ height: '50%', width: '50%' }}>
                <Typography variant="h4">Hallo!</Typography>
                <TextField
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Code"
                    variant="filled"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                />
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

