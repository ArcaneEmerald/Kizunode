import {Box, Paper, Tab, Tabs} from "@mui/material";
import {type SyntheticEvent, useState} from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";

export default function ProfileContent() {
    const [value, setValue] = useState(0);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabContent = [
        {label: 'About', content: <ProfileAbout/>},
        {label: 'Photos', content: <ProfilePhotos/>},
        {label: 'Events', content: <ProfileActivities/>},
        {label: 'Followers', content: <ProfileFollowings activeTab={value}/>},
        {label: 'Following', content: <ProfileFollowings activeTab={value}/>}
    ];

    return (
        <Paper
            sx={{
                display: 'flex',
                alignItems: 'stretch',
                borderRadius: 3,
                minHeight: 520,
                overflow: 'hidden',
                flexDirection: {xs: 'column', md: 'row'},
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{
                    borderRight: {md: '1px solid'},
                    borderColor: {md: 'divider'},
                    minWidth: {md: 220},
                    bgcolor: 'rgba(15,23,42,0.02)',
                    '& .MuiTab-root': {
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        px: 3,
                        py: 1.75,
                        borderRadius: 0,
                    },
                    '& .Mui-selected': {
                        bgcolor: 'rgba(30,58,138,0.08)',
                    },
                }}
            >
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label}/>
                ))}
            </Tabs>
            <Box sx={{flexGrow: 1, p: {xs: 2.5, md: 3.5}}}>
                {tabContent[value].content}
            </Box>
        </Paper>
    )
}
