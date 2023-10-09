import { useEffect, useState } from "react";
import { Alert, SvgIcon } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Patient, Gender } from "../../types";

import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import useError from "../../hooks/useError";

const PatientPage = () => {
    const params = useParams();
    const [patient, setPatient] = useState<Patient>();
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
                    <h2>{patient.name}</h2>
                    <SvgIcon>
                        {icon}
                    </SvgIcon>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                </div>
            }
        </div>
    );
};

export default PatientPage;
