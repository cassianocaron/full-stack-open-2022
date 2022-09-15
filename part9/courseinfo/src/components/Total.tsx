import { CoursePart } from "../types";

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const total = parts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
