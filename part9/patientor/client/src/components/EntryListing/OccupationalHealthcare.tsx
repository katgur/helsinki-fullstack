import { Card, Icon, Typography } from "@mui/material";
import { OccupationHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    entry: OccupationHealthcareEntry;
}

function OccupationalHealthcareCard({ entry }: Props) {
    return (
        <Card variant="outlined" style={{padding: '1em'}}>
            <Typography>{entry.date} <Icon><WorkIcon /></Icon></Typography>
            <Typography>{entry.description}</Typography>
            <Typography>diagnosed by {entry.specialist}</Typography>
        </Card>
    );
}

export default OccupationalHealthcareCard;