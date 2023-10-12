import { CreateEntry } from "../../types";

interface Field {
    type: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
}

export interface Select {
    value: string[];
    onChange: (event: { target: { value: string[] }}) => void;
}

export interface BaseEntryForm {
    date: Field;
    specialist: Field;
    description: Field;
    diagnosesCodes: Select;
    onCancelButtonClick: () => void;
    onSaveButtonClick: (entry: CreateEntry) => void;
}