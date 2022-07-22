import chai, { expect } from 'chai';
import chariHttp from 'chai-http';
import { stub } from 'sinon';
import { StatusCodes } from 'http-status-codes';
import server from '../../src/app';
import {
  AtivoModel,
  CarteiraModel,
  OperacaoModel,
} from '../../src/database/models';
import { invalidToken, usrToken } from '../mocks/login';
import {
  transaction,
  insertedTransaction,
  updatedPortfolio,
  oldPortfolio,
  noPortfolio,
  noCostumerTransaction,
  noAssetTransaction,
  noQtdeTransaction,
  availableAssets,
  unavailableAssets,
  unsuficientPortfolio,
} from '../mocks/transactions';

const {
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_ACCEPTABLE,
} = StatusCodes;

chai.use(chariHttp);

let response;

describe('Verifica se a requisição da compra de um ativo', () => {
  context('quando realizada de forma correta e para um ativo já existente na carteira', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(transaction)
        .set('authorization', usrToken);
      stub(AtivoModel, 'findOne').resolves(availableAssets);
      stub(AtivoModel, 'update').resolves();
      stub(OperacaoModel, 'create').resolves(insertedTransaction);
      stub(CarteiraModel, 'findOne').resolves(oldPortfolio);
      stub(CarteiraModel, 'update').resolves(updatedPortfolio);
    });

    after(() => {
      AtivoModel.findOne.restore();
      AtivoModel.update.restore();
      OperacaoModel.create.restore();
      CarteiraModel.findOne.restore();
      CarteiraModel.update.restore();
    });

    it('retorna o status 201-CREATED', () => {
      expect(response).to.have.status(CREATED);
    });

    it('retorna uma resposta com o id da operação e o valor atualizado do ativo na carteira', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('updatedValue');
      expect(response.body).to.be.deep.equal({
        id: 2,
        updatedValue: 1_523.45,
        qtde: 15,
      });
    });

    it('atualiza o valor na tabela de carteira', () => {
      expect(CarteiraModel.update.calledWithMatch({
        valor: 1_523.45, qtde: 15,
      }, {
        where: { cod_cliente: 1, cod_ativo: 'XPBR31' },
      })).equals(true);
    });

    it('atualiza o valor na tabela de ativos', () => {
      expect(AtivoModel.update.calledWithMatch({
        valor: 476.55, qtde: 5,
      }, {
        where: { cod_ativo: 'XPBR31' },
      })).equals(true);
    });
  });

  context('quando realizada de forma correta para um ativo não existente na carteira', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(transaction)
        .set('authorization', usrToken);
      stub(AtivoModel, 'findOne').resolves(availableAssets);
      stub(AtivoModel, 'update').resolves();
      stub(OperacaoModel, 'create').resolves(insertedTransaction);
      stub(CarteiraModel, 'findOne').resolves(noPortfolio);
      stub(CarteiraModel, 'create').resolves(updatedPortfolio);
    });

    after(() => {
      AtivoModel.findOne.restore();
      OperacaoModel.create.restore();
      CarteiraModel.findOne.restore();
      CarteiraModel.create.restore();
    });

    it('retorna o status 201-CREATED', () => {
      expect(response).to.have.status(CREATED);
    });

    it('retorna uma resposta com o id da operação e o valor atualizado do ativo na carteira', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('updatedValue');
      expect(response.body).to.be.deep.equal({
        id: 2,
        updatedValue: 523.45,
        qtde: 5,
      });
    });
  });

  it('insere o ativo na carteira', () => {
    expect(CarteiraModel.create.calledWithMatch({
      codCliente: 1,
      codAtivo: 'XPBR31',
      valor: 523.45,
      qtde: 5,
    })).equals(true);
  });

  it('atualiza o valor na tabela de ativos', () => {
    expect(AtivoModel.update.calledWithMatch({
      valor: 476.55, qtde: 5,
    }, {
      where: { cod_ativo: 'XPBR31' },
    })).equals(true);
  });

  context('quando não existe a quantidade de ativos solicitada disponível para comprar', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(transaction)
        .set('authorization', usrToken);
      stub(AtivoModel, 'findOne').resolves(unavailableAssets);
    });

    after(() => { AtivoModel.findOne.restore(); });

    it('retorna o status 406-NOT ACCEPTABLE', () => {
      expect(response).to.have.status(NOT_ACCEPTABLE);
    });

    it('retorna uma resposta com o id da operação e o valor atualizado do ativo na carteira', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('messages');
      expect(response.body).to.be.deep.equal({ message: 'não há ativos suficientes para compra' });
    });
  });

  context('quando realizada com informação do cliente faltante', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noCostumerTransaction)
        .set('authorization', usrToken);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "Código do cliente não informado"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Código do cliente não informado' });
    });
  });

  context('quando realizada com informação do ativo faltante', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noAssetTransaction)
        .set('authorization', usrToken);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "Código do ativo não informado"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Código do ativo não informado' });
    });
  });

  context('quando realizada com informação da quantidade do ativo faltante', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noQtdeTransaction)
        .set('authorization', usrToken);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "Quantidade do ativo não informado"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Quantidade do ativo não informado' });
    });
  });

  context('quando realizada sem um token', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noQtdeTransaction);
    });

    it('retorna o status 401-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "A requisição deve ter um \'header\' de autorização"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Quantidade do ativo não informado' });
    });
  });

  context('quando realizada com um token inválido', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noQtdeTransaction)
        .set('authorization', invalidToken);
    });

    it('retorna o status 401-UNAUTHORIZED', () => {
      expect(response).to.have.status(UNAUTHORIZED);
    });

    it('retorna uma resposta com a mensagem "Este usuário não tem permissão para fazer essa operação"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Este usuário não tem permissão para fazer essa operação' });
    });
  });
});

