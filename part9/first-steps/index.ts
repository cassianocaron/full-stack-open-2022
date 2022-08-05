import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, parseInput } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight));

  const bmi = calculateBmi(Number(height), Number(weight));

  if (!validParameters || !weight || !height) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  res.send({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, dailyExercises } = req.body;

  if (!(dailyExercises && target)) {
    res.status(400).send({ error: "parameters missing" });
  }

  try {
    const { parsedTarget, parsedDailyHours } = parseInput(
      target,
      dailyExercises
    );
    res.send(calculateExercises(parsedTarget, parsedDailyHours));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
