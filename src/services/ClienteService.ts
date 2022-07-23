import { SignOptions } from 'jsonwebtoken';
import { ModelStatic } from 'sequelize';
import Auth from '../Auth';
import { ClienteModel } from '../database/models';
import { ILogin, loginReturn } from '../interfaces';

export default class ClienteService {
  private model: ModelStatic<ClienteModel>

  private jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  constructor(model: ModelStatic<ClienteModel> = ClienteModel) {
    this.model = model;
  }

  public async login({ codCliente, senha }: ILogin): Promise<loginReturn> {
    const search = await this.model.findOne({ where: { codCliente, senha } });

    if (!search) {
      return { error: true, token: null };
    }

    const { funcao } = search;
    const token = Auth.generateToken({ codCliente, funcao }, this.jwtConfig as SignOptions);

    return { error: null, token };
  }
}
