import { Button, Stack, TextField } from "@mui/material";
import { BaseEntryForm } from "./types";
import { HealthCheckEntryFormValues, HealthCheckRating } from "../../types";
import DiagnosesSelect from "./DiagnosesSelect";
import HealthCheckRatingSelect from "./HealthRatingSelect";
import useSelect from "../../hooks/useSelect";

function HealthCheckForm({ date, specialist, description, diagnosesCodes, onCancelButtonClick, onSaveButtonClick }: BaseEntryForm) {
    const healthCheckRating = useSelect();

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(Object.values(HealthCheckRating).slice(0, 4), healthCheckRating.value[0]);

        const entry: HealthCheckEntryFormValues = {
            date: date.value,
            specialist: specialist.value,
            description: specialist.value,
            diagnosisCodes: diagnosesCodes.value,
            type: 'HealthCheck',
            healthCheckRating: Object.values(HealthCheckRating).slice(0, 4).indexOf(healthCheckRating.value[0]),
        };
        onSaveButtonClick(entry);
    };

    return (
        <form onSubmit={onSubmit} style={{width: "50%"}}>
            <Stack spacing={2}>
                <TextField {...date} />
                <TextField {...specialist} />
                <TextField {...description} />
                <DiagnosesSelect {...diagnosesCodes} />
                <HealthCheckRatingSelect {...healthCheckRating} />
                <Button onClick={onCancelButtonClick} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Stack>
        </form>
    );
}

export default HealthCheckForm;