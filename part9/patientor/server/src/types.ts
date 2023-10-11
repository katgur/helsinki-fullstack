export interface Diagnosis {
    code: string,
    name: string,
    latin?: string,
}

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: string[];
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

export interface OccupationHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    sickLeave?: TimeInterval;
    employerName: string;
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export type Entry = HospitalEntry | OccupationHealthcareEntry | HealthCheckEntry;

export interface Discharge {
    date: string;
    criteria: string;
}

export interface TimeInterval {
    startDate: string;
    endDate: string;
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NoEntriesPatient = Omit<Patient, 'entries'>;

export type CreatePatient = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

type CreateHospitalEntry = Omit<HospitalEntry, "id">;
type CreateOccupationHealthcareEntry = Omit<OccupationHealthcareEntry, "id">;
type CreateHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type CreateEntry = CreateHospitalEntry | CreateHealthCheckEntry | CreateOccupationHealthcareEntry;