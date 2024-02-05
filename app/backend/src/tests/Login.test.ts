import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import SequelizeUser from '../database/models/SequelizeUser';
import * as loginMock from './mocks/login.mocks';
import Validations from '../middlewares/Validations';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';


chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Login tests', function () {
  it('Deve retornar um token caso o login seja feito corretamente', async function () {
    const mockFindOneReturn = SequelizeUser.build(loginMock.existingUser);
    sinon.stub(Validations, 'validateLogin').returns(undefined);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compare').resolves(true);

    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send(loginMock.validLoginBody)

    expect(status).to.be.equal(200);
    expect(body).to.have.key('token');
  });

  it('Ao não receber um email, retorne um erro', async function () {

    const {status, body} = await chai.request(app).post("/login").send(loginMock.noEmailLoginBody)

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({message: 'All fields must be filled'})
  });

  it('Ao não receber uma senha, retorne um erro', async function () {

    const {status, body} = await chai.request(app).post("/login").send(loginMock.noPasswordLoginBody)

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({message: 'All fields must be filled'})
  });

  it('Ao receber um email não cadastrado, retorne um erro', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const {status, body} = await chai.request(app).post("/login").send(loginMock.invalidLoginBody)

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'})
  });

  it('Ao receber um email cadastrado, mas uma senha inválida, retorna um erro' , async function () {
    const mockFindOneReturn = SequelizeUser.build(loginMock.existingUser);
    sinon.stub(Validations, 'validateLogin').returns(undefined);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compare').resolves(false);

    const {status, body} = await chai.request(app).post("/login").send(loginMock.invalidPasswordLoginBody)

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'})
  });

  it('Ao receber um email no formato incorreto, retorna um erro', async function () {
    const {status, body} = await chai.request(app).post("/login").send({
      email: 'admin.com',
      password: 'secret_admin'
    })

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'});
  });

  it('Ao receber um email válido e uma senha com menos que 6 caracteres, retorna um erro', async function () {
    const {status, body} = await chai.request(app).post("/login").send({
      email: 'admin@admin.com',
      password: 'secre'
    })

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'});
  })


  afterEach(sinon.restore);

})