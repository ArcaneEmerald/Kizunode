import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import {ArrowForward, SearchOff} from "@mui/icons-material";
import {Link} from "react-router";

export default function NotFound() {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', py: {xs: 4, md: 6}}}>
            <Paper
                sx={{
                    width: '100%',
                    maxWidth: 520,
                    textAlign: 'center',
                    p: {xs: 4, md: 6},
                    borderRadius: 4,
                    border: '1px solid rgba(15,23,42,0.06)',
                }}
            >
                <Stack alignItems="center" spacing={2.5}>
                    <Box
                        sx={{
                            width: 96,
                            height: 96,
                            borderRadius: '30px',
                            display: 'grid',
                            placeItems: 'center',
                            color: '#fff',
                            background:
                                'linear-gradient(135deg, #182a73 0%, #218aae 100%)',
                            boxShadow: '0 20px 40px -18px rgba(24,42,115,0.45)',
                        }}
                    >
                        <SearchOff sx={{fontSize: 56}}/>
                    </Box>
                    <Typography variant='h4'>Page not found</Typography>
                    <Typography variant="body1" color="text.secondary">
                        The page you were looking for doesn't exist or has been moved.
                    </Typography>
                    <Button
                        component={Link}
                        to={'/activities'}
                        variant="contained"
                        endIcon={<ArrowForward/>}
                    >
                        Back to activities
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}
