import { Button, Stack, TextField } from "@mui/material";
import { BaseEntryForm } from "./types";
import useField from "../../hooks/useField";
import { HealthCheckEntryFormValues } from "../../types";

function HealthCheckForm({ date, specialist, description, diagnosesCodes, onCancelButtonClick }: BaseEntryForm) {
    const healthCheckRating = useField({ label: 'Healthcheck rating', type: 'number' });

    const onSaveButtonClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const entry: HealthCheckEntryFormValues = {
            date: date.value,
            specialist: specialist.value,
            description: specialist.value,
            diagnosisCodes: diagnosesCodes.value.split(', '),
            type: 'HealthCheck',
            healthCheckRating: Number(healthCheckRating.value),
        };
        console.log(entry);
    };

    return (
        <form onSubmit={onSaveButtonClick} style={{width: "50%"}}>
            <Stack spacing={2}>
                <TextField {...date} />
                <TextField {...specialist} />
                <TextField {...description} />
                <TextField {...diagnosesCodes} />
                <TextField {...healthCheckRating} />
                <Button onClick={onCancelButtonClick} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Stack>
        </form>
    );
}

export default HealthCheckForm;