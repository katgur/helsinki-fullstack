import { Stack, Typography } from "@mui/material";
import EntryDetails from "./EntryDetails";
import { useEffect, useState } from "react";
import { Entry } from "../../types";
import patientsService from "../../services/patients";
import useError from "../../hooks/useError";

interface Props {
    patientId: string;
}

function EntryListing({ patientId }: Props) {
    const [entries, setEntries] = useState<Entry[]>();
    const { handleError } = useError();

    useEffect(() => {
        patientsService.getEntriesById(patientId)
            .then(data => setEntries(data))
            .catch(error => handleError(error));
    }, []);

    return (
        <div>
            <Typography variant="h5" style={{ marginTop: "0.5em" }}>
                Entries
            </Typography>
            <Stack spacing={2}>
                {
                    entries && entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)
                }
            </Stack>
        </div>
    );
}

export default EntryListing;