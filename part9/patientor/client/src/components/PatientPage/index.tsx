import { useEffect, useState } from "react";
import { Alert, SvgIcon, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Patient, Gender, Diagnosis } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useParams } from "react-router-dom";
import useError from "../../hooks/useError";

const PatientPage = () => {
    const params = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const { error, handleError } = useError();

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

        diagnosesService.getAll()
            .then(data => {
                setDiagnoses(data);
            })
            .catch(error => handleError(error));
    }, []);

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
                    <Typography variant="h5" style={{ marginTop: "0.5em" }}>
                        Entries
                    </Typography>
                    {patient.entries.map(entry => {
                        return (
                            <div key={entry.date}>
                                <Typography>{entry.date} <i>{entry.description}</i></Typography>
                                {diagnoses && <ul>
                                    {entry.diagnoseCodes.map(code => {
                                        const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
                                        return <li key={code}><Typography>{code} {diagnosis?.name}</Typography></li>;
                                    })}
                                </ul>}
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default PatientPage;
