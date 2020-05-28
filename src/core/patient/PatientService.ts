import { IApiClient } from '../api/ApiClient';
import { PatientInfosRequest } from '../user/dto/UserAPIContracts';
import { PatientStateType } from './PatientState';
import { handleServiceError } from '../api/ApiServiceErrors';
import { PatientResponse } from './dto/PatientResponse';

export interface IPatientRemoteClient {
  getPatients(): Promise<any>;
}

export class PatientApiClient implements IPatientRemoteClient {
  apiClient: IApiClient;
  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }
  async getPatients(): Promise<PatientResponse[]> {
    try {
      const response = await this.apiClient.get<PatientResponse[]>(`/patient_list/`);
      return response;
    } catch (error) {
      handleServiceError(error);
    }
    return [];
  }
}

export interface IPatientService {
  listPatients(): Promise<any>;
  createPatient(infos: Partial<PatientInfosRequest>): Promise<any>;
  updatePatient(patientId: string, infos: Partial<PatientInfosRequest>): Promise<any>;
  getPatient(patientId: string): Promise<PatientInfosRequest | null>;
  updatePatientState(patientState: PatientStateType, patient: PatientInfosRequest): Promise<PatientStateType>;
  getCurrentPatient(patientId: string, patient?: PatientInfosRequest): Promise<PatientStateType>;
}

export default class PatientService implements IPatientService {
  apiClient: IPatientRemoteClient;

  constructor(apiClient: IPatientRemoteClient) {
    this.apiClient = apiClient;
  }
  listPatients(): Promise<PatientResponse[]> {
    return this.apiClient.getPatients();
  }
  createPatient(infos: Partial<PatientInfosRequest>): Promise<any> {
    throw new Error('Method not implemented.');
  }
  updatePatient(patientId: string, infos: Partial<PatientInfosRequest>): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getPatient(patientId: string): Promise<PatientInfosRequest | null> {
    throw new Error('Method not implemented.');
  }
  updatePatientState(patientState: PatientStateType, patient: PatientInfosRequest): Promise<PatientStateType> {
    throw new Error('Method not implemented.');
  }
  getCurrentPatient(patientId: string, patient?: PatientInfosRequest | undefined): Promise<PatientStateType> {
    throw new Error('Method not implemented.');
  }
}
