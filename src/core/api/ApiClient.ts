import { ApiClientBase } from './ApiClientBase';
import { handleServiceError } from './ApiServiceErrors';

export interface IApiClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, object: T): Promise<T>;
}

export default class ApiClient extends ApiClientBase implements IApiClient {
  protected client = ApiClientBase.client;

  async get<T>(path: string): Promise<T> {
    try {
      const response = await this.client.get<T>(path);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as T;
  }

  async post<T>(path: string, payload: T): Promise<T> {
    try {
      const response = await this.client.post<T>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as T;
  }
}
