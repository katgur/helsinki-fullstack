import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (height === 0 || weight === 0 || isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    const result = calculateBmi(height, weight);
    return res.json({ weight, height, bmi: result });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises: dailyExercises } = req.body;
    if (!target || !dailyExercises) {
        return res.status(400).json({ error: "parameters missing" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
    if (isNaN(Number(target)) || !dailyExercises.find || dailyExercises.find((dailyExercise: any) => isNaN(Number(dailyExercise)))) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    const result = calculateExercises(dailyExercises as Array<number>, Number(target));
    return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});