import { environment } from '../env/environment';
import { ServiceBase } from './service-base';

export interface IToken {
  currency: string;
  date: string;
  price?: string;
}

export class TokenService extends ServiceBase {
  async getListToken(): Promise<IToken[]> {
    console.log(environment.iconTokenPrefixUrl)
    return this.get(environment.tokenListUrl);
  }
}

export const tokenService = new TokenService();
