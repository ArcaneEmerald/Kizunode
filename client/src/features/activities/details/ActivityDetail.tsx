import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Link, useParams} from "react-router";
import {useActivities} from "../../../lib/hooks/useActivities.ts";

export default function ActivityDetail() {
    const {id} = useParams();
    const {activity, isLoadingActivity} = useActivities(id);

    if (isLoadingActivity) return <Typography>Loading...</Typography>;
    if (!activity) return <Typography>Activity not found</Typography>;

    return (
        <Card sx={{boadrderRadius: 3}}>
            <CardMedia
                component='img'
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant='h5'>{activity.title}</Typography>
                <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
                <Typography variant='body1'>{activity.description}</Typography>
            </CardContent>
            <Button component={Link} to={`/manage/${activity.id}`} color='primary'>Edit</Button>
            <Button component={Link} to={'/activities'} color='inherit'>Cancel</Button>
        </Card>
    )
}