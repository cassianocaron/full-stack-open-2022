import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
