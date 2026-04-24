import {type SyntheticEvent, useEffect, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import {Link, useParams} from "react-router";
import {format} from "date-fns";
import {useProfile} from "../../lib/hooks/useProfile.ts";

export default function ProfileActivities() {
    const [activeTab, setActiveTab] = useState(0);
    const {id} = useParams();
    const {userActivities, setFilter, loadingUserActivities} = useProfile(id);

    useEffect(() => {
        setFilter('future')
    }, [setFilter])

    const tabs = [
        {menuItem: 'Future Events', key: 'future'},
        {menuItem: 'Past Events', key: 'past'},
        {menuItem: 'Hosting', key: 'hosting'}
    ];

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabs[newValue].key);
    };

    const hasActivities = userActivities && userActivities.length > 0;

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mb: 2,
                }}
            >
                {tabs.map((tab, index) => (
                    <Tab label={tab.menuItem} key={index}/>
                ))}
            </Tabs>

            {loadingUserActivities ? (
                <Stack alignItems="center" sx={{py: 6}}>
                    <CircularProgress size={28}/>
                </Stack>
            ) : !hasActivities ? (
                <Typography color="text.secondary" sx={{py: 4, textAlign: 'center'}}>
                    No activities to show
                </Typography>
            ) : (
                <Grid
                    container
                    spacing={2}
                    sx={{maxHeight: 420, overflow: 'auto', pr: 0.5}}
                >
                    {userActivities.map((activity: Activity) => (
                        <Grid size={{xs: 6, sm: 4, md: 3}} key={activity.id}>
                            <Link
                                to={`/activities/${activity.id}`}
                                style={{textDecoration: 'none'}}
                            >
                                <Card
                                    sx={{
                                        transition:
                                            'transform 220ms ease, box-shadow 220ms ease',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 18px 32px -16px rgba(15,23,42,0.3)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="110"
                                        image={`/images/categoryImages/${activity.category}.jpg`}
                                        alt={activity.title}
                                        sx={{objectFit: 'cover'}}
                                    />
                                    <CardContent sx={{p: 1.5}}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{fontWeight: 700, lineHeight: 1.25}}
                                            noWrap
                                        >
                                            {activity.title}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {format(activity.date, 'do LLL yyyy')}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {format(activity.date, 'h:mm a')}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}
