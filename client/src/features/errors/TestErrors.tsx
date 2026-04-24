import {Alert, Box, Button, Paper, Stack, Typography} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import agent from "../../lib/api/agent.ts";
import {useState} from "react";

export default function TestErrors() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const {mutate} = useMutation({
        mutationFn: async ({path, method = 'get'}: { path: string; method: string }) => {
            if (method === 'post') await agent.post(path, {});
            else await agent.get(path);
        },
        onError: (err) => {
            if (Array.isArray(err)) {
                setValidationErrors(err);
            } else {
                setValidationErrors([]);
            }
        },
    });

    const handleError = (path: string, method = 'get') => {
        mutate({path, method});
    };

    const buttons: { label: string; path: string; method?: string; color: 'primary' | 'warning' | 'error' | 'info' | 'secondary' }[] = [
        {label: 'Not found', path: 'buggy/not-found', color: 'info'},
        {label: 'Bad request', path: 'buggy/bad-request', color: 'warning'},
        {label: 'Validation error', path: 'activities', method: 'post', color: 'secondary'},
        {label: 'Server error', path: 'buggy/server-error', color: 'error'},
        {label: 'Unauthorised', path: 'buggy/unauthorised', color: 'primary'},
    ];

    return (
        <Paper sx={{p: {xs: 3, md: 4}, borderRadius: 3}}>
            <Typography variant="h4" sx={{mb: 1}}>Test errors</Typography>
            <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                Trigger different error scenarios to verify app behaviour.
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1.5}>
                {buttons.map(btn => (
                    <Button
                        key={btn.label}
                        variant="contained"
                        color={btn.color}
                        onClick={() => handleError(btn.path, btn.method)}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Stack>

            {validationErrors.length > 0 && (
                <Box sx={{mt: 3}}>
                    <Stack spacing={1}>
                        {validationErrors.map((err, i) => (
                            <Alert key={i} severity='error' sx={{borderRadius: 2}}>
                                {err}
                            </Alert>
                        ))}
                    </Stack>
                </Box>
            )}
        </Paper>
    );
}
