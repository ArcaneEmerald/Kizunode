import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container, CssBaseline} from "@mui/material";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";

function App() {
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities')
            .then(res => setActivities(res.data))

        return () => {
        }
    }, [])

    return (
        <Box sx={{bgcolor: '#eeeeee'}}>
            <CssBaseline/>
            <NavBar/>
            <Container maxWidth="xl" sx={{mt: 3}}>
                <ActivityDashboard activities={activities}/>
            </Container>
        </Box>
    )
}

export default App
