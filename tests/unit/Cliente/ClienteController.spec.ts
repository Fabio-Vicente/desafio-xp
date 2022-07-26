import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import { request, response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClienteController } from '../../../src/controllers';
import ClienteService from '../../../src/services';
import { usrLogin, usrToken, wrongLogin } from '../../mocks/login';

const { OK, UNAUTHORIZED } = StatusCodes;

describe('Verifica se o controller', () => {
  const service = new ClienteService();
  const controller = new ClienteController(service);

  response.status = stub().returns(response);
  response.json = stub();

  const next = stub();

  context('quando chamado com os dados corretos', () => {
    before(() => {
      request.body = usrLogin;
      stub(service, 'login').resolves({ token: usrToken, error: null });
    });

    after(() => {
      (service.login as SinonStub).restore();
    });

    it('responde com o token correto', async () => {
      await controller.login(request, response, next);

      expect((response.status as SinonStub).calledWith(OK)).to.be.true;
      expect((response.json as SinonStub).calledWith({ token: usrToken }));
    });
  });

  context('quando chamado com dados incorretos', () => {
    before(() => {
      request.body = wrongLogin;
      stub(service, 'login').resolves({ token: null, error: true });
    });

    after(() => {
      (service.login as SinonStub).restore();
    });

    it('chama o próximo middleware de erro por meio da função next', async () => {
      await controller.login(request, response, next);

      expect(next.called).to.be.true;
      expect(next.args[0]).to.have.length(1);
      expect(next.args[0][0]).to.be.an('object');
      expect(next.args[0][0]).to.have.property('statusCode');
      expect(next.args[0][0]).to.have.property('message');
      expect(next.args[0][0].statusCode).to.be.equal(UNAUTHORIZED);
      expect(next.args[0][0].message).to.be.equal('Não foi possível efetuar o login. Verifique os dados informados');
    });
  });
});
