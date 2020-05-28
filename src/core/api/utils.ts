import { camelCase } from 'lodash';
import { AxiosResponse } from 'axios';

export const getResponseData = <T>(response: AxiosResponse<T>) => {
  if (typeof response.data === 'string') {
    return <T>camelizeKeys(JSON.parse(response.data));
  } else {
    return camelizeKeys(response.data);
  }
};


export const camelizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
};
