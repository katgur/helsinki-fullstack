import { Button, Stack, TextField } from "@mui/material";
import useField from "../../hooks/useField";
import { BaseEntryForm } from "./types";
import { OccupationHealthcareEntryFormValues } from "../../types";

function OccupationalHealthcareForm({ date, specialist, description, diagnosesCodes, onCancelButtonClick }: BaseEntryForm) {
    const startDate = useField({ label: 'Start date', type: 'date' });
    const endDate = useField({ label: 'End date', type: 'date' });
    const employerName = useField({ label: 'Employer name', type: 'text' });

    const onSaveButtonClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const entry: OccupationHealthcareEntryFormValues = {
            date: date.value,
            specialist: specialist.value,
            description: specialist.value,
            diagnosisCodes: diagnosesCodes.value.split(', '),
            type: 'OccupationalHealthcare',
            sickLeave: {
                startDate: startDate.value,
                endDate: endDate.value,
            },
            employerName: employerName.value,
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
                <TextField {...startDate} />
                <TextField {...endDate} />
                <TextField {...employerName} />
                <Button onClick={onCancelButtonClick} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Stack>
        </form>
    );
}

export default OccupationalHealthcareForm;