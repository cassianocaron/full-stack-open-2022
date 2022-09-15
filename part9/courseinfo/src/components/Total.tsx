/* eslint-disable @typescript-eslint/no-explicit-any */
const Total = (courseParts: any[]) => {
  return (
    <p>{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
  );
};

export default Total;
