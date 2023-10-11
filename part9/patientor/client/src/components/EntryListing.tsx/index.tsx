import { Stack, Typography } from "@mui/material";
import { Entry } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
    entries: Entry[];
}

function EntryListing({ entries }: Props) {
    return (
        <div>
            <Typography variant="h5" style={{ marginTop: "0.5em" }}>
                Entries
            </Typography>
            <Stack spacing={2}>

                {
                    entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)
                }
            </Stack>
        </div>
    );
}

export default EntryListing;