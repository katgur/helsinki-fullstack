import { Alert, Button, Stack, Typography } from "@mui/material";
import EntryDetails from "./EntryDetails";
import { useEffect, useState } from "react";
import { CreateEntry, Entry } from "../../types";
import patientsService from "../../services/patients";
import useError from "../../hooks/useError";
import AddEntry from "../AddEntryForm";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

interface AddEntryForm {
    isShown: boolean;
    type: string;
}

interface Props {
    patientId: string;
}

function EntryListing({ patientId }: Props) {
    const [entryForm, setEntryForm] = useState<AddEntryForm>({ isShown: false, type: 'Hospital' });
    const [entries, setEntries] = useState<Entry[]>();
    const { error, handleError } = useError();
    const params = useParams();

    useEffect(() => {
        patientsService.getEntriesById(patientId)
            .then(data => setEntries(data))
            .catch(error => handleError(error));
    }, [handleError, patientId]);

    const onAddEntryClick = (type: string) => {
        setEntryForm({ isShown: true, type });
    };

    const onCancelButtonClick = () => {
        setEntryForm({ isShown: false, type: 'Hospital' });
    };

    const onSaveButtonClick = (entry: CreateEntry) => {
        const id = params.id as string;
        patientService.createEntry(id, entry)
            .then(data => setEntries(data))
            .catch(error => handleError(error));
        setEntryForm({ isShown: false, type: 'Hospital' });
    };

    return (
        <div>
            <Typography variant="h5" style={{ marginTop: "0.5em" }}>
                Entries
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Button onClick={() => onAddEntryClick('HealthCheck')}>Add Healthcheck Entry</Button>
            <Button onClick={() => onAddEntryClick('Hospital')}>Add Hospital Entry</Button>
            <Button onClick={() => onAddEntryClick('OccupationalHealthcare')}>Add Occupation Healtcare Entry</Button>
            {entryForm.isShown && <AddEntry type={entryForm.type} {...{ onCancelButtonClick, onSaveButtonClick }} />}
            <Stack spacing={2}>
                {
                    entries && entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)
                }
            </Stack>
        </div>
    );
}

export default EntryListing;