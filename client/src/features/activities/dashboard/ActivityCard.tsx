import {AccessTime, ArrowForward, Place} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import {Link} from "react-router";
import {formatDate} from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

type Props = {
    activity: Activity;
}

export default function ActivityCard({activity}: Props) {
    const label = activity.isHost ? 'You are hosting' : 'You are going';
    const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default';

    return (
        <Card
            sx={{
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 18px 40px -18px rgba(15,23,42,0.28)',
                    borderColor: 'rgba(30,58,138,0.15)',
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    height: 130,
                    backgroundImage: `url(/images/categoryImages/${activity.category}.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(to bottom, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.65) 100%)',
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 1,
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    <Chip
                        label={activity.category}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.85)',
                            color: 'primary.main',
                            textTransform: 'capitalize',
                            fontWeight: 700,
                        }}
                    />
                    {activity.isCancelled && (
                        <Chip label='Cancelled' color='error' size="small"/>
                    )}
                </Box>
                {(activity.isHost || activity.isGoing) && (
                    <Chip
                        label={label}
                        variant="filled"
                        color={color === 'default' ? 'default' : color}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            zIndex: 1,
                            color: '#fff',
                            bgcolor:
                                color === 'secondary'
                                    ? 'secondary.main'
                                    : color === 'warning'
                                        ? 'warning.main'
                                        : 'rgba(15,23,42,0.6)',
                        }}
                    />
                )}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 16,
                        right: 16,
                        zIndex: 1,
                        color: '#fff',
                    }}
                >
                    <Typography variant="h6" sx={{fontWeight: 700, lineHeight: 1.2}}>
                        {activity.title}
                    </Typography>
                </Box>
            </Box>

            <CardContent sx={{p: 2.5}}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{mb: 1.5}}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                            src={activity.hostImageUrl}
                            alt='Image of host'
                            sx={{width: 44, height: 44}}
                        />
                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.2}}>
                                Hosted by
                            </Typography>
                            <Typography
                                component={Link}
                                to={`/profiles/${activity.hostId}`}
                                variant="subtitle2"
                                sx={{
                                    color: 'text.primary',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    '&:hover': {color: 'primary.main'},
                                }}
                            >
                                {activity.hostDisplayName}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>

                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={{xs: 0.75, sm: 3}}
                    sx={{mb: 1.5, color: 'text.secondary'}}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTime sx={{fontSize: 18}}/>
                        <Typography variant="body2" noWrap>
                            {formatDate(activity.date)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Place sx={{fontSize: 18}}/>
                        <Typography variant="body2" noWrap>{activity.venue}</Typography>
                    </Stack>
                </Stack>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                    }}
                >
                    {activity.description}
                </Typography>

                <Divider sx={{mb: 2}}/>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Stack direction="row" spacing={-1.2} sx={{ml: 0.5}}>
                        {activity.attendees.slice(0, 6).map(a => (
                            <Box
                                key={a.id}
                                sx={{
                                    borderRadius: '50%',
                                    border: '2px solid #fff',
                                }}
                            >
                                <AvatarPopover profile={a}/>
                            </Box>
                        ))}
                        {activity.attendees.length > 6 && (
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    fontSize: 13,
                                    bgcolor: 'grey.200',
                                    color: 'text.secondary',
                                    border: '2px solid #fff',
                                }}
                            >
                                +{activity.attendees.length - 6}
                            </Avatar>
                        )}
                    </Stack>
                    <Button
                        component={Link}
                        to={`/activities/${activity.id}`}
                        variant="contained"
                        endIcon={<ArrowForward/>}
                    >
                        View
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}