describe('Verifica se a requisição da venda de um ativo', () => {
  context('quando realizada de forma correta', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/vender')
        .send(transaction)
        .set('authorization', usrToken);
      stub(CarteiraModel, 'findOne').resolves(oldPortfolio);
      stub(OperacaoModel, 'create').resolves(insertedTransaction);
      stub(CarteiraModel, 'update').resolves(updatedPortfolio);
      stub(AtivoModel, 'update').resolves();
    });

    after(() => {
      CarteiraModel.findOne.restore();
      OperacaoModel.create.restore();
      CarteiraModel.update.restore();
      AtivoModel.update.restore();
    });

    it('retorna o status 201-CREATED', () => {
      expect(response).to.have.status(CREATED);
    });

    it('retorna uma resposta com o id da operação e o valor atualizado do ativo na carteira', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('updatedValue');
      expect(response.body).to.be.deep.equal({
        id: 2,
        updatedValue: 476.55,
        qtde: 5,
      });
    });

    it('atualiza o valor na tabela de carteira', () => {
      expect(CarteiraModel.update.calledWithMatch({
        valor: 476.55, qtde: 5,
      }, {
        where: { cod_cliente: 1, cod_ativo: 'XPBR31' },
      })).equals(true);
    });

    it('atualiza o valor na tabela de ativos', () => {
      expect(AtivoModel.update.calledWithMatch({
        valor: 1526.5, qtde: 15,
      }, {
        where: { cod_ativo: 'XPBR31' },
      })).equals(true);
    });
  });

  context('quando não existe na carteira do cliente', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/vender')
        .send(transaction)
        .set('authorization', usrToken);
      stub(CarteiraModel, 'findOne').resolves(noPortfolio);
    });

    after(() => {
      CarteiraModel.findOne.restore();
    });

    it('retorna o status 206-NOT ACCEPTABLE', () => {
      expect(response).to.have.status(NOT_ACCEPTABLE);
    });

    it('retorna uma resposta com a messagem "Esse ativo não existe na carteira do cliente', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Esse ativo não exite na carteira do cliente' });
    });
  });

  context('quando não há a quantidade de ativos suficientes para realizar a venda', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/vender')
        .send(transaction)
        .set('authorization', usrToken);
      stub(CarteiraModel, 'findOne').resolves(unsuficientPortfolio);
    });

    after(() => {
      CarteiraModel.findOne.restore();
    });

    it('retorna o status 206-NOT ACCEPTABLE', () => {
      expect(response).to.have.status(NOT_ACCEPTABLE);
    });

    it('retorna uma resposta com a messagem "Não existe ativos suficientes na carteira do cliente para essa operação', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Não existe ativos suficientes na carteira do cliente para essa operação' });
    });
  });

  context('quando realizada com informação do cliente faltante', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/vender')
        .send(noCostumerTransaction)
        .set('authorization', usrToken);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "Código do cliente não informado"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Código do cliente não informado' });
    });
  });

  context('quando realizada com informação do ativo faltante', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noAssetTransaction)
        .set('authorization', usrToken);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "Código do ativo não informado"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Código do ativo não informado' });
    });
  });

  context('quando realizada com informação da quantidade do ativo faltante', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noQtdeTransaction)
        .set('authorization', usrToken);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "Quantidade do ativo não informado"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Quantidade do ativo não informado' });
    });
  });

  context('quando realizada sem um token', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noQtdeTransaction);
    });

    it('retorna o status 401-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna uma resposta com a mensagem "A requisição deve ter um \'header\' de autorização"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Quantidade do ativo não informado' });
    });
  });

  context('quando realizada com um token inválido', () => {
    before(async () => {
      response = await chai
        .request(server)
        .post('/investimento/comprar')
        .send(noQtdeTransaction)
        .set('authorization', invalidToken);
    });

    it('retorna o status 401-UNAUTHORIZED', () => {
      expect(response).to.have.status(UNAUTHORIZED);
    });

    it('retorna uma resposta com a mensagem "Este usuário não tem permissão para fazer essa operação"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Este usuário não tem permissão para fazer essa operação' });
    });
  });
});
