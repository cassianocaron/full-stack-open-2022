interface Parts {
  name: string;
  exerciseCount: number;
}

const Total = (courseParts: Parts[]) => {
  return (
    <p>{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
  );
};

export default Total;
