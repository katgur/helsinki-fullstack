import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsService.getAllWithoutSsn());
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patient = patientsService.create({ name, dateOfBirth, ssn, gender, occupation });
    res.json(patient);
});

export default router;