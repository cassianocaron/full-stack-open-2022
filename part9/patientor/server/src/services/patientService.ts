import patientsData from "../../data/patients";
import { Patient } from "../types";
import { NonSensitivePatientData } from "../types";

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getNonSensitivePatientsData = (): Array<NonSensitivePatientData> => {
  return patientsData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export default { getPatients, getNonSensitivePatientsData };
