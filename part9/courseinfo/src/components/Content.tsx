import { CoursePart } from "../types";
import Part from "./Part";

const margin = { marginTop: 10 };

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part, idx) => (
        <div key={idx} style={margin}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
