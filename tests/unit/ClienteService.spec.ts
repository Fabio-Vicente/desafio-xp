import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import jwt from 'jsonwebtoken';
import { ClienteService } from '../../src/services';
import { ClienteModel } from '../../src/database/models';
import { ILogin } from '../../src/interfaces';
import {
  noInfoLogin,
  notFoundUser,
  regularUser,
  usrLogin,
  usrToken,
  wrongLogin,
} from '../mocks/login';

console.log(typeof jwt);

describe('Verifica se o serviço de login', () => {
  const service = new ClienteService();

  context('quando o cliente e senha informados estão corretos', () => {
    before(() => {
      stub(jwt, 'sign').returns(usrToken as unknown as void);
      stub(ClienteModel, 'findOne').resolves(regularUser as ClienteModel);
    });

    after(() => {
      (jwt.sign as SinonStub).restore();
      (ClienteModel.findOne as SinonStub).restore();
    });

    it('retorna corretamente o token de autenticação', async () => {
      const { codCliente, senha } = usrLogin;
      const { error, token } = await service.login({ codCliente, senha });

      expect(token).to.be.a('string');
      expect(token).to.be.deep.equal(usrToken);
      expect(error).to.be.null;
    });
  });

  context('quando o cliente ou senha são informados incorretamente', () => {
    before(() => {
      stub(ClienteModel, 'findOne').resolves(notFoundUser);
    });

    after(() => {
      (ClienteModel.findOne as SinonStub).restore();
    });

    it('retorna um objeto de erro', async () => {
      const { codCliente, senha } = wrongLogin;
      const { error, token } = await service.login({ codCliente, senha });

      expect(error).to.be.not.null;
      expect(token).to.be.null;
    });
  });

  context('quando não é informado o cliente ou a senha', () => {
    const { codCliente, senha } = noInfoLogin as ILogin;
    it('lança uma exceção', () => {
      const expectionFunction = () => service.login({ codCliente, senha });
      expect(expectionFunction).to.throws;
    });
  });
});
