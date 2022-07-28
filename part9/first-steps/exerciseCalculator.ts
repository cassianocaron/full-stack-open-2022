interface Result {
  periodLenght: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLenght = dailyHours.length;
  const trainingDays = dailyHours.filter((hour) => hour > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLenght;
  const success = average >= target;

  const getRating = (average: number, target: number): number => {
    if (average < target * 0.9) return 1;
    if (average < target) return 2;
    if (average >= target) return 3;
  };

  const getRatingDescription = (rating: number): string => {
    if (rating === 1) {
      return "Don't give up! You can do better next week!";
    }
    if (rating === 2) {
      return "Good job but try doing better next week!";
    }
    if (rating === 3) {
      return "Nice work! Keep it up!";
    }
  };

  const rating = getRating(average, target);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLenght,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
