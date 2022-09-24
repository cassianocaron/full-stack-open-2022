interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface Description extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends Description {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends Description {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends Description {
  type: "special";
  requirements: ["nodejs", "jest"];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
