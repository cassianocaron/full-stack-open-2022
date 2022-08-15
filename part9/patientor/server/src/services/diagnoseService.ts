import diagnoseData from "../../data/diagnoses";
import { Diagnose } from "../types";

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoseData;
};

export default { getDiagnoses };
