import {Box, Button, Paper, Typography} from "@mui/material";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import {Link, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {activitySchema, type ActivitySchema} from "../../../lib/schemas/activitySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput.tsx";
import SelectInput from "../../../app/shared/components/SelectInput.tsx";
import {categoryOptions} from "./categoryOptions.ts";
import DateTimeInput from "../../../app/shared/components/DateTimeInput.tsx";

export default function ActivityForm() {
    const {control, reset, handleSubmit} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    })
    const {id} = useParams();
    const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id)

    useEffect(() => {
        if (activity) reset(activity)
    }, [activity, reset])

    const onSubmit = (data: ActivitySchema) => {
        console.log(data)
    }

    if (isLoadingActivity) return <Typography>Loading...</Typography>

    return (
        <Paper sx={{borderRadius: 3, padding: 2}}>
            <Typography variant='h5' gutterBottom color='primary'>
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title'/>
                <TextInput label='Description' control={control} name='description' multiline rows={3}/>
                <SelectInput items={categoryOptions} label='Category' control={control} name='category'/>
                <DateTimeInput label='Date' control={control} name='date'/>
                <TextInput label='City' control={control} name='city'/>
                <TextInput label='Venue' control={control} name='venue'/>
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button component={Link} to={'/activities'} color="inherit">Cancel</Button>
                    <Button
                        type='submit'
                        color="success"
                        variant='contained'
                        loading={updateActivity.isPending || createActivity.isPending}
                    >Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}