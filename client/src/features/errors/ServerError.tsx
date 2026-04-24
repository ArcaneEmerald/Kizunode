import {useLocation} from "react-router";
import {Box, Divider, Paper, Stack, Typography} from "@mui/material";
import {ErrorOutline} from "@mui/icons-material";

export default function ServerError() {
    const {state} = useLocation()

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', py: {xs: 4, md: 6}}}>
            <Paper
                sx={{
                    width: '100%',
                    maxWidth: 720,
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid rgba(15,23,42,0.06)',
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        px: 4,
                        py: 3,
                        color: '#fff',
                        background:
                            'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)',
                    }}
                >
                    <ErrorOutline sx={{fontSize: 40}}/>
                    <Box>
                        <Typography variant="h5" sx={{fontWeight: 700}}>
                            {state?.error?.message || 'Something went wrong'}
                        </Typography>
                        <Typography variant="body2" sx={{opacity: 0.9}}>
                            Our team has been notified. Please try again later.
                        </Typography>
                    </Box>
                </Stack>
                <Divider/>
                <Box sx={{p: 4}}>
                    <Typography variant="body1" color="text.secondary">
                        {state?.error?.details || 'Internal server error'}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
}
