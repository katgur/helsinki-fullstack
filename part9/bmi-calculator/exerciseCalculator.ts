interface Result {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
}

interface Rating {
    value: number,
    description: string,
}

const ratingDescriptions = [
    'bad result',
    'nice result',
    'great result'
];

const calculateRating = (average: number, target: number): Rating => {
    if (target === 0) {
        throw new RangeError('target value should be more than zero');
    }
    const completed = average / (target * 1.5);
    let ratingValue;
    if (completed >= 2 / 3) {
        ratingValue = 3;
    } else if (completed >= 1 / 3) {
        ratingValue = 2;
    } else {
        ratingValue = 1;
    }
    return {
        value: ratingValue,
        description: ratingDescriptions[ratingValue - 1],
    }
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
    if (hours.length === 0) {
        throw new RangeError('daily hours length should not equal to zero');
    }
    const totalHours = hours.reduce((acc, hour) => acc + hour);
    const average = totalHours / hours.length;
    const rating = calculateRating(average, target);
    return {
        periodLength: hours.length,
        trainingDays: hours.filter(hour => hour !== 0).length,
        target: target,
        average: average,
        success: target <= average,
        rating: rating.value,
        ratingDescription: rating.description,
    }
}

try {
    const target = Number(process.argv[2]);
    if (isNaN(target)) {
        throw new Error('target is missing or not a number');
    }
    const result = calculateExercises(process.argv.map(arg => Number(arg)).slice(3), target);
    console.log(result);
} catch (error) {
    console.log(error.message);
}