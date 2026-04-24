import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import {PersonAddAlt1, PersonRemoveAlt1} from '@mui/icons-material';
import {useProfile} from '../../lib/hooks/useProfile';
import {useParams} from 'react-router';
import {brandGradient} from '../../app/layout/theme';

export default function ProfileHeader() {
    const {id} = useParams();
    const {isCurrentUser, profile, updateFollowing} = useProfile(id);
    if (!profile) return null;

    return (
        <Paper
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(15,23,42,0.06)',
            }}
        >
            <Box
                sx={{
                    height: 140,
                    backgroundImage: brandGradient,
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                        maskImage:
                            'linear-gradient(to bottom, black, transparent)',
                    },
                }}
            />
            <Box sx={{px: {xs: 3, md: 4}, pb: 3.5, mt: '-60px', position: 'relative'}}>
                <Stack
                    direction={{xs: 'column', md: 'row'}}
                    spacing={3}
                    alignItems={{xs: 'flex-start', md: 'flex-end'}}
                    justifyContent="space-between"
                >
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={3}
                        alignItems={{xs: 'flex-start', sm: 'flex-end'}}
                    >
                        <Avatar
                            alt="User Image"
                            src={profile?.imageUrl}
                            sx={{
                                width: 140,
                                height: 140,
                                border: '4px solid #fff',
                                boxShadow: '0 12px 28px -12px rgba(15,23,42,0.35)',
                            }}
                        />
                        <Box sx={{pb: {sm: 1.5}}}>
                            <Typography variant="h4" sx={{fontWeight: 700}}>
                                {profile.displayName}
                            </Typography>
                            {profile.following && (
                                <Chip
                                    variant='outlined'
                                    color='secondary'
                                    label='Following'
                                    size="small"
                                    sx={{mt: 1}}
                                />
                            )}
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={3} alignItems="center" sx={{pb: {sm: 1}}}>
                        <Box textAlign="center">
                            <Typography variant="h5" sx={{fontWeight: 700}}>
                                {profile.followersCount}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Followers
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem/>
                        <Box textAlign="center">
                            <Typography variant="h5" sx={{fontWeight: 700}}>
                                {profile.followingCount}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Following
                            </Typography>
                        </Box>
                        {!isCurrentUser && (
                            <Button
                                onClick={() => updateFollowing.mutate()}
                                disabled={updateFollowing.isPending}
                                variant={profile.following ? 'outlined' : 'contained'}
                                color={profile.following ? 'error' : 'primary'}
                                startIcon={
                                    profile.following ? <PersonRemoveAlt1/> : <PersonAddAlt1/>
                                }
                            >
                                {profile.following ? 'Unfollow' : 'Follow'}
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
}
