import {useProfile} from "../../lib/hooks/useProfile.ts";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useParams} from "react-router";

export default function ProfileAbout() {
    const {id} = useParams();
    const {profile, isCurrentUser} = useProfile(id);

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="h5">About {profile?.displayName}</Typography>
                {isCurrentUser && (
                    <Button startIcon={<Edit/>} size="small" onClick={() => {
                    }}>
                        Edit profile
                    </Button>
                )}
            </Stack>
            <Divider sx={{my: 2}}/>
            <Box
                sx={{
                    overflow: 'auto',
                    maxHeight: 380,
                    bgcolor: 'rgba(15,23,42,0.02)',
                    borderRadius: 2,
                    p: 2.5,
                }}
            >
                <Typography variant='body1' sx={{whiteSpace: 'pre-wrap'}}>
                    {profile?.bio || 'No description added yet'}
                </Typography>
            </Box>
        </Box>
    );
}
