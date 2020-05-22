import { IStorageService } from './LocalStorageService';
import { IApiClient } from './api/ApiClient';
import { CountryCode } from './types';

const STARTUP_INFO = 'STARTUP_INFO';
type StartupInfo = {
  ipCountry: CountryCode;
  userCount: number;
};

type Link = {
  title: string;
  url: string;
};

export type CalloutBoxContent = {
  title: string;
  description: string;
  link: Link;
};

export interface IContentRemoteClient {
  getStartupInfo: () => Promise<any>;
}

export class ContentApiClient implements IContentRemoteClient {
  apiClient: IApiClient;
  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  async getStartupInfo() {
    return await this.apiClient.get<StartupInfo>('/users/startup_info/');
  }
}

export interface IContentService {
  init(): Promise<boolean>;
  getIpCountry(): Promise<CountryCode>;
  getUserCount(): Promise<number>;
  getWelcomeContent(): Promise<CalloutBoxContent>;
}

export default class ContentService implements IContentService {
  apiClient: IContentRemoteClient;
  storage: IStorageService;

  userCount: number = 0;
  ipCountry: CountryCode | null = null;

  constructor(apiClient: IContentRemoteClient, storage: IStorageService) {
    this.apiClient = apiClient;
    this.storage = storage;
  }

  async init(): Promise<boolean> {
    const info = await this.apiClient.getStartupInfo();

    if (info.usersCount) {
      this.userCount = info.usersCount;
    }

    if (info.ipCountry) {
      this.ipCountry = info.ipCountry;
    }

    this.storage.setObject<StartupInfo>(STARTUP_INFO, {
      ipCountry: this.ipCountry as CountryCode,
      userCount: this.userCount,
    });

    return Promise.resolve(true);
  }

  async getIpCountry() {
    return Promise.resolve(this.ipCountry as CountryCode);
  }

  async getUserCount(): Promise<number> {
    return Promise.resolve(6);
  }

  async getWelcomeContent(): Promise<CalloutBoxContent> {
    return {
      title: 'Hello World',
      description: 'This is a description',
      link: {
        title: 'CLICK HERE',
        url: 'https://covid.joinzoe.com/',
      },
    };
  }
}
