import 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';

export default class Auth {
  private static secret: string = process.env.SECRET as string;

  static generateToken(data: any, config: SignOptions | undefined = undefined): string {
    return jwt.sign({ data }, this.secret, config);
  }
}
