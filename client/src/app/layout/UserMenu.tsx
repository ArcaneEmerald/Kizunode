import {useAccount} from "../../lib/hooks/useAccount.ts";
import {useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import {Add, KeyboardArrowDown, Logout, Person} from "@mui/icons-material";
import {Link} from "react-router";

export default function UserMenu() {
    const {currentUser, logoutUser} = useAccount();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
                sx={{
                    textTransform: 'none',
                    pl: 0.5,
                    pr: 1.5,
                    py: 0.5,
                    borderRadius: 999,
                    backgroundColor: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    '&:hover': {backgroundColor: 'rgba(255,255,255,0.18)'},
                }}
                endIcon={<KeyboardArrowDown/>}
            >
                <Box display='flex' alignItems='center' gap={1}>
                    <Avatar
                        src={currentUser?.imageUrl}
                        alt="current user image"
                        sx={{width: 32, height: 32}}
                    />
                    <Typography variant="body2" sx={{fontWeight: 600}}>
                        {currentUser?.displayName}
                    </Typography>
                </Box>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                slotProps={{
                    list: {'aria-labelledby': 'basic-button'},
                    paper: {
                        sx: {
                            mt: 1.5,
                            minWidth: 220,
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px -12px rgba(15,23,42,0.25)',
                        },
                    },
                }}
            >
                <MenuItem component={Link} to='/createActivity' onClick={handleClose}>
                    <ListItemIcon>
                        <Add fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Create activity</ListItemText>
                </MenuItem>
                <MenuItem
                    component={Link}
                    to={`/profiles/${currentUser?.id}`}
                    onClick={handleClose}
                >
                    <ListItemIcon>
                        <Person fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem
                    onClick={() => {
                        logoutUser.mutate();
                        handleClose();
                    }}
                    sx={{color: 'error.main'}}
                >
                    <ListItemIcon sx={{color: 'error.main'}}>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
