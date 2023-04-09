import { IHttpClient } from '@/types/IHttpClient';

export class FetchHttpClient implements IHttpClient {
  async get(url: string): Promise<unknown> {
    return await (await fetch(url)).json();
  }
}
