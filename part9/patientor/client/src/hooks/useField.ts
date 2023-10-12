import { useState } from 'react';

interface Props {
    label: string;
    type: string;
}

function useField({ label, type }: Props) {
    const [value, setValue] = useState<string>('');
    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };
    return { value, onChange, label, type };
}

export default useField;