import {CalendarToday, Info, Place, ExpandMore} from "@mui/icons-material";
import {Box, Button, Divider, Paper, Stack, Typography} from "@mui/material";
import {formatDate} from "../../../lib/util/util";
import {useState} from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

type Props = {
    activity: Activity
}

const InfoRow = ({
                     icon,
                     children,
                 }: {
    icon: React.ReactNode;
    children: React.ReactNode;
}) => (
    <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        sx={{px: 3, py: 2}}
    >
        <Box
            sx={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: '12px',
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'rgba(33,138,174,0.10)',
                color: 'info.main',
            }}
        >
            {icon}
        </Box>
        <Box sx={{flexGrow: 1, pt: 0.25}}>{children}</Box>
    </Stack>
);

export default function ActivityInfo({activity}: Props) {
    const [mapOpen, setMapOpen] = useState(false);
    return (
        <Paper sx={{borderRadius: 3, overflow: 'hidden'}}>
            <InfoRow icon={<Info/>}>
                <Typography variant="body1">{activity.description}</Typography>
            </InfoRow>
            <Divider/>
            <InfoRow icon={<CalendarToday/>}>
                <Typography variant="body1">{formatDate(activity.date)}</Typography>
            </InfoRow>
            <Divider/>
            <InfoRow icon={<Place/>}>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    justifyContent="space-between"
                    alignItems={{sm: 'center'}}
                    spacing={1}
                >
                    <Typography variant="body1">
                        {activity.venue}, {activity.city}
                    </Typography>
                    <Button
                        size="small"
                        endIcon={
                            <ExpandMore
                                sx={{
                                    transform: mapOpen ? 'rotate(180deg)' : 'none',
                                    transition: 'transform 160ms ease',
                                }}
                            />
                        }
                        onClick={() => setMapOpen(!mapOpen)}
                    >
                        {mapOpen ? 'Hide Map' : 'Show Map'}
                    </Button>
                </Stack>
            </InfoRow>
            {mapOpen && (
                <Box sx={{height: 400, display: 'block', borderTop: '1px solid rgba(15,23,42,0.06)'}}>
                    <MapComponent
                        position={[activity.latitude, activity.longitude]}
                        venue={activity.venue}
                    />
                </Box>
            )}
        </Paper>
    )
}
