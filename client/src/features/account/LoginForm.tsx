import {useAccount} from "../../lib/hooks/useAccount.ts";
import {useForm} from "react-hook-form";
import {loginSchema, type LoginSchema} from "../../lib/schemas/loginSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import {LockOpen} from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import {Link, useLocation, useNavigate} from "react-router";

export default function LoginForm() {
    const {loginUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<LoginSchema>({
        mode: "onTouched",
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || 'activities');
            }
        })
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', pt: {xs: 4, md: 6}}}>
            <Paper
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    width: '100%',
                    maxWidth: 460,
                    p: {xs: 3, md: 5},
                    borderRadius: 4,
                    border: '1px solid rgba(15,23,42,0.06)',
                    boxShadow: '0 30px 60px -24px rgba(15,23,42,0.25)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background:
                            'radial-gradient(circle at top right, rgba(32,167,172,0.10), transparent 55%)',
                        pointerEvents: 'none',
                    },
                }}
            >
                <Stack spacing={3} sx={{position: 'relative'}}>
                    <Stack alignItems="center" spacing={1.5}>
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '20px',
                                display: 'grid',
                                placeItems: 'center',
                                color: '#fff',
                                background:
                                    'linear-gradient(135deg, #182a73 0%, #218aae 100%)',
                                boxShadow:
                                    '0 16px 30px -12px rgba(24,42,115,0.45)',
                            }}
                        >
                            <LockOpen fontSize="medium"/>
                        </Box>
                        <Typography variant="h4">Welcome back</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to continue your Japanese learning journey
                        </Typography>
                    </Stack>

                    <Stack spacing={2}>
                        <TextInput label='Email' control={control} name='email'/>
                        <TextInput label='Password' type='password' control={control} name='password'/>
                    </Stack>

                    <Button
                        type='submit'
                        disabled={!isValid}
                        loading={isSubmitting}
                        variant='contained'
                        size='large'
                        sx={{py: 1.3, fontSize: '1rem'}}
                    >
                        Sign in
                    </Button>

                    <Typography sx={{textAlign: 'center'}} variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <Box
                            component={Link}
                            to='/register'
                            sx={{color: 'primary.main', fontWeight: 600, textDecoration: 'none'}}
                        >
                            Sign up
                        </Box>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    )
}
