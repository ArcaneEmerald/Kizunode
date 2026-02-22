import {Grid} from "@mui/material";
import ActivityList from "./ActivityList.tsx";

type Props = {
    activities: Activity[]
}
export default function ActivityDashboard({activities}: Props) {
    return (
        <Grid container>
            <Grid size={9}>
                <ActivityList activities={activities}/>
            </Grid>
        </Grid>
    )
}