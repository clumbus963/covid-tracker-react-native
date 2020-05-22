export interface IPushTokenRemoteClient {
  updatePushToken(pushToken: PushToken): Promise<any>;
}

export type PushToken = {
  token: string;
  lastUpdated: string;
  platform: string;
};

export type CountryCode = 'GB' | 'US' | 'SE';
export type LanguageCode = 'en' | 'sv' | 'es';
