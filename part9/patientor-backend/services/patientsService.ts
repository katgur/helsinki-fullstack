import patients from '../data/patients';
import { PatientWithoutSsn } from '../types';

const getAllWithoutSsn = (): PatientWithoutSsn[] => {
    return patients.map(({ id, gender, dateOfBirth, name, occupation }) => ({
        id,
        gender,
        dateOfBirth,
        name,
        occupation,
    }));
};

export default {
    getAllWithoutSsn,
};