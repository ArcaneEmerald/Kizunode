import {Box, Grid, Stack, Typography} from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
    return (
        <Box>
            <Stack spacing={0.5} sx={{mb: 3}}>
                <Typography variant="h4">Activities</Typography>
                <Typography variant="body1" color="text.secondary">
                    Browse upcoming Japanese language meetups and join the ones that spark
                    your interest.
                </Typography>
            </Stack>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 8}}>
                    <ActivityList/>
                </Grid>
                <Grid
                    size={{xs: 12, md: 4}}
                    sx={{
                        position: {md: 'sticky'},
                        top: {md: 112},
                        alignSelf: 'flex-start',
                    }}
                >
                    <ActivityFilters/>
                </Grid>
            </Grid>
        </Box>
    )
}
