import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import {useProfile} from "../../lib/hooks/useProfile";
import {useParams} from "react-router";

export default function ProfilePage() {
    const {id} = useParams();
    const {profile, loadingProfile} = useProfile(id);

    if (loadingProfile) {
        return (
            <Stack alignItems="center" sx={{py: 10}}>
                <CircularProgress/>
                <Typography color="text.secondary" sx={{mt: 2}}>
                    Loading profile…
                </Typography>
            </Stack>
        );
    }

    if (!profile) {
        return (
            <Box sx={{textAlign: 'center', py: 10}}>
                <Typography variant="h6">Profile not found</Typography>
            </Box>
        );
    }

    return (
        <Stack spacing={2.5}>
            <ProfileHeader/>
            <ProfileContent/>
        </Stack>
    )
}
