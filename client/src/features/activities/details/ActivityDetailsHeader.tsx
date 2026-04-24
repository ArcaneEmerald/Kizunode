import {Avatar, Box, Card, CardMedia, Chip, Stack, Typography} from "@mui/material";
import {Link} from "react-router";
import {formatDate} from "../../../lib/util/util";
import {useActivities} from "../../../lib/hooks/useActivities";
import StyledButton from "../../../app/shared/components/StyledButton";

type Props = {
    activity: Activity
}

export default function ActivityDetailsHeader({activity}: Props) {
    const {updateAttendance} = useActivities(activity.id);

    return (
        <Card sx={{position: 'relative', overflow: 'hidden', p: 0, backgroundColor: 'transparent'}}>
            {activity.isCancelled && (
                <Chip
                    sx={{position: 'absolute', left: 20, top: 20, zIndex: 2}}
                    color="error"
                    label="Cancelled"
                />
            )}
            <Chip
                sx={{
                    position: 'absolute',
                    right: 20,
                    top: 20,
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: 'primary.main',
                    textTransform: 'capitalize',
                    fontWeight: 700,
                }}
                label={activity.category}
                size="small"
            />
            <CardMedia
                component="img"
                sx={{height: {xs: 260, md: 340}, objectFit: 'cover'}}
                image={`/images/categoryImages/${activity.category}.jpg`}
                alt={`${activity.category} image`}
            />
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    p: {xs: 2.5, md: 4},
                    color: 'white',
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: {md: 'flex-end'},
                }}
            >
                <Box>
                    <Typography
                        variant="h3"
                        sx={{fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1}}
                    >
                        {activity.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{mt: 1, opacity: 0.9}}>
                        {formatDate(activity.date)}
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mt: 1.5}}>
                        <Avatar
                            src={activity.hostImageUrl}
                            sx={{width: 36, height: 36, border: '2px solid rgba(255,255,255,0.7)'}}
                        />
                        <Typography variant="body2" sx={{opacity: 0.9}}>
                            Hosted by{' '}
                            <Box
                                component={Link}
                                to={`/profiles/${activity.hostId}`}
                                sx={{color: 'white', fontWeight: 700, textDecoration: 'none'}}
                            >
                                {activity.hostDisplayName}
                            </Box>
                        </Typography>
                    </Stack>
                </Box>

                <Stack direction="row" spacing={1.5}>
                    {activity.isHost ? (
                        <>
                            <StyledButton
                                variant='contained'
                                color={activity.isCancelled ? 'success' : 'error'}
                                onClick={() => updateAttendance.mutate(activity.id)}
                                loading={updateAttendance.isPending}
                            >
                                {activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                            </StyledButton>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/manage/${activity.id}`}
                                disabled={activity.isCancelled}
                            >
                                Manage Event
                            </StyledButton>
                        </>
                    ) : (
                        <StyledButton
                            variant="contained"
                            color={activity.isGoing ? 'primary' : 'info'}
                            onClick={() => updateAttendance.mutate(activity.id)}
                            loading={updateAttendance.isPending || activity.isCancelled}
                        >
                            {activity.isGoing ? 'Cancel Attendance' : 'Join Activity'}
                        </StyledButton>
                    )}
                </Stack>
            </Box>
        </Card>
    )
}
