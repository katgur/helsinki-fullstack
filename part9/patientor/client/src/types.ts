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
  employerName: string | undefined;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: number;
}

export type Entry = HospitalEntry | OccupationHealthcareEntry | HealthCheckEntry;

interface Discharge {
  date: string;
  criteria: string;
}

interface TimeInterval {
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

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type OccupationHealthcareEntryFormValues = Omit<OccupationHealthcareEntry, "id">;
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;
export type CreateEntry = HospitalEntryFormValues | OccupationHealthcareEntryFormValues | HealthCheckEntryFormValues;