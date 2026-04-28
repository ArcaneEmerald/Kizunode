import {Box, Button, Chip, CircularProgress, Container, Stack, Typography} from "@mui/material";
import {ArrowForwardRounded, AutoAwesome, FlashOnRounded, Hub} from "@mui/icons-material";
import {Link} from "react-router";
import {heroGradient} from "../../app/layout/theme";
import {useAccount} from "../../lib/hooks/useAccount";

export default function HomePage() {
    const {loginUser, currentUser} = useAccount();

    const handleQuickLogin = () => {
        loginUser.mutate({
            email: 'bob@test.com',
            password: 'Pa$$w0rd',
        });
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: heroGradient,
            }}
        >
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    maskImage:
                        'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                    pointerEvents: 'none',
                }}
            />
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    top: '-120px',
                    right: '-120px',
                    background:
                        'radial-gradient(circle, rgba(79,208,213,0.5) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                }}
            />
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    width: 420,
                    height: 420,
                    borderRadius: '50%',
                    bottom: '-140px',
                    left: '-140px',
                    background:
                        'radial-gradient(circle, rgba(123,92,255,0.5) 0%, transparent 70%)',
                    filter: 'blur(18px)',
                }}
            />

            <Container maxWidth="md" sx={{position: 'relative', textAlign: 'center', py: 10}}>
                <Stack alignItems="center" spacing={3}>
                    <Chip
                        icon={<AutoAwesome sx={{color: '#fff !important'}}/>}
                        label="Learn Japanese together"
                        sx={{
                            color: '#fff',
                            bgcolor: 'rgba(255,255,255,0.10)',
                            border: '1px solid rgba(255,255,255,0.22)',
                            backdropFilter: 'blur(6px)',
                            px: 1.5,
                            py: 2.2,
                            fontWeight: 500,
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 84,
                                height: 84,
                                borderRadius: '28px',
                                display: 'grid',
                                placeItems: 'center',
                                background:
                                    'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04))',
                                border: '1px solid rgba(255,255,255,0.28)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 20px 40px -20px rgba(0,0,0,0.5)',
                            }}
                        >
                            <Hub sx={{fontSize: 46}}/>
                        </Box>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {xs: '3.2rem', md: '5.5rem'},
                                fontWeight: 900,
                                letterSpacing: '-0.03em',
                                backgroundImage:
                                    'linear-gradient(90deg, #ffffff 0%, #b8ecff 60%, #a7f3d0 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Kizunode
                        </Typography>
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 500,
                            color: 'rgba(255,255,255,0.82)',
                            maxWidth: 720,
                            mx: 'auto',
                        }}
                    >
                        Connect with fellow Japanese learners, join language meetups, and
                        build lasting bonds along your language journey.
                    </Typography>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} sx={{pt: 2}}>
                        <Button
                            component={Link}
                            to='/activities'
                            size="large"
                            endIcon={<ArrowForwardRounded/>}
                            sx={{
                                px: 4,
                                py: 1.6,
                                fontSize: '1.05rem',
                                borderRadius: 999,
                                color: '#0c1a4a',
                                background:
                                    'linear-gradient(90deg, #ffffff 0%, #cdeefc 100%)',
                                boxShadow:
                                    '0 20px 40px -16px rgba(255,255,255,0.45)',
                                '&:hover': {
                                    background:
                                        'linear-gradient(90deg, #ffffff 0%, #a7f3d0 100%)',
                                },
                            }}
                        >
                            Get started
                        </Button>
                        {!currentUser && (
                            <Button
                                onClick={handleQuickLogin}
                                disabled={loginUser.isPending}
                                size="large"
                                variant="outlined"
                                startIcon={
                                    loginUser.isPending ? (
                                        <CircularProgress size={18} sx={{color: '#fff'}}/>
                                    ) : (
                                        <FlashOnRounded/>
                                    )
                                }
                                sx={{
                                    px: 4,
                                    py: 1.6,
                                    fontSize: '1.05rem',
                                    borderRadius: 999,
                                    color: '#fff',
                                    borderColor: 'rgba(255,255,255,0.45)',
                                    backdropFilter: 'blur(6px)',
                                    bgcolor: 'rgba(255,255,255,0.08)',
                                    '&:hover': {
                                        borderColor: '#fff',
                                        bgcolor: 'rgba(255,255,255,0.16)',
                                    },
                                }}
                            >
                                {loginUser.isPending ? 'Signing in...' : 'Quick demo login'}
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}
