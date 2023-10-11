import { CreatePatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
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

export const toCreatePatient = (data: any): CreatePatient => {
    return {
        name: parseString('name', data.name),
        dateOfBirth: parseDate('dateOfBirth', data.dateOfBirth),
        ssn: parseString('ssn', data.ssn),
        gender: parseGender(data.gender),
        occupation: parseString('occupation', data.occupation),
        entries: [],
    };
};

