export const calculateBmi = (height: number, weight: number) => {
    if (height <= 0 || weight <= 0) {
        throw new RangeError('args should be more than 0');
    }
    const bmi = weight / (height * height) * 10000;
    if (bmi >= 40) {
        return 'Obese (Class III)';
    } else if (bmi >= 35) {
        return 'Obese (Class II)';
    } else if (bmi >= 30) {
        return 'Obese (Class I)';
    } else if (bmi >= 25) {
        return 'Overweight (Pre-obese)';
    } else if (bmi >= 18.5) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 17) {
        return 'Underweight (Mild thinness)';
    } else if (bmi >= 16) {
        return 'Underweight (Moderate thinness)';
    } else {
        return 'Underweight (Severe thinness)';
    }
};

try {
    const height = Number(process.argv[2]), weight = Number(process.argv[3]);
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('one of the arguments is missing or not a number');
    }
    const result = calculateBmi(height, weight);
    console.log(result);
} catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(error.message);
}