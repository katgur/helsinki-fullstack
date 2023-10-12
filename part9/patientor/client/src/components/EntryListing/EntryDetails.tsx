import { Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheckCard from "./HealthCheckCard";
import HospitalEntryCard from "./HospitalEntryCard";
import OccupationalHealthcareCard from "./OccupationalHealthcare";

interface Props {
    entry: Entry;
}

function EntryDetails({ entry }: Props) {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryCard entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareCard entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckCard entry={entry} />;
        default:
            return assertNever(entry);
    }
}

export default EntryDetails;