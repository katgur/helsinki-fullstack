import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

function useSelect() {
    const [value, setValue] = useState<string[]>([]);
    const onChange = (event: SelectChangeEvent<typeof value>) => {
        setValue(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
    };
    return { value, onChange };
}


export default useSelect;