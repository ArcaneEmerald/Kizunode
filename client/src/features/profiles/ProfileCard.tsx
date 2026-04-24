import {Box, Card, CardContent, CardMedia, Chip, Divider, Stack, Typography} from "@mui/material";
import {Person} from "@mui/icons-material";
import {Link} from "react-router";

type Props = {
    profile: Profile
}

export default function ProfileCard({profile}: Props) {
    return (
        <Link to={`/profiles/${profile.id}`} style={{textDecoration: 'none'}}>
            <Card
                sx={{
                    width: 220,
                    overflow: 'hidden',
                    transition: 'transform 220ms ease, box-shadow 220ms ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 22px 40px -18px rgba(15,23,42,0.3)',
                    },
                }}
            >
                <CardMedia
                    component='img'
                    src={profile?.imageUrl || '/images/user.png'}
                    sx={{height: 180, objectFit: 'cover'}}
                    alt={profile.displayName + ' image'}
                />
                <CardContent sx={{p: 2}}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1" sx={{fontWeight: 700}} noWrap>
                            {profile.displayName}
                        </Typography>
                        {profile.bio && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {profile?.bio}
                            </Typography>
                        )}
                        {profile.following && (
                            <Chip
                                size='small'
                                label='Following'
                                color="secondary"
                                variant="outlined"
                                sx={{alignSelf: 'flex-start'}}
                            />
                        )}
                    </Stack>
                    <Divider sx={{my: 1.5}}/>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.secondary',
                        }}
                    >
                        <Person fontSize="small"/>
                        <Typography variant="body2" sx={{ml: 0.75}}>
                            {profile.followersCount}{' '}
                            {profile.followersCount === 1 ? 'follower' : 'followers'}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    )
}
