import chai, { expect } from 'chai';
import chariHttp from 'chai-http';
import { stub } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import server from '../../src/app';
import { ClienteModel } from '../../src/database/models';
import { invalidToken, usrToken } from '../mocks/login';
import {
  costumer,
  depositCostumer,
  transaction,
  withdrawCostumer,
} from '../mocks/costumer';

const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  NO_CONTENT,
} = StatusCodes;

chai.use(chariHttp);

let response;

describe('Verifica se a requisição para saque pelo cliente', () => {
  context('quando realizada de forma correta', () => {
    before(async () => {
      stub(ClienteModel, 'findOne').resolves(costumer);
      stub(ClienteModel, 'update').resolves(withdrawCostumer);
      response = await chai
        .request(server)
        .post('/conta/saque')
        .send(transaction)
        .set('authorization', usrToken);
    });

    after(() => {
      ClienteModel.findOne.restore();
      ClienteModel.update.restore();
    });

    it('retorna o status 204-NO CONTENT', () => {
      expect(response).to.have.status(NO_CONTENT);
    });

    it('não retorna um conteúdo no corpo da resposta', () => {
      expect(response.body).to.be.null;
    });

    it('atualiza a saldo do cliente', () => {
      expect(ClienteModel.update.calledWithMatch({
        qtde: 500,
      }, {
        where: { cod_cliente: 1 },
      })).equals(true);
    });
  });

  context('quando realizada sem um token', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/conta/saque')
        .send(transaction);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "A requisição deve ter um \'header\' de autorização"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body).to.be.deep.equal({ message: 'A requisição deve ter um \'header\' de autorização' });
    });
  });

  context('quando realizada com um token inválido', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/conta/saque')
        .send(transaction)
        .set('authorization', invalidToken);
    });

    it('retorna o status 401-UNAUTHORIZED', () => {
      expect(response).to.have.status(UNAUTHORIZED);
    });

    it('retorna uma resposta com a mensagem "Este usuário não tem permissão para fazer essa operação"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body).to.be.deep.equal({ message: 'Este usuário não tem permissão para fazer essa operação' });
    });
  });
});

describe('Verifica se a requisição para depósito pelo cliente', () => {
  context('quando realizada de forma correta', () => {
    before(async () => {
      stub(ClienteModel, 'findOne').resolves(costumer);
      stub(ClienteModel, 'update').resolves(depositCostumer);
      response = await chai
        .request(server)
        .post('/conta/deposito')
        .send(transaction)
        .set('authorization', usrToken);
    });

    after(() => {
      ClienteModel.findOne.restore();
      ClienteModel.update.restore();
    });

    it('retorna o status 204-NO CONTENT', () => {
      expect(response).to.have.status(NO_CONTENT);
    });

    it('não retorna um conteúdo no corpo da resposta', () => {
      expect(response.body).to.be.null;
    });

    it('atualiza a saldo do cliente', () => {
      expect(ClienteModel.update.calledWithMatch({
        qtde: 1500,
      }, {
        where: { cod_cliente: 1 },
      })).equals(true);
    });
  });

  context('quando realizada sem um token', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/conta/saque')
        .send(transaction);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "A requisição deve ter um \'header\' de autorização"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body).to.be.deep.equal({ message: 'A requisição deve ter um \'header\' de autorização' });
    });
  });

  context('quando realizada com um token inválido', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/conta/saque')
        .send(transaction)
        .set('authorization', invalidToken);
    });

    it('retorna o status 401-UNAUTHORIZED', () => {
      expect(response).to.have.status(UNAUTHORIZED);
    });

    it('retorna uma resposta com a mensagem "Este usuário não tem permissão para fazer essa operação"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body).to.be.deep.equal({ message: 'Este usuário não tem permissão para fazer essa operação' });
    });
  });
});

describe('Verifica se a requisição para saldo do cliente', () => {
  context('quando realizada de forma correta', () => {
    before(async () => {
      stub(ClienteModel, 'findOne').resolves(costumer);
      response = await chai.request(server).get('/conta/1').set('authorization', usrToken);
    });

    after(() => {
      ClienteModel.findOne.restore();
    });

    it('retorna o status 200-OK', () => {
      expect(response).to.have.status(OK);
    });

    it('retorna o saldo para o cliente', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('codCliente');
      expect(response.body).to.have.property('saldo');
      expect(response.body.codCliente).to.be.a('string');
      expect(response.body.saldo).to.be.a('number');
      expect(response.body).to.be.deep.equal({
        codCliente: 1,
        saldo: 1000,
      });
    });
  });

  context('quando realizada sem um token', () => {
    before(async () => {
      response = await chai.request(server).get('/conta/1');
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
      response = await chai.request(server).get('/conta/1').set('authorization', invalidToken);
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
