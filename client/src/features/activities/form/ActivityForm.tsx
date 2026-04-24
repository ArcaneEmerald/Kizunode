import {Box, Button, CircularProgress, Paper, Stack, Typography} from "@mui/material";
import {AddCircleOutline, Edit} from "@mui/icons-material";
import {useActivities} from "../../../lib/hooks/useActivities";
import {useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {activitySchema, type ActivitySchema} from "../../../lib/schemas/activitySchema";
import {zodResolver} from '@hookform/resolvers/zod'
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import {categoryOptions} from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
    const {control, reset, handleSubmit} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const {id} = useParams();
    const navigate = useNavigate();
    const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);

    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude
                }
            });
        }
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const {location, ...rest} = data;
        const flattenedData = {...rest, ...location};
        try {
            if (activity) {
                updateActivity.mutate({...activity, ...flattenedData} as Activity, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                });
            } else {
                createActivity.mutate(flattenedData as Activity, {
                    onSuccess: (id) => {
                        navigate(`/activities/${id}`);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoadingActivity) {
        return (
            <Stack alignItems="center" sx={{py: 10}}>
                <CircularProgress/>
                <Typography color="text.secondary" sx={{mt: 2}}>
                    Loading activity…
                </Typography>
            </Stack>
        );
    }

    const isEdit = Boolean(activity);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Paper
                sx={{
                    width: '100%',
                    maxWidth: 860,
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid rgba(15,23,42,0.06)',
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                        px: {xs: 3, md: 4},
                        py: 2.5,
                        color: '#fff',
                        backgroundImage:
                            'linear-gradient(135deg, #182a73 0%, #218aae 55%, #20a7ac 100%)',
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '14px',
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.25)',
                        }}
                    >
                        {isEdit ? <Edit/> : <AddCircleOutline/>}
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{fontWeight: 700, lineHeight: 1.1}}>
                            {isEdit ? 'Edit Activity' : 'Create Activity'}
                        </Typography>
                        <Typography variant="body2" sx={{opacity: 0.9}}>
                            Fill in the details so people know what to expect.
                        </Typography>
                    </Box>
                </Stack>

                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{p: {xs: 3, md: 4}}}
                >
                    <Stack spacing={3}>
                        <TextInput label='Title' control={control} name='title'/>
                        <TextInput
                            label='Description'
                            name='description'
                            control={control}
                            multiline
                            rows={3}
                        />
                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={3}>
                            <SelectInput
                                items={categoryOptions}
                                label='Category'
                                control={control}
                                name='category'
                            />
                            <DateTimeInput label='Date' control={control} name='date'/>
                        </Stack>
                        <LocationInput
                            control={control}
                            label="Enter the location"
                            name="location"
                        />
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{pt: 1}}
                        >
                            <Button onClick={() => navigate(-1)} color='inherit'>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                loading={updateActivity.isPending || createActivity.isPending}
                            >
                                {isEdit ? 'Save Changes' : 'Create Activity'}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}
