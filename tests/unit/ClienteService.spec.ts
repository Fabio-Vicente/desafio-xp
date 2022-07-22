import { expect } from 'chai';
import { stub } from 'sinon';
import jwt from 'jsonwebtoken';
import { ClienteService } from '../../src/service';
import { ClienteModel } from '../../src/database/models';
import { noInfoLogin, notFoundUser, regularUser, usrLogin, usrToken, wrongLogin } from '../mocks/login';
import login from '../../src/interfaces';

describe('Verifica se o serviço de login', () => {
  context('quando o cliente e senha informados estão corretos', () => {
    before(() => {
      stub(jwt, 'sign').returns(usrToken);
      stub(ClienteModel, 'findOne').returns(regularUser);
    });

    after(() => {
      jwt.sign.restore();
      ClienteModel.findOne.restore();
    });

    it('retorna corretamente o token de autenticação', async () => {
      const { token, error } = await ClienteService.login(usrLogin.codCliente, usrLogin.senha);

      expect(token).to.be.a('string');
      expect(token).to.be.deep.equal(usrToken);
      expect(error).to.be.null;
    });
  });

  context('quando o cliente ou senha são informados incorretamente', () => {
    before(() => {
      stub(ClienteModel, 'findOne').returns(notFoundUser);
    });

    after(() => {
      ClienteModel.findOne.restore();
    });

    it('retorna um objeto de erro', () => {
      const { token, error } = await ClienteService.login(wrongLogin.codCliente, usrLogin.senha);

      expect(error).to.be.a('object');
      expect(token).to.be.null;
    });
  });

  context('quando não é informado o cliente ou a senha', () => {
    it('lança uma exceção', () => {
      const expectionFunction = () => ClienteService.login((noInfoLogin as login).codCliente, (noInfoLogin as login).senha);
      expect(expectionFunction).to.throws;
    });
  });
});
