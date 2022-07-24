import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import { request, response } from 'express';
import { ErrorMiddleware } from '../../src/middlewares';
import { ExpectedError } from '../../src/interfaces';

describe('Verifica se o middleware de erro envia', () => {
  response.status = stub().returns(response);
  response.json = stub();

  const error: ExpectedError = new Error() as ExpectedError;

  it('Uma mensagem com a descrição do erro', () => {
    before(() => {
      error.statusCode = 99;
      error.message = 'Retorno fictício';
    });

    after(() => {
      (response.status as SinonStub).resetHistory();
      (response.json as SinonStub).resetHistory();
    });

    ErrorMiddleware(error, request, response);

    expect((response.status as SinonStub).calledWith(error.statusCode)).to.be.true;
    expect((response.json as SinonStub).args[0][0]).to.be.an('object');
    expect((response.json as SinonStub).args[0][0]).to.have.property('message');
    expect((response.json as SinonStub).args[0][0].message).to.be.a('string');
    expect((response.json as SinonStub).calledWith({ message: error.message }));
  });
});
