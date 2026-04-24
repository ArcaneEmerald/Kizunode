import {Box, CircularProgress, Divider, Stack, Typography} from "@mui/material";
import ProfileCard from "./ProfileCard";
import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";

type Props = {
    activeTab: number
}

export default function ProfileFollowings({activeTab}: Props) {
    const {id} = useParams();
    const predicate = activeTab === 3 ? 'followers' : 'followings';
    const {profile, followings, loadingFollowings} = useProfile(id, predicate);

    return (
        <Box>
            <Typography variant="h5">
                {activeTab === 3
                    ? `People following ${profile?.displayName}`
                    : `People ${profile?.displayName} is following`}
            </Typography>
            <Divider sx={{my: 2}}/>
            {loadingFollowings ? (
                <Stack alignItems="center" sx={{py: 6}}>
                    <CircularProgress size={28}/>
                </Stack>
            ) : followings && followings.length > 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2.5,
                        mt: 2,
                    }}
                >
                    {followings.map(p => (
                        <ProfileCard key={p.id} profile={p}/>
                    ))}
                </Box>
            ) : (
                <Typography color="text.secondary" sx={{mt: 2}}>
                    No profiles to show yet.
                </Typography>
            )}
        </Box>
    )
}
