import Select from "@mui/material/Select";
import { MenuItem, OutlinedInput } from "@mui/material";
import { Diagnosis } from "../../types";
import { Select as SelectProps } from './types';
import diagnosesService from "../../services/diagnoses";
import useError from "../../hooks/useError";
import { useEffect, useState } from "react";

function DiagnosesSelect(props: SelectProps) {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const { handleError } = useError();

    useEffect(() => {
        diagnosesService.getAll()
            .then(data => setDiagnoses(data))
            .catch(error => handleError(error));
    }, [handleError]);

    return (
        <Select multiple
            displayEmpty
            {...props}
            input={<OutlinedInput />}
            renderValue={(selected) => {
                if (selected.length === 0) {
                    return <span style={{ color: 'gray' }}>Diagnoses</span>;
                }
                return selected.join(', ');
            }}
            inputProps={{ 'aria-label': 'Without label' }}
        >
            {
                diagnoses &&
                diagnoses.map(diagnosis => {
                    return <MenuItem key={diagnosis.code} value={diagnosis.code}>{diagnosis.code} {diagnosis.name}</MenuItem>;
                })
            }
        </Select>
    );
}

export default DiagnosesSelect;