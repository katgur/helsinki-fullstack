import { Typography } from "@mui/material";
import { Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";
import { useState, useEffect } from 'react';
import useError from "../../hooks/useError";

interface Props {
    diagnosisCodes: string[];
}

function DiagnosisListing({ diagnosisCodes }: Props) {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const { handleError } = useError();

    useEffect(() => {
        diagnosesService.getAll()
            .then(data => {
                setDiagnoses(data);
            })
            .catch(error => handleError(error));
    }, [handleError]);

    return (
        <div>
            {diagnoses && <ul>
                {diagnosisCodes?.map(code => {
                    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
                    return <li key={code}><Typography>{code} {diagnosis?.name}</Typography></li>;
                })}
            </ul>}
        </div >
    );
}

export default DiagnosisListing;