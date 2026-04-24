import {Event, FilterList} from "@mui/icons-material";
import {Box, ListItemText, MenuItem, MenuList, Paper, Typography} from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import {useStore} from "../../../lib/hooks/useStore";
import {observer} from "mobx-react-lite";

const ActivityFilters = observer(function ActivityFilters() {
    const {activityStore: {setFilter, setStartDate, filter, startDate}} = useStore();

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2.5}}>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid rgba(15,23,42,0.06)',
                    boxShadow: '0 10px 24px -16px rgba(15,23,42,0.2)',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1.5,
                        color: 'primary.main',
                        fontWeight: 700,
                    }}
                >
                    <FilterList sx={{mr: 1}}/>
                    Filters
                </Typography>
                <MenuList sx={{py: 0}}>
                    {[
                        {key: 'all', label: 'All events'},
                        {key: 'isGoing', label: "I'm going"},
                        {key: 'isHost', label: "I'm hosting"},
                    ].map(item => (
                        <MenuItem
                            key={item.key}
                            selected={filter === item.key}
                            onClick={() => setFilter(item.key)}
                            sx={{
                                borderRadius: 2,
                                my: 0.5,
                                '&.Mui-selected': {
                                    background:
                                        'linear-gradient(90deg, rgba(30,58,138,0.10), rgba(32,167,172,0.10))',
                                    color: 'primary.main',
                                    fontWeight: 600,
                                },
                            }}
                        >
                            <ListItemText primary={item.label}/>
                        </MenuItem>
                    ))}
                </MenuList>
            </Paper>

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid rgba(15,23,42,0.06)',
                    boxShadow: '0 10px 24px -16px rgba(15,23,42,0.2)',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1.5,
                        color: 'primary.main',
                        fontWeight: 700,
                    }}
                >
                    <Event sx={{mr: 1}}/>
                    Select date
                </Typography>
                <Calendar
                    value={startDate}
                    onChange={date => setStartDate(date as Date)}
                />
            </Paper>
        </Box>
    )
});

export default ActivityFilters;
