import express from 'express';
import patientsService from '../services/patientsService';
import { toCreateEntry, toCreatePatient } from '../typeGuards';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsService.getAllNonSensitive());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientsService.getById(id);
    if (!patient) {
        res.status(404).json({ error: 'patinent with id not found' });
        return;
    }
    res.json(patient);
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

router.get('/:id/entries', (req, res) => {
    const id = req.params.id;
    const entries = patientsService.getEntries(id);
    if (!entries) {
        res.status(404).json({ error: 'patinent with id not found' });
        return;
    }
    res.json(entries);
});

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const createEntry = toCreateEntry(req.body);
        const patient = patientsService.createEntry(id, createEntry);
        if (!patient) {
            res.status(404).json({ error: 'patinent with id not found' });
            return;
        }
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