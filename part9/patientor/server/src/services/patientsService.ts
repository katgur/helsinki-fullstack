import patients from '../data/patients';
import { CreatePatient, Patient, NonSensitivePatient, NoEntriesPatient, Entry, CreateEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getAllNonSensitive = (): NonSensitivePatient[] => {
    return patients.map(({ id, gender, dateOfBirth, name, occupation }) => ({
        id,
        gender,
        dateOfBirth,
        name,
        occupation,
    }));
};

const getById = (id: string): NoEntriesPatient | undefined => {
    return patients.find(patient => patient.id === id);
};

const create = (data: CreatePatient): Patient => {
    const patient: Patient = { id: uuid(), ...data };
    patients.push(patient);
    return patient;
};

const getEntries = (id: string): Entry[] | undefined => {
    const patient = patients.find(patient => patient.id === id);
    if (!patient) {
        return;
    }
    return patient.entries;
};

const createEntry = (id: string, data: CreateEntry): Entry[] | undefined => {
    const entry: Entry = { id: uuid(), ...data };
    const patient = patients.find(patient => patient.id === id);
    if (!patient) {
        return;
    }
    patient.entries.push(entry);
    return patient.entries;
};

export default {
    getAllNonSensitive,
    create,
    getById,
    getEntries,
    createEntry,
};