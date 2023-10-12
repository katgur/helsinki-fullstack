import { useEffect, useState } from "react";
import { Alert, SvgIcon, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Patient, Gender } from "../../types";

import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import useError from "../../hooks/useError";
import EntryListing from "../EntryListing";


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
    }, [handleError, params.id]);

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
                    <EntryListing patientId={patient.id} />
                </div>
            }
        </div>
    );
};

export default PatientPage;
