import useField from "../../hooks/useField";
import { CreateEntry } from "../../types";
import { never } from "../../utils";
import AddHospitalEntry from "./AddHospitalEntry";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

interface Props {
    type: string;
    onCancelButtonClick: () => void;
    onSaveButtonClick: (entry: CreateEntry) => void;
}

function AddEntry({ type, onCancelButtonClick, onSaveButtonClick }: Props) {
    const date = useField({ label: 'Date', type: 'date' });
    const specialist = useField({ label: 'Specialist', type: 'text' });
    const description = useField({ label: 'Description', type: 'text' });
    const diagnosesCodes = useField({ label: 'Diagnoses', type: 'text' });

    const fields = { date, specialist, description, diagnosesCodes, onCancelButtonClick, onSaveButtonClick };

    switch (type) {
        case 'Hospital':
            return <AddHospitalEntry {...fields} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareForm {...fields} />;
        case 'HealthCheck':
            return <HealthCheckForm {...fields} />;
        default:
            return never();
    }
}

export default AddEntry;