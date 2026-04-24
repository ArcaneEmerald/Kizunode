import {
    Avatar,
    Box,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import {Group} from "@mui/icons-material";
import {Link} from "react-router";
import {brandGradient} from "../../../app/layout/theme";

type Props = {
    activity: Activity
}

export default function ActivityDetailsSidebar({activity}: Props) {
    return (
        <Paper sx={{borderRadius: 3, overflow: 'hidden', position: 'sticky', top: 112}}>
            <Box
                sx={{
                    textAlign: 'center',
                    color: 'white',
                    p: 2.5,
                    backgroundImage: brandGradient,
                }}
            >
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Group/>
                    <Typography variant="h6" sx={{fontWeight: 700}}>
                        {activity.attendees.length}{' '}
                        {activity.attendees.length === 1 ? 'person' : 'people'} going
                    </Typography>
                </Stack>
            </Box>
            <Box sx={{p: 1}}>
                {activity?.attendees.map((a, index) => (
                    <Box key={a.id}>
                        <Box
                            component={Link}
                            to={`/profiles/${a.id}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                px: 2,
                                py: 1.25,
                                borderRadius: 2,
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'background-color 150ms ease',
                                '&:hover': {bgcolor: 'rgba(15,23,42,0.04)'},
                            }}
                        >
                            <Avatar
                                variant="rounded"
                                alt={a.displayName + ' image'}
                                src={a.imageUrl}
                                sx={{width: 52, height: 52, borderRadius: 2}}
                            />
                            <Box sx={{flexGrow: 1, minWidth: 0}}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{fontWeight: 600}}
                                    noWrap
                                >
                                    {a.displayName}
                                </Typography>
                                {a.following && (
                                    <Typography variant="caption" color="secondary.dark">
                                        Following
                                    </Typography>
                                )}
                            </Box>
                            {a.id === activity.hostId && (
                                <Chip
                                    label="Host"
                                    color="warning"
                                    size="small"
                                    sx={{fontWeight: 700}}
                                />
                            )}
                        </Box>
                        {index < activity.attendees.length - 1 && (
                            <Divider sx={{mx: 2}}/>
                        )}
                    </Box>
                ))}
            </Box>
        </Paper>
    );
}
