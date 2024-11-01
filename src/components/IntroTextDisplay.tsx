import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function IntroTextDisplay() {
    let lorem: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas molestie eu sapien non tincidunt. Integer neque elit, ornare quis vulputate vel, efficitur nec ante. Donec consectetur nisl commodo mi lacinia, rutrum dignissim felis egestas. Aenean odio metus, porta id ultrices non, suscipit ut risus. Vestibulum non odio commodo, pulvinar sem eget, finibus eros. Donec interdum blandit eros eget posuere. Cras a ex elit. Proin at posuere velit, tristique bibendum sapien. Donec sodales diam ac nibh dictum cursus."
    return (
        <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'left', p: 2, height: '75%', width: '75%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="column" spacing={3} sx={{ height: '90%', width: '75%' }}>
                <Typography variant="h4" textAlign="center">Cognitive Walkthrough Intro</Typography>
                <Typography variant="h6" textAlign="center">Some Text explaining what is going on.</Typography>
                <Typography>{lorem}</Typography>
                <Typography>{lorem}</Typography>
                <Typography variant="h4" textAlign="center">Enter code: 111111 for Coordinator</Typography>
                <Typography variant="h4" textAlign="center">Enter code: 666666 for Participant</Typography>
            </Stack>
        </Box>

    );
}
