import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, padding: 2, height: 50, width: '25vw' }}>
      {showValues ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Total Time: {totalTime} minutes
          </Typography>
          <Tooltip title="Auto">
            <IconButton color="primary" aria-label="Auto" onClick={onAutoClick}>
              <AutorenewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2, width: '25vw' }}>
          <FormControl fullWidth>
            <InputLabel>Total Meeting Time</InputLabel>
            <Select
              value={totalMeetingTime}
              onChange={(e) => setTotalMeetingTime(e.target.value)}
              label="Total Meeting Time"
            >
              <MenuItem value="30">30 Minutes</MenuItem>
              <MenuItem value="45">45 Minutes</MenuItem>
              <MenuItem value="60">60 Minutes</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Organisation Time</InputLabel>
            <Select
              value={organizationTime}
              onChange={(e) => setOrganizationTime(e.target.value)}
              label="Organisation Time"
            >
              <MenuItem value="5">5 Minutes</MenuItem>
              <MenuItem value="10">10 Minutes</MenuItem>
              <MenuItem value="15">15 Minutes</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Time Slice</InputLabel>
            <Select
              value={sliceTime}
              onChange={(e) => setSliceTime(e.target.value)}
              label="Time Slice"
            >
              <MenuItem value="5">5 Minutes</MenuItem>
              <MenuItem value="10">10 Minutes</MenuItem>
              <MenuItem value="15">15 Minutes</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}
