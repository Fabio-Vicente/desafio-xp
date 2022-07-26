import 'dotenv/config';
import jwt, { SignOptions } from 'jsonwebtoken';
import { tokenPayload } from '../interfaces/login';

export default class Auth {
  private static secret: string = process.env.TOKEN_SECRET as string;

  static generateToken(data: any, config: SignOptions | undefined = undefined): string {
    return jwt.sign({ data }, this.secret, config);
  }

  static verifyToken(token: string) {
    try {
      const { data } = jwt.verify(token, this.secret) as tokenPayload;
      return data;
    } catch (error) {
      return null;
    }
  }
}
