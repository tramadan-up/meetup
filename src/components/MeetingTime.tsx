import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

type MeetingTimeProps = {
    entries: { id: string; name: string; value: number }[];
    onAutoClick: () => void;
    showValues: boolean;
};

const TOTAL_MEETING_TIME_KEY = 'totalMeetingTime';
const ORGANIZATION_TIME_KEY = 'organizationTime';
const SLICE_TIME_KEY = 'organizationTime';

export default function MeetingTime({ entries, onAutoClick, showValues }: MeetingTimeProps) {
    const totalTime = entries.reduce((sum, entry) => sum + entry.value, 0);
    const [totalMeetingTime, setTotalMeetingTime] = useState(() => {
        return sessionStorage.getItem(TOTAL_MEETING_TIME_KEY) || '30';
    });
    const [organizationTime, setOrganizationTime] = useState(() => {
        return sessionStorage.getItem(ORGANIZATION_TIME_KEY) || '5';
    });
    const [sliceTime, setSliceTime] = useState(() => {
        return sessionStorage.getItem(SLICE_TIME_KEY) || '5';
    });

    useEffect(() => {
        sessionStorage.setItem(TOTAL_MEETING_TIME_KEY, totalMeetingTime);
    }, [totalMeetingTime]);

    useEffect(() => {
        sessionStorage.setItem(ORGANIZATION_TIME_KEY, organizationTime);
    }, [organizationTime]);

    useEffect(() => {
        sessionStorage.setItem(SLICE_TIME_KEY, sliceTime);
    }, [sliceTime]);

    return (
        <Box sx={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
        }}>
            {showValues ? (
                <Box>
                    <Grid container direction="row">
                        <ThemeProvider theme={theme}>
                            <Typography variant="h6" sx={{ flex: 1 }}>
                                Gesamtzeit: {totalTime} Minuten
                            </Typography>
                        </ThemeProvider>
                        <Tooltip title="Zurücksetzen: setzt die Gesamtzeit auf 60 Minuten.">
                            <IconButton color="primary" aria-label="Auto" onClick={onAutoClick}>
                                <AutorenewIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Box>
            ) : (
                <Box>
                    <Grid container spacing={1} flexWrap="wrap">
                    <FormControl>
                        <InputLabel>Gesamtzeit</InputLabel>
                        <Select
                            value={totalMeetingTime}
                            onChange={(e) => setTotalMeetingTime(e.target.value)}
                            label="Gesamtzeit"
                        >
                            <MenuItem value="30">30 Minuten</MenuItem>
                            <MenuItem value="45">45 Minuten</MenuItem>
                            <MenuItem value="60">60 Minuten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Organisationszeit</InputLabel>
                        <Select
                            value={organizationTime}
                            onChange={(e) => setOrganizationTime(e.target.value)}
                            label="Organisationszeit"
                        >
                            <MenuItem value="5">5 Minuten</MenuItem>
                            <MenuItem value="10">10 Minuten</MenuItem>
                            <MenuItem value="15">15 Minuten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Zeitscheibe</InputLabel>
                        <Select
                            value={sliceTime}
                            onChange={(e) => setSliceTime(e.target.value)}
                            label="Zeitscheibe"
                        >
                            <MenuItem value="5">5 Minuten</MenuItem>
                            <MenuItem value="10">10 Minuten</MenuItem>
                            <MenuItem value="15">15 Minuten</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                </Box>
            )}
        </Box>
    );
}
