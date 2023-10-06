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
    const totalHours = hours.reduce((acc, hour) => acc + hour);
    const average = totalHours / hours.length
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));