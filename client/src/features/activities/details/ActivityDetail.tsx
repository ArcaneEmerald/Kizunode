import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";

type Props = {
    activity: Activity
}

export default function ActivityDetail({activity}: Props) {
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
            <Button color='primary'>Edit</Button>
            <Button color='inherit'>Cancel</Button>
        </Card>
    )
}