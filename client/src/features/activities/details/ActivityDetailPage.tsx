import {Box, CircularProgress, Grid, Stack, Typography} from "@mui/material";
import {useParams} from "react-router";
import {useActivities} from "../../../lib/hooks/useActivities";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetailsPage() {
    const {id} = useParams();
    const {activity, isLoadingActivity} = useActivities(id);

    if (isLoadingActivity) {
        return (
            <Stack alignItems="center" sx={{py: 10}}>
                <CircularProgress/>
                <Typography color="text.secondary" sx={{mt: 2}}>
                    Loading activity…
                </Typography>
            </Stack>
        );
    }

    if (!activity) {
        return (
            <Box sx={{textAlign: 'center', py: 10}}>
                <Typography variant="h6">Activity not found</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 8}}>
                <Stack spacing={2.5}>
                    <ActivityDetailsHeader activity={activity}/>
                    <ActivityDetailsInfo activity={activity}/>
                    <ActivityDetailsChat/>
                </Stack>
            </Grid>
            <Grid size={{xs: 12, md: 4}}>
                <ActivityDetailsSidebar activity={activity}/>
            </Grid>
        </Grid>
    )
}
