import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Tooltip from '@mui/material/Tooltip';

type MeetingTimeProps = {
  entries: { id: string; name: string; value: number }[];
  onAutoClick: () => void;
};

export default function MeetingTime({ entries, onAutoClick }: MeetingTimeProps) {
  const totalTime = entries.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2 }}>
      <Typography variant="h6" sx={{ flex: 1 }}>
        Total Meeting Time: {totalTime} minutes
      </Typography>
      <Tooltip title="Auto">
        <IconButton color="primary" aria-label="Auto" onClick={onAutoClick}>
          <AutorenewIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
