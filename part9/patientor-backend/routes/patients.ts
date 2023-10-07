import express from 'express';
import patientsService from '../services/patientsService';
import { toCreatePatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsService.getAllWithoutSsn());
});

router.post('/', (req, res) => {
    try {
        const createPatient = toCreatePatient(req.body);
        const patient = patientsService.create(createPatient);
        res.json(patient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;