import { CoursePart } from "../types";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
