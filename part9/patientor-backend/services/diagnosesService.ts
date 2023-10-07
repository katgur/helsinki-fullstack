import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';

const diagnosis: Diagnosis[] = diagnoses;

const getAll = () => {
    return diagnosis;
};

export default {
    getAll,
};