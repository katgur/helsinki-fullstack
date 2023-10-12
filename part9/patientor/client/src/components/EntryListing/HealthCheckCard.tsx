import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Card, Icon, Typography } from "@mui/material";
import { HealthCheckEntry } from "../../types";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DiagnosisListing from './DiagnosisListing';

interface Props {
    entry: HealthCheckEntry;
}

function HealthCheckCard({ entry }: Props) {
    return (
        <Card variant="outlined" style={{ padding: '1em' }}>
            <Typography>{entry.date} <Icon><HealthAndSafetyIcon /></Icon></Typography>
            <Typography>{entry.description}</Typography>
            {
                Array(entry.healthCheckRating).fill(<FavoriteBorderIcon />).map((icon, index) => <Icon key={index}>{icon}</Icon>)
            }
            {
                Array(4 - entry.healthCheckRating).fill(<FavoriteIcon />).map((icon, index) => <Icon key={index}>{icon}</Icon>)
            }
            <Typography>diagnosed by {entry.specialist}</Typography>
            {entry.diagnosisCodes && <DiagnosisListing diagnosisCodes={entry.diagnosisCodes} />}
        </Card>
    );
}

export default HealthCheckCard;