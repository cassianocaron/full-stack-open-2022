import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case "groupProject":
      return <div>Project exercises {part.groupProjectCount}</div>;
    case "submission":
      return (
        <div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>{part.exerciseSubmissionLink}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>
            Required skills:{" "}
            {part.requirements.map((skill) => skill).join(", ")}
          </div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
