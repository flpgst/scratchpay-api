import { HttpClient } from '@/app/ports/http-client';

class FetchHttpClient implements HttpClient {
  async get(url: string): Promise<any> {
    return await (await fetch(url)).json();
  }
}

export default FetchHttpClient;
