const rls = require("readline-sync");

interface Values {
  value1: number;
  value2: number;
}

const height = rls.question("Enter your height in cm: ");
const weight = rls.question("Enter your weight in kg: ");

const parseInput = (height: string, weight: string): Values => {
  if (Number(height) <= 0 || Number(weight) <= 0) {
    throw new Error("Height and weight must be a positive value!");
  }
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      value1: Number(height),
      value2: Number(weight),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  console.log(`BMI: ${Math.round((bmi + Number.EPSILON) * 100) / 100}`);

  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi < 25) {
    return "Normal (healthy weight)";
  }
  if (bmi < 30) {
    return "Overweight";
  }
  return "Obese";
};

try {
  const { value1, value2 } = parseInput(height, weight);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
