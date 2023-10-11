import { useEffect, useState } from "react";
import { Alert, Button, SvgIcon, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Patient, Gender } from "../../types";

import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import useError from "../../hooks/useError";
import EntryListing from "../EntryListing";
import AddEntry from "../AddEntryForm";

interface AddEntryForm {
    isShown: boolean;
    type: string;
}

const PatientPage = () => {
    const params = useParams();
    const [patient, setPatient] = useState<Patient>();
    const { error, handleError } = useError();
    const [entryForm, setEntryForm] = useState<AddEntryForm>({ isShown: false, type: 'Hospital' });

    useEffect(() => {
        const id = params.id;
        if (!id) {
            return;
        }
        patientService.getById(id)
            .then(data => {
                setPatient(data);
            })
            .catch(error => handleError(error));
    }, []);

    const onAddEntryClick = (type: string) => {
        setEntryForm({ isShown: true, type });
    };

    const onCancelButtonClick = () => {
        setEntryForm({ isShown: false, type: 'Hospital' });
    };

    let icon;
    if (patient?.gender === Gender.Female) {
        icon = <FemaleIcon />;
    } else if (patient?.gender === Gender.Male) {
        icon = <MaleIcon />;
    }

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            {patient &&
                <div>
                    <Typography variant="h4" style={{ marginTop: "0.5em" }}>
                        {patient.name}
                        <SvgIcon>
                            {icon}
                        </SvgIcon>
                    </Typography>
                    <Typography>
                        ssn: {patient.ssn}
                    </Typography>
                    <Typography>
                        occupation: {patient.occupation}
                    </Typography>
                    <Button onClick={() => onAddEntryClick('HealthCheck')}>Add Healthcheck Entry</Button>
                    <Button onClick={() => onAddEntryClick('Hospital')}>Add Hospital Entry</Button>
                    <Button onClick={() => onAddEntryClick('OccupationalHealthcare')}>Add Occupation Healtcare Entry</Button>
                    {entryForm.isShown && <AddEntry type={entryForm.type} onCancelButtonClick={onCancelButtonClick} />}
                    <EntryListing patientId={patient.id} />
                </div>
            }
        </div>
    );
};

export default PatientPage;
