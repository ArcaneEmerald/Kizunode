import {useAccount} from "../../lib/hooks/useAccount.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import {PersonAddAlt1} from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import {registerSchema, type RegisterSchema} from "../../lib/schemas/registerSchema.ts";
import {Link} from "react-router";

export default function RegisterForm() {
    const {registerUser} = useAccount();
    const {control, handleSubmit, setError, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err) => {
                        if (err.includes('Email')) setError('email', {message: err});
                        else if (err.includes('Password')) setError('password', {message: err});
                    });
                }
            }
        });
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', pt: {xs: 4, md: 6}}}>
            <Paper
                component='form'
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
                            'radial-gradient(circle at top left, rgba(32,167,172,0.10), transparent 55%)',
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
                                    'linear-gradient(135deg, #20a7ac 0%, #218aae 100%)',
                                boxShadow: '0 16px 30px -12px rgba(32,167,172,0.45)',
                            }}
                        >
                            <PersonAddAlt1 fontSize="medium"/>
                        </Box>
                        <Typography variant="h4">Create your account</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Join the community and start your Japanese learning journey
                        </Typography>
                    </Stack>

                    <Stack spacing={2}>
                        <TextInput label='Email' control={control} name='email'/>
                        <TextInput label='Display name' control={control} name='displayName'/>
                        <TextInput label='Password' control={control} name='password' type='password'/>
                    </Stack>

                    <Button
                        type='submit'
                        loading={isSubmitting}
                        disabled={!isValid || isSubmitting}
                        variant="contained"
                        size="large"
                        sx={{py: 1.3, fontSize: '1rem'}}
                    >
                        Create account
                    </Button>

                    <Typography sx={{textAlign: 'center'}} variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Box
                            component={Link}
                            to='/login'
                            sx={{color: 'primary.main', fontWeight: 600, textDecoration: 'none'}}
                        >
                            Sign in
                        </Box>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}
