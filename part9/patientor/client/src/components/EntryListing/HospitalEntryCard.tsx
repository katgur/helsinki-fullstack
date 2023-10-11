import { Card, Typography, Icon } from "@mui/material";
import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DiagnosisListing from "./DiagnosisListing";

interface Props {
    entry: HospitalEntry;
}

function HospitalEntryCard({ entry }: Props) {
    return (
        <Card variant="outlined" style={{padding: '1em'}}>
            <Typography>{entry.date} <Icon><LocalHospitalIcon /></Icon></Typography>
            <Typography>{entry.description}</Typography>
            <Typography>diagnosed by {entry.specialist}</Typography>
            {entry.diagnosisCodes && <DiagnosisListing diagnosisCodes={entry.diagnosisCodes} />}
        </Card>
    );
}

export default HospitalEntryCard;