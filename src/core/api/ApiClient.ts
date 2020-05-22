import { ApiClientBase } from '../user/ApiClientBase';
import { handleServiceError } from '../ApiServiceErrors';
import { camelizeKeys } from '../user/utils';
import { AxiosResponse } from 'axios';

export interface IApiClient {
  post<T>(path: string, object: T): Promise<T>;
  get<T>(path: string): Promise<T>;
}

export default class ApiClient extends ApiClientBase implements IApiClient {
  protected client = ApiClientBase.client;

  private getData = <T>(response: AxiosResponse<T>) => {
    if (typeof response.data === 'string') {
      return <T>camelizeKeys(JSON.parse(response.data));
    } else {
      return camelizeKeys(response.data);
    }
  };


  async post<T>(path: string, payload: T): Promise<T> {
    try {
      const response = await this.client.post<T>(path, payload);
      return this.getData<T>(response);
    } catch (error) {
      handleServiceError(error);
    }
    return {} as T;
  }

  async get<T>(path: string): Promise<T> {
    try {
      const response = await this.client.get<T>(path);
      return this.getData<T>(response);
    } catch (error) {
      handleServiceError(error);
    }
    return {} as T;
  }
}
