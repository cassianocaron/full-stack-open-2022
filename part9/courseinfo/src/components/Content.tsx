interface Parts {
  name: string;
  exerciseCount: number;
}

const Content = (courseParts: Parts[]) => {
  return (
    <div>
      {courseParts.map((part: Parts) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
