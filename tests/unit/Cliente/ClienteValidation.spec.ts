import { expect } from 'chai';
import { stub } from 'sinon';
import { request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClienteValidation } from '../../../src/middlewares'
import {
  invalidCodLogin,
  invalidPasswordLogin,
  noCodClienteLogin,
  noPassworLogin,
  shortPasswordLogin,
} from '../../mocks/login';

const { BAD_REQUEST, LENGTH_REQUIRED, UNPROCESSABLE_ENTITY } = StatusCodes;

describe('Verifica se o middleware de validação', () => {
  const next = stub();

  context('quando chamado sem o dado de cliente', () => {
    before(() => {
      request.body = noCodClienteLogin;
    });

    it('chama o próximo middleware de erro por meio da função next com o erro apropriado"', () => {
      ClienteValidation.verifyLogin(request, null, next);

      expect(next.called).to.be.true;
      expect(next.args[0]).to.have.length(1);
      expect(next.args[0][0]).to.be.an('object');
      expect(next.args[0][0]).to.have.property('statusCode');
      expect(next.args[0][0]).to.have.property('message');
      expect(next.args[0][0].statusCode).to.be.equal(BAD_REQUEST);
      expect(next.args[0][0].message).to.be.equal('Cliente não informado');
    });
  });

  context('quando chamado sem a senha', () => {
    before(() => {
      request.body = noPassworLogin;
    });

    it('chama o próximo middleware de erro por meio da função next com o erro apropriado', () => {
      ClienteValidation.verifyLogin(request, null, next);

      expect(next.called).to.be.true;
      expect(next.args[0]).to.have.length(1);
      expect(next.args[0][0]).to.be.an('object');
      expect(next.args[0][0]).to.have.property('statusCode');
      expect(next.args[0][0]).to.have.property('message');
      expect(next.args[0][0].statusCode).to.be.equal(BAD_REQUEST);
      expect(next.args[0][0].message).to.be.equal('Senha não informada');
    });
  });

  context('quando chamado com um formato de código de cliente inválido', () => {
    before(() => {
      request.body = invalidCodLogin;
    });

    it('chama o próximo middleware de erro por meio da função next com o erro apropriado', () => {
      ClienteValidation.login(request, null, next);

      expect(next.called).to.be.true;
      expect(next.args[0]).to.have.length(1);
      expect(next.args[0][0]).to.be.an('object');
      expect(next.args[0][0]).to.have.property('statusCode');
      expect(next.args[0][0]).to.have.property('message');
      expect(next.args[0][0].statusCode).to.be.equal(UNPROCESSABLE_ENTITY);
      expect(next.args[0][0].message).to.be.equal('Formato de cliente inválido');
    });
  });

  context('quando chamado com um formato de senha inválido', () => {
    before(() => {
      request.body = invalidPasswordLogin;
    });

    it('chama o próximo middleware de erro por meio da função next com o erro apropriado', () => {
      ClienteValidation.login(request, null, next);

      expect(next.called).to.be.true;
      expect(next.args[0]).to.have.length(1);
      expect(next.args[0][0]).to.be.an('object');
      expect(next.args[0][0]).to.have.property('statusCode');
      expect(next.args[0][0]).to.have.property('message');
      expect(next.args[0][0].statusCode).to.be.equal(UNPROCESSABLE_ENTITY);
      expect(next.args[0][0].message).to.be.equal('Formato de senha inválido');
    });
  });

  context('quando chamado com uma senha menor do que 8 caracteres', () => {
    before(() => {
      request.body = shortPasswordLogin;
    });

    it('chama o próximo middleware de erro por meio da função next com o erro apropriado', () => {
      ClienteValidation.login(request, null, next);

      expect(next.called).to.be.true;
      expect(next.args[0]).to.have.length(1);
      expect(next.args[0][0]).to.be.an('object');
      expect(next.args[0][0]).to.have.property('statusCode');
      expect(next.args[0][0]).to.have.property('message');
      expect(next.args[0][0].statusCode).to.be.equal(LENGTH_REQUIRED);
      expect(next.args[0][0].message).to.be.equal('A senha deve ter mais de 8 caracteres');
    });
  });
});
