import {
    Avatar,
    Box,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {ChatBubbleOutline} from "@mui/icons-material";
import {Link, useParams} from "react-router";
import {useComments} from "../../../lib/hooks/useComments";
import {timeAgo} from "../../../lib/util/util";
import {type FieldValues, useForm} from "react-hook-form";
import {observer} from "mobx-react-lite";
import {brandGradient} from "../../../app/layout/theme";

const ActivityDetailsChat = observer(function ActivityDetailsChat() {
    const {id} = useParams();
    const {commentStore} = useComments(id);
    const {register, handleSubmit, reset, formState: {isSubmitting}} = useForm();

    const addComment = async (data: FieldValues) => {
        try {
            await commentStore.hubConnection?.invoke('SendComment', {
                activityId: id,
                body: data.body
            })
            reset();
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(addComment)();
        }
    };

    return (
        <Paper sx={{borderRadius: 3, overflow: 'hidden'}}>
            <Box
                sx={{
                    p: 2.5,
                    color: 'white',
                    backgroundImage: brandGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                }}
            >
                <ChatBubbleOutline/>
                <Typography variant="h6" sx={{fontWeight: 700}}>
                    Chat about this meetup
                </Typography>
            </Box>
            <Box sx={{p: 2.5}}>
                <form>
                    <TextField
                        {...register('body', {required: true})}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Share your thoughts (Enter to send, Shift+Enter for new line)"
                        onKeyDown={handleKeyPress}
                        slotProps={{
                            input: {
                                endAdornment: isSubmitting ? (
                                    <CircularProgress size={22}/>
                                ) : null
                            }
                        }}
                    />
                </form>

                <Box
                    sx={{
                        maxHeight: 400,
                        overflow: 'auto',
                        mt: 2.5,
                        pr: 0.5,
                    }}
                >
                    {commentStore.comments.length === 0 ? (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{textAlign: 'center', py: 4}}
                        >
                            Be the first to comment on this meetup.
                        </Typography>
                    ) : (
                        <Stack spacing={2.25}>
                            {commentStore.comments.map(comment => (
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    alignItems="flex-start"
                                    key={comment.id}
                                >
                                    <Avatar src={comment.imageUrl} alt={'user image'}/>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            bgcolor: 'rgba(15,23,42,0.03)',
                                            borderRadius: 2,
                                            p: 1.5,
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1.5}
                                            sx={{mb: 0.5}}
                                        >
                                            <Typography
                                                component={Link}
                                                to={`/profiles/${comment.userId}`}
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 700,
                                                    textDecoration: 'none',
                                                    color: 'text.primary',
                                                    '&:hover': {color: 'primary.main'},
                                                }}
                                            >
                                                {comment.displayName}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {timeAgo(comment.createdAt)}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            sx={{whiteSpace: 'pre-wrap'}}
                                        >
                                            {comment.body}
                                        </Typography>
                                    </Box>
                                </Stack>
                            ))}
                        </Stack>
                    )}
                </Box>
            </Box>
        </Paper>
    )
});

export default ActivityDetailsChat;
