import patients from '../data/patients';
import { CreatePatient, Patient, NonSensitivePatient } from '../types';
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

const getById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const create = (data: CreatePatient): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const patient: Patient = { id: uuid(), ...data };
    patients.push(patient);
    return patient;
};

export default {
    getAllNonSensitive,
    create,
    getById,
};