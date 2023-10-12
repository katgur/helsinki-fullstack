import { CreatePatient, Gender, CreateEntry, HospitalEntry, OccupationHealthcareEntry, HealthCheckRating, HealthCheckEntry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const isStringArray = (array: unknown): array is string[] => {
    return array instanceof Array && Array.isArray(array) && array.reduce<boolean>((isStringArray, arr) => isStringArray && isString(arr), true);
};

const isDiagnosisCode = (code: string): boolean => {
    return /^[A-Z]\d\d.*\d*/.test(code);
};

const isDiagnosesCodes = (array: string[]): boolean => {
    return array.reduce<boolean>((isCode, arr) => isCode && isDiagnosisCode(arr), true);
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const parseString = (feature: string, str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error(`Incorrect or missing ${feature}`);
    }
    return str;
};

const parseDate = (feature: string, date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${feature}`);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender`);
    }
    return gender;
};

const parseDiagnosisCodes = (feature: string, array: unknown): string[] => {
    if (!array || !isStringArray(array) || !isDiagnosesCodes(array)) {
        throw new Error(`Incorrect or missing ${feature}`);
    }
    return array;
};

export const toCreatePatient = (unknownData: unknown): CreatePatient => {
    const data = unknownData as CreatePatient;
    return {
        name: parseString('name', data.name),
        dateOfBirth: parseDate('dateOfBirth', data.dateOfBirth),
        ssn: parseString('ssn', data.ssn),
        gender: parseGender(data.gender),
        occupation: parseString('occupation', data.occupation),
        entries: [],
    };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error(`Incorrect or missing healthcheck rating`);
    }
    return rating;
};

export const toCreateEntry = (unknownData: unknown): CreateEntry => {
    const data = unknownData as CreateEntry;
    if (!data.type) {
        throw new Error('Missing parameter type');
    }
    const type = data.type as string;
    switch (type) {
        case 'Hospital':
            const hospitalEntry = data as HospitalEntry;
            return {
                date: parseDate('date', hospitalEntry.date),
                specialist: parseString('specialist', hospitalEntry.specialist),
                description: parseString('description', hospitalEntry.description),
                diagnosisCodes: parseDiagnosisCodes('diagnosesCodes', hospitalEntry.diagnosisCodes),
                discharge: {
                    date: parseDate('dischargeDate', hospitalEntry.discharge.date),
                    criteria: parseString('dischargeCriteria', hospitalEntry.discharge.criteria),
                },
                type: 'Hospital',
            };
        case 'OccupationalHealthcare':
            const occupationalHealthcareEntry = data as OccupationHealthcareEntry;
            return {
                date: parseDate('date', occupationalHealthcareEntry.date),
                specialist: parseString('specialist', occupationalHealthcareEntry.specialist),
                description: parseString('description', occupationalHealthcareEntry.description),
                diagnosisCodes: parseDiagnosisCodes('diagnosesCodes', occupationalHealthcareEntry.diagnosisCodes),
                sickLeave: {
                    startDate: parseDate('startDate', occupationalHealthcareEntry.sickLeave?.startDate),
                    endDate: parseDate('endDate', occupationalHealthcareEntry.sickLeave?.endDate),
                },
                employerName: parseString('employerName', occupationalHealthcareEntry.employerName),
                type: 'OccupationalHealthcare',
            };
        case 'HealthCheck':
            const healthCheckEntry = data as HealthCheckEntry;
            return {
                date: parseDate('date', healthCheckEntry.date),
                specialist: parseString('specialist', healthCheckEntry.specialist),
                description: parseString('description', healthCheckEntry.description),
                diagnosisCodes: parseDiagnosisCodes('diagnosesCodes', healthCheckEntry.diagnosisCodes),
                healthCheckRating: parseHealthCheckRating(healthCheckEntry.healthCheckRating),
                type: 'HealthCheck',
            };
        default:
            throw new Error('Invalid type od entry');
    }
};