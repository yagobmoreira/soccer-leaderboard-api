import * as sinon from 'sinon';
import * as chai from 'chai';
import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import SequelizeUser from '../database/models/SequelizeUser';
import { existingUser, validLoginBody } from './mocks/login.mocks';
import Validations from '../middlewares/Validations';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';


chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Login tests', function () {
  it('Deve retornar um token caso o login seja feito corretamente', async function () {
    const mockFindOneReturn = SequelizeUser.build(existingUser);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compare').resolves(true);
    // sinon.stub(JWT, 'sign').resolves('any-token');
    sinon.stub(Validations, 'validateLogin').returns(undefined);

    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send(validLoginBody)

    expect(status).to.be.equal(200);
    expect(body.token).to.be.equal('any-token');
  });
})