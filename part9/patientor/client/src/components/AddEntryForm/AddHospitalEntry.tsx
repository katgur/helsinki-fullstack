import { TextField, Stack, Button } from "@mui/material";
import useField from "../../hooks/useField";
import { BaseEntryForm } from "./types";
import { HospitalEntryFormValues } from "../../types";
import DiagnosesSelect from "./DiagnosesSelect";

function AddHospitalEntry({ date, specialist, description, diagnosesCodes, onCancelButtonClick, onSaveButtonClick }: BaseEntryForm) {
    const dischargeDate = useField({ label: 'Discharge date', type: 'date' });
    const dischargeCriteria = useField({ label: 'Discharge criteria', type: 'text' });

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const entry: HospitalEntryFormValues = {
            date: date.value,
            specialist: specialist.value,
            description: specialist.value,
            diagnosisCodes: diagnosesCodes.value,
            discharge: {
                date: dischargeDate.value,
                criteria: dischargeCriteria.value,
            },
            type: 'Hospital',
        };
        onSaveButtonClick(entry);
    };

    return (
        <form onSubmit={onSubmit} style={{ width: "50%" }}>
            <Stack spacing={2}>
                <TextField {...date} />
                <TextField {...specialist} />
                <TextField {...description} />
                <DiagnosesSelect {...diagnosesCodes} />
                <TextField {...dischargeDate} />
                <TextField {...dischargeCriteria} />
                <Button onClick={onCancelButtonClick} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Stack>
        </form>
    );
}

export default AddHospitalEntry;