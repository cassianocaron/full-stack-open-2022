// import { question } from "readline-sync";

// interface rawValues {
//   rawHeight: string;
//   rawWeight: string;
// }

// interface parsedValues {
//   parsedHeight: number;
//   parsedWeight: number;
// }

// const getInput = (): rawValues => {
//   const rawHeight = question("Enter your height in cm: ");
//   const rawWeight = question("Enter your weight in kg: ");

//   return { rawHeight, rawWeight };
// };

// const parseInput = (rawHeight: string, rawWeight: string): parsedValues => {
//   if (Number(rawHeight) <= 0 || Number(rawWeight) <= 0) {
//     throw new Error("Height and weight must be a positive value!");
//   }
//   if (!isNaN(Number(rawHeight)) && !isNaN(Number(rawWeight))) {
//     return {
//       parsedHeight: Number(rawHeight),
//       parsedWeight: Number(rawWeight),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  // console.log(`BMI: ${Math.round((bmi + Number.EPSILON) * 100) / 100}`);

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

// try {
//   // const { rawHeight, rawWeight } = getInput();
//   const { parsedHeight, parsedWeight } = parseInput(
//     process.argv[2],
//     process.argv[3]
//   );
//   console.log(calculateBmi(parsedHeight, parsedWeight));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
