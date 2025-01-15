import axios, { Axios } from 'axios';

export abstract class ServiceBase {
  private baseUrl = '';
  private static client = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  protected async get(endPoint?: string) {
    const finalEnpoint = endPoint || this.baseUrl;
    if (!finalEnpoint) throw new Error('enpoint_cant_empty');
    const res = await ServiceBase.client.get(finalEnpoint);
    return res.data;
  }
}
