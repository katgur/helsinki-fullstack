import { TextField, Stack, Button } from "@mui/material";
import useField from "../../hooks/useField";
import { BaseEntryForm } from "./types";
import { HospitalEntryFormValues } from "../../types";

function AddHospitalEntry({ date, specialist, description, diagnosesCodes, onCancelButtonClick }: BaseEntryForm) {
    const dischargeDate = useField({ label: 'Discharge date', type: 'text' });
    const dischargeCriteria = useField({ label: 'Discharge criteria', type: 'text' });

    const onSaveButtonClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const entry: HospitalEntryFormValues = {
            date: date.value,
            specialist: specialist.value,
            description: specialist.value,
            diagnosisCodes: diagnosesCodes.value.split(', '),
            discharge: {
                date: dischargeDate.value,
                criteria: dischargeCriteria.value,
            },
            type: 'Hospital',
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
                <TextField {...dischargeDate} />
                <TextField {...dischargeCriteria} />
                <Button onClick={onCancelButtonClick} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Stack>
        </form>
    );
}

export default AddHospitalEntry;