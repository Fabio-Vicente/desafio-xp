import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import { ClienteController } from '../../../src/controllers';
import ClienteService from '../../../src/services';
import {
  invalidCodLogin,
  invalidPasswordLogin,
  noCodClienteLogin,
  noPassworLogin,
  shortPasswordLogin,
  usrLogin,
  usrToken,
  wrongLogin,
} from '../../mocks/login';

const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} = StatusCodes;

describe('Verifica se o controller', () => {
  const service = new ClienteService();
  const controller = new ClienteController();
  let request;
  let response;

  response.status = stub().returns(response);
  response.json = stub();

  context('quando chamado com os dados corretos', () => {
    before(() => {
      request.body = usrLogin;
      stub(service, 'login').resolves({ token: usrToken, error: null });
    });

    after(() => {
      (service.login as SinonStub).restore();
    });

    it('responde com o token correto', async () => {
      await controller(request, response);

      expect(response.status.calledWith(OK)).to.be.true;
      expect(response.json.calledWith({ token: usrToken }));
    });
  });

  context('quando chamado sem o dado de cliente', () => {
    before(() => {
      request.body = noCodClienteLogin;
    });

    it('retorna a messagem "Cliente não informado"', async () => {
      await controller(request, response);

      expect(response.status.calledWith(BAD_REQUEST)).to.be.true;
      expect(response.json.calledWith({ message: 'Cliente não informado' }));
    });
  });

  context('quando chamado sem a senha', () => {
    before(() => {
      request.body = noPassworLogin;
    });

    it('retorna a messagem "Senha não informada', async () => {
      await controller(request, response);

      expect(response.status.calledWith(BAD_REQUEST)).to.be.true;
      expect(response.json.calledWith({ message: 'Senha não informada' }));
    });
  });

  context('quando chamado com um formato de código de cliente inválido', () => {
    before(() => {
      request.body = invalidCodLogin;
    });

    it('retorna a messagem "Formato de cliente inválido"', async () => {
      await controller(request, response);

      expect(response.status.calledWith(UNPROCESSABLE_ENTITY)).to.be.true;
      expect(response.json.calledWith({ message: 'Formato de cliente inválido' }));
    });
  });

  context('quando chamado com um formato de senha inválido', () => {
    before(() => {
      request.body = invalidPasswordLogin;
    });

    it('retorna a messagem "Formato de senha inválido"', async () => {
      await controller(request, response);

      expect(response.status.calledWith(UNPROCESSABLE_ENTITY)).to.be.true;
      expect(response.json.calledWith({ message: 'Formato de senha inválido' }));
    });
  });

  context('quando chamado com uma senha menor do que 8 caracteres', () => {
    before(() => {
      request.body = shortPasswordLogin;
    });

    it('retorna a messagem "A senha deve ter mais de 8 caracteres"', async () => {
      await controller(request, response);

      expect(response.status.calledWith(UNPROCESSABLE_ENTITY)).to.be.true;
      expect(response.json.calledWith({ message: 'A senha deve ter mais de 8 caracteres' }));
    });
  });

  context('quando chamado com dados incorretos', () => {
    before(() => {
      request.body = wrongLogin;
      stub(service, 'login').resolves({ token: null, error: true });
    });

    after(() => {
      (service.login as SinonStub).restore();
    })

    it('retorna a messagem "Não foi possível efetuar o login. Favor verificar os dados informados"', async () => {
      await controller(request, response);

      expect(response.status.calledWith(UNAUTHORIZED)).to.be.true;
      expect(response.json.calledWith({ message: 'Não foi possível efetuar o login. Favor verificar os dados informados' }));
    });
  });
});
