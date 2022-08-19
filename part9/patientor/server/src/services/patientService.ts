import patientsData from "../../data/patients";
import { Patient, NewPatient } from "../types";
import { NonSensitivePatientData } from "../types";
import { v1 as uuid } from "uuid";

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

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { id, ...patient };
  patientsData.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatientsData, addPatient };
