export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitivePatientData = Omit<Patient, "ssn">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}
