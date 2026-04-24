import {Hub} from "@mui/icons-material";
import {
    AppBar,
    Box,
    CircularProgress,
    Container,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import {NavLink} from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import {Observer} from "mobx-react-lite";
import {useStore} from "../../lib/hooks/useStore";
import {useAccount} from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";

export default function NavBar() {
    const {uiStore} = useStore();
    const {currentUser} = useAccount();

    return (
        <AppBar position="fixed" elevation={0}>
            <Container maxWidth='xl'>
                <Toolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        py: 1,
                    }}
                >
                    <Box
                        component={NavLink}
                        to='/'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            color: 'inherit',
                            textDecoration: 'none',
                            pr: 2,
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '14px',
                                bgcolor: 'rgba(255,255,255,0.14)',
                                border: '1px solid rgba(255,255,255,0.22)',
                                display: 'grid',
                                placeItems: 'center',
                                backdropFilter: 'blur(6px)',
                            }}
                        >
                            <Hub fontSize='medium'/>
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: '-0.01em',
                                background:
                                    'linear-gradient(90deg, #ffffff 0%, #cdeefc 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Kizunode
                        </Typography>
                        <Observer>
                            {() =>
                                uiStore.isLoading ? (
                                    <CircularProgress
                                        size={18}
                                        thickness={6}
                                        sx={{color: '#fff', ml: 1}}
                                    />
                                ) : null
                            }
                        </Observer>
                    </Box>

                    <Stack direction="row" spacing={0.5}>
                        <MenuItemLink to='/activities'>Activities</MenuItemLink>
                        <MenuItemLink to='/counter'>Counter</MenuItemLink>
                        <MenuItemLink to='/errors'>Errors</MenuItemLink>
                    </Stack>

                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        {currentUser ? (
                            <UserMenu/>
                        ) : (
                            <>
                                <MenuItemLink to='/login'>Login</MenuItemLink>
                                <MenuItemLink to='/register'>Register</MenuItemLink>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
