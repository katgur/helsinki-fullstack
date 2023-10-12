import { MenuItem, OutlinedInput, Select } from "@mui/material";
import { HealthCheckRating } from "../../types";
import { Select as SelectProps } from './types';

function HealthCheckRatingSelect(props: SelectProps) {
    const ratings = Object.values(HealthCheckRating).slice(0, 4);

    return (
        <Select
            displayEmpty
            {...props}
            input={<OutlinedInput />}
            renderValue={(selected) => {
                if (selected.length === 0) {
                    return <span style={{ color: 'gray' }}>HealthCheck Rating</span>;
                }
                return selected.join(', ');
            }}
            inputProps={{ 'aria-label': 'Without label' }}
        >
            {
                ratings &&
                ratings.map(rating => {
                    return <MenuItem key={rating.toString()} value={rating}>{rating}</MenuItem>;
                })
            }
        </Select>
    );
}

export default HealthCheckRatingSelect;