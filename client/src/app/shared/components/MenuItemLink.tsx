import type {ReactNode} from "react";
import {Box} from "@mui/material";
import {NavLink} from "react-router";

export default function MenuItemLink({children, to}: { children: ReactNode, to: string }) {
    return (
        <Box
            component={NavLink}
            to={to}
            sx={{
                position: 'relative',
                px: 2,
                py: 1,
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.82)',
                textDecoration: 'none',
                borderRadius: 2,
                transition:
                    'background-color 180ms ease, color 180ms ease, transform 180ms ease',
                '&:hover': {
                    color: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.10)',
                },
                '&.active': {
                    color: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    boxShadow: '0 6px 14px -8px rgba(0,0,0,0.45)',
                },
                '&.active::after': {
                    content: '""',
                    position: 'absolute',
                    left: '22%',
                    right: '22%',
                    bottom: 4,
                    height: 2,
                    borderRadius: 2,
                    background:
                        'linear-gradient(90deg, #4fd0d5 0%, #ffffff 100%)',
                },
            }}
        >
            {children}
        </Box>
    )
}
