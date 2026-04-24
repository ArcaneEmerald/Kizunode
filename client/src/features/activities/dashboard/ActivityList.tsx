import {Box, CircularProgress, Paper, Stack, Typography} from "@mui/material";
import {EventBusy} from "@mui/icons-material";
import ActivityCard from "./ActivityCard";
import {useActivities} from "../../../lib/hooks/useActivities";
import {useInView} from 'react-intersection-observer';
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

const ActivityList = observer(function ActivityList() {
    const {activitiesGroup, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = useActivities();

    const {ref, inView} = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center" sx={{py: 10}}>
                <CircularProgress/>
                <Typography color="text.secondary" sx={{mt: 2}}>
                    Loading activities…
                </Typography>
            </Stack>
        );
    }

    const isEmpty =
        !activitiesGroup || activitiesGroup.pages.every(p => p.items.length === 0);

    if (isEmpty) {
        return (
            <Paper
                sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px dashed rgba(15,23,42,0.15)',
                    boxShadow: 'none',
                }}
            >
                <EventBusy sx={{fontSize: 56, color: 'text.secondary', mb: 1}}/>
                <Typography variant="h6">No activities found</Typography>
                <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or check back later.
                </Typography>
            </Paper>
        );
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2.5}}>
            {activitiesGroup!.pages.map((activities, index) => (
                <Box
                    key={index}
                    ref={index === activitiesGroup!.pages.length - 1 ? ref : null}
                    display='flex'
                    flexDirection='column'
                    gap={2.5}
                >
                    {activities.items.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                        />
                    ))}
                </Box>
            ))}
            {isFetchingNextPage && (
                <Stack alignItems="center" sx={{py: 2}}>
                    <CircularProgress size={28}/>
                </Stack>
            )}
        </Box>
    )
});

export default ActivityList;
