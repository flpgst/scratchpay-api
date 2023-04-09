export interface IHttpClient {
  get(url: string): Promise<unknown>;
}
