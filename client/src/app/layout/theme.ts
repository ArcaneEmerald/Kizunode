import {createTheme, alpha} from "@mui/material";

export const brandGradient =
    'linear-gradient(135deg, #182a73 0%, #218aae 55%, #20a7ac 100%)';

export const softGradient =
    'linear-gradient(135deg, rgba(24,42,115,0.95) 0%, rgba(33,138,174,0.92) 55%, rgba(32,167,172,0.90) 100%)';

export const heroGradient =
    'radial-gradient(circle at 20% 20%, #3ec6c9 0%, transparent 45%),' +
    'radial-gradient(circle at 80% 10%, #5b8def 0%, transparent 40%),' +
    'radial-gradient(circle at 50% 80%, #7a5cff 0%, transparent 50%),' +
    'linear-gradient(135deg, #0c1a4a 0%, #132b68 50%, #103d5a 100%)';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1e3a8a',
            light: '#3b5bd4',
            dark: '#0e1d5e',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#20a7ac',
            light: '#4fd0d5',
            dark: '#0f7a7e',
            contrastText: '#ffffff',
        },
        info: {
            main: '#218aae',
        },
        success: {
            main: '#10b981',
        },
        warning: {
            main: '#f59e0b',
        },
        error: {
            main: '#ef4444',
        },
        background: {
            default: '#f4f6fb',
            paper: '#ffffff',
        },
        text: {
            primary: '#111827',
            secondary: '#4b5563',
        },
        divider: 'rgba(15, 23, 42, 0.08)',
    },
    shape: {
        borderRadius: 14,
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {fontWeight: 800, letterSpacing: '-0.02em'},
        h2: {fontWeight: 800, letterSpacing: '-0.02em'},
        h3: {fontWeight: 700, letterSpacing: '-0.015em'},
        h4: {fontWeight: 700, letterSpacing: '-0.01em'},
        h5: {fontWeight: 700},
        h6: {fontWeight: 600},
        button: {fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em'},
        subtitle1: {fontWeight: 500},
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {scrollBehavior: 'smooth'},
                body: {
                    backgroundColor: '#f4f6fb',
                    backgroundImage:
                        'radial-gradient(at 10% 0%, rgba(33,138,174,0.10) 0px, transparent 45%),' +
                        'radial-gradient(at 95% 5%, rgba(32,167,172,0.10) 0px, transparent 40%),' +
                        'radial-gradient(at 50% 100%, rgba(24,42,115,0.08) 0px, transparent 50%)',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                },
                '*::-webkit-scrollbar': {width: 10, height: 10},
                '*::-webkit-scrollbar-track': {background: 'transparent'},
                '*::-webkit-scrollbar-thumb': {
                    background: alpha('#1e3a8a', 0.25),
                    borderRadius: 8,
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    background: alpha('#1e3a8a', 0.45),
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: softGradient,
                    backdropFilter: 'saturate(1.2) blur(8px)',
                    boxShadow: '0 8px 24px rgba(15,23,42,0.18)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                rounded: {
                    borderRadius: 16,
                },
            },
            defaultProps: {
                elevation: 1,
            },
        },
        MuiCard: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: '1px solid rgba(15, 23, 42, 0.06)',
                    boxShadow: '0 10px 30px -12px rgba(15,23,42,0.18)',
                    transition:
                        'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    paddingInline: 18,
                    paddingBlock: 8,
                },
                containedPrimary: {
                    backgroundImage: brandGradient,
                    color: '#ffffff',
                    '&:hover': {
                        backgroundImage: brandGradient,
                        filter: 'brightness(1.05)',
                        boxShadow: '0 10px 20px -10px rgba(24,42,115,0.6)',
                    },
                },
                outlined: {
                    borderWidth: 1.5,
                    '&:hover': {borderWidth: 1.5},
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontWeight: 600,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: alpha('#ffffff', 0.9),
                    transition: 'box-shadow 180ms ease, border-color 180ms ease',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha('#1e3a8a', 0.5),
                    },
                    '&.Mui-focused': {
                        boxShadow: '0 0 0 4px rgba(30,58,138,0.12)',
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    minHeight: 44,
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: 12,
                    backgroundColor: '#0f172a',
                    borderRadius: 8,
                    padding: '6px 10px',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 14px rgba(15,23,42,0.18)',
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(15, 23, 42, 0.08)',
                },
            },
        },
    },
});

export default theme;
