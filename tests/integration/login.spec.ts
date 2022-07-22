import chai, { expect } from 'chai';
import chariHttp from 'chai-http';
import { stub } from 'sinon';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import server from '../../src/app';
import ClienteModel from '../../src';
import {
  usrToken,
  admToken,
  notFoundUser,
  regularUser,
  admUser,
  usrLogin,
  admLogin,
  noInfoLogin,
  noCodClienteLogin,
  noPassworLogin,
  wrongCodLogin,
  wrongPasswordLogin,
  shortPasswordLogin,
  notExistentLogin,
  crackerLogin,
} from '../mocks/login';

const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  LENGTH_REQUIRED,
  UNPROCESSABLE_ENTITY,

} = StatusCodes;

chai.use(chariHttp);

let response;

describe('Verifica se a realização de login pelo usuário', () => {
  context('quando realizada utilizando um usuário comum', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(usrLogin);
      stub(jwt, 'sign').returns(usrToken);
      stub(ClienteModel, 'findOne').resolves(regularUser);
    });

    it('retorna o status 200-OK', () => {
      expect(response).to.have.status(OK);
    });

    it('retorna uma resposta com um token válido', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('token');
      expect(response.body).to.be.deep.equal({ token: usrToken });
    });

    after(() => {
      jwt.sign.restore();
    });
  });

  context('quando realizada utilizando um usuário administrador', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(admLogin);
      stub(jwt, 'sign').returns(admToken);
      stub(ClienteModel, 'findOne').resolves(admUser);
    });

    it('retorna o status 200-OK', () => {
      expect(response).to.have.status(OK);
    });

    it('retorna uma resposta com um token válido', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('token');
      expect(response.body).to.be.deep.equal({ token: admToken });
    });

    after(() => {
      jwt.sign.restore();
    });
  });

  context('quando realizada sem a informação do cliente', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(noInfoLogin);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna a mensagem "Cliente não informado"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Cliente não informado' });
    });
  });

  context('quando realizada sem um código de cliente', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(noCodClienteLogin);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna a mensagem "Cliente não informado"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Cliente não informado' });
    });
  });

  context('quando realizada sem a senha', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(noPassworLogin);
    });

    it('retorna o status 400-BAD REQUEST', () => {
      expect(response).to.have.status(BAD_REQUEST);
    });

    it('retorna a mensagem "Senha não informada"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Senha não informada' });
    });
  });

  context('quando realizada com um código de cliente inválido', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(wrongCodLogin);
    });

    it('retorna o status 422-UNPROCESSABLE ENTITY', () => {
      expect(response).to.have.status(UNPROCESSABLE_ENTITY);
    });

    it('retorna a mensagem "Formato de cliente inválido."', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Formato de cliente inválido.' });
    });
  });

  context('quando realizada com uma senha inválida', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(wrongPasswordLogin);
    });

    it('retorna o status 422-UNPROCESSABLE ENTITY', () => {
      expect(response).to.have.status(UNPROCESSABLE_ENTITY);
    });

    it('retorna a mensagem "Formato de senha inválido."', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Formato de senha inválido.' });
    });
  });

  context('quando realizada com uma senha menor que 8 caracteres', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(shortPasswordLogin);
    });

    it('retorna o status 411-LENGTH REQUIRED', () => {
      expect(response).to.have.status(LENGTH_REQUIRED);
    });

    it('retorna a mensagem "A senha deve ter mais de 8 caracteres"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'A senha deve ter mais de 8 caracteres' });
    });
  });

  context('quando realizada com um um código de cliente inexistente', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(notExistentLogin);
      stub(ClienteModel, 'findOne').resolves(notFoundUser);
    });

    it('retorna o status 401-UNAUTHORIZED', () => {
      expect(response).to.have.status(UNAUTHORIZED);
    });

    it('retorna a mensagem "Usuário ou senha não conferem"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Usuário ou senha não conferem' });
    });
  });

  context('quando a realizada com uma senha incorreta', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(crackerLogin);
      stub(ClienteModel, 'findOne').resolves(notFoundUser);
    });

    it('retorna o status 401-UNAUTHORIZED', () => {
      expect(response).to.have.status(UNAUTHORIZED);
    });

    it('retorna a mensagem "Usuário ou senha não conferem"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body).to.be.deep.equal({ message: 'Senha incorreta' });
    });
  });
});
