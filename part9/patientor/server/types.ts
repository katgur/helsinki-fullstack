export interface Diagnosis {
    code: string,
    name: string,
    latin?: string,
}

export interface Entry {
    date: string,
    description: string,
    diagnoseCodes: string[],
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type CreatePatient = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}