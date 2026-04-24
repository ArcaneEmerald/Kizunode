import {Box, Container, CssBaseline} from "@mui/material";
import NavBar from "./NavBar";
import {Outlet, ScrollRestoration, useLocation} from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <ScrollRestoration/>
            <CssBaseline/>
            {isHome ? (
                <HomePage/>
            ) : (
                <>
                    <NavBar/>
                    <Box
                        component="main"
                        sx={{flexGrow: 1, pt: {xs: 11, md: 13}, pb: 6}}
                    >
                        <Container maxWidth='xl' className="page-enter">
                            <Outlet/>
                        </Container>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default App
