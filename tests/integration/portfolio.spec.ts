import chai, { expect } from 'chai';
import chariHttp from 'chai-http';
import { stub } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import server from '../../src/app';
import { CarteiraModel } from '../../src/database/models';
import { invalidToken, usrToken } from '../mocks/login';
import { costumerAssets, asset } from '../mocks/portfolio';

const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
} = StatusCodes;

chai.use(chariHttp);

let response;

describe('Verifica se a requisição para listagem de ativos do clientes ', () => {
  context('quando realizada de forma correta', () => {
    before(async () => {
      stub(CarteiraModel, 'findAll').resolves(costumerAssets);
      response = await chai.request(server).get('/ativos/cliente/1').set('authorization', usrToken);
    });

    after(() => {
      CarteiraModel.findAll.restore();
    });

    it('retorna o status 200-OK', () => {
      expect(response).to.have.status(OK);
    });

    it('retorna a lista de ativos do cliente no formato correto', () => {
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(2);

      expect(response.body[0]).to.have.property('codCliente');
      expect(response.body[0]).to.have.property('codAtivo');
      expect(response.body[0]).to.have.property('qtdeAtivo');
      expect(response.body[0]).to.have.property('valor');
      expect(response.body[0].codCliente).to.have.property('number');
      expect(response.body[0].codAtivo).to.have.property('number');
      expect(response.body[0].qtdeAtivo).to.have.property('number');
      expect(response.body[0].valor).to.have.property('number');
    });
  });

  context('quando é realizada sem um token', () => {
    before(async () => {
      response = await chai.request(server).get('/ativos/cliente/1');
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "A requisição deve ter um \'header\' de autorização"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be('string');
      expect(response.body).to.be.deep.equal({ message: 'A requisição deve ter um \'header\' de autorização' });
    });
  });

  context('quando realizada com um token inválido', () => {
    before(async () => {
      response = await chai.request(server).get('/ativos/cliente/1').set('authorization', invalidToken);
    });

    it('retorna o status 401-UNAUTHORIZED', () => {
      expect(response).to.have.status(UNAUTHORIZED);
    });

    it('retorna uma resposta com a mensagem "Este usuário não tem permissão para fazer essa operação"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be('string');
      expect(response.body).to.be.deep.equal({ message: 'Este usuário não tem permissão para fazer essa operação' });
    });
  });
});

describe('Verifica se a requisição para informações de um ativo', () => {
  before(async () => {
    stub(CarteiraModel, 'findOne').resolves(asset);
    response = await chai.request(server).get('/ativos/XPBR31');
  });

  after(() => {
    CarteiraModel.findOne.restore();
  });

  it('retorna o status 200-OK', () => {
    expect(response).to.have.status(OK);
  });

  it('retorna o ativo no formato correto', () => {
    expect(response.body).to.be.an('object');

    expect(response.body).to.have.property('codAtivo');
    expect(response.body).to.have.property('qtdeAtivo');
    expect(response.body).to.have.property('valor');
    expect(response.body.codAtivo).to.have.property('number');
    expect(response.body.qtdeAtivo).to.have.property('number');
    expect(response.body.valor).to.have.property('number');

    expect(response.body).to.be.deep.equal({
      codAtivo: 'XPBR31',
      qtdeAtivo: 447.704,
      valor: 104.64,
    });
  });
});
