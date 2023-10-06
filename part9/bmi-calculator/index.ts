import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (height === 0 || weight === 0 || isNaN(height) || isNaN(weight)) {
        return res.json({ error: "malformatted parameters" });
    }
    const result = calculateBmi(height, weight);
    return res.json({ weight, height, bmi: result });
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});