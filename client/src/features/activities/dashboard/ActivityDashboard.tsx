import {Grid} from "@mui/material";
import ActivityList from "./ActivityList.tsx";
import ActivityForm from "../form/ActivityForm.tsx";

type Props = {
    activities: Activity[]
}
export default function ActivityDashboard({activities}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList activities={activities}/>
            </Grid>
            <Grid size={5}>
                <ActivityForm/>
            </Grid>
        </Grid>
    )
}