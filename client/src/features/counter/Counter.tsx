import {useStore} from "../../lib/hooks/useStore.ts";
import {observer} from "mobx-react-lite";
import {
    Box,
    Button,
    ButtonGroup,
    List,
    ListItem,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

const Counter = observer((function Counter() {
    const {counterStore} = useStore();

    return (
        <Stack
            direction={{xs: 'column', md: 'row'}}
            spacing={3}
            alignItems="stretch"
        >
            <Paper sx={{flex: 1, p: 4, borderRadius: 3}}>
                <Typography variant='h4' gutterBottom>
                    {counterStore.title}
                </Typography>
                <Typography variant='h6' color="text.secondary" sx={{mb: 3}}>
                    The count is:{' '}
                    <Box component="span" sx={{color: 'primary.main', fontWeight: 700}}>
                        {counterStore.count}
                    </Box>
                </Typography>
                <ButtonGroup variant="contained">
                    <Button onClick={() => counterStore.decrement()} color='error'>
                        Decrement
                    </Button>
                    <Button onClick={() => counterStore.increment()} color='success'>
                        Increment
                    </Button>
                    <Button onClick={() => counterStore.increment(5)} color='primary'>
                        Increment by 5
                    </Button>
                </ButtonGroup>
            </Paper>
            <Paper sx={{flex: 1, p: 4, borderRadius: 3}}>
                <Typography variant='h5' sx={{mb: 2}}>
                    Count events ({counterStore.eventCount})
                </Typography>
                <List sx={{maxHeight: 320, overflow: 'auto'}}>
                    {counterStore.events.map((event, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                borderRadius: 2,
                                mb: 0.5,
                                bgcolor: 'rgba(15,23,42,0.03)',
                            }}
                        >
                            {event}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Stack>
    )
}))

export default Counter;
