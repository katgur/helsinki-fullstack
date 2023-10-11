interface Field {
    type: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
}

export interface BaseEntryForm {
    date: Field;
    specialist: Field;
    description: Field;
    diagnosesCodes: Field;
    onCancelButtonClick: () => void;
}