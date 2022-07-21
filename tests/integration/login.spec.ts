import chai, { expect } from 'chai';
import chariHttp from 'chai-http';
import { stub } from 'sinon';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import server from '../../src/app';
import { usrToken, admToken } from '../mocks/jwt';
import { login } from '../../src/interfaces';

const { OK } = StatusCodes;

chai.use(chariHttp);

describe('Verifica se a realização de login pelo usuário', () => {
  const usrLogin: login = {
    codCliente: 1,
    password: 'xpinc',
  };
  const admLogin: login = {
    codCliente: 2,
    password: 'menteaberta',
  };

  let response;

  context('quando realizada utilizando um usuário comum', () => {
    before(async () => {
      response = await chai.request(server).post('/login').send(usrLogin);
      stub(jwt, 'sign').returns(usrToken);
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
});
