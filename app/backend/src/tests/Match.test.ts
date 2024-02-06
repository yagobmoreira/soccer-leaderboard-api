import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as matchMock from './mocks/match.mocks'
import * as loginMock from './mocks/login.mocks'
import SequelizeMatch from '../database/models/SequelizeMatch';
import MatchController from '../controllers/MatchController';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Match tests', function () {
  it('Deve retornar todas as partidas com requisição GET para /matches', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchMock.validMatches as any);

    const {status, body} = await chai
      .request(app)
      .get("/matches")

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(matchMock.validMatches)
  });

  it('Deve ser possível retornar apenas as partidas em andamento', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchMock.matchesInProgess as any);

    const {status, body} = await chai
    .request(app)
    .get("/matches?inProgress=true")

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(matchMock.matchesInProgess)
  })

  it('Deve ser possível retornar apenas as partidas finalizadas', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchMock.finishedMatches as any);

    const {status, body} = await chai
    .request(app)
    .get("/matches?inProgress=false")

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(matchMock.finishedMatches)
  })
  
  it('Deve ser possível criar uma partida com requisição POST para /matches', async function () {
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});
    const newTeam = SequelizeMatch.build(matchMock.validNewTeamFromDB);
    sinon.stub(SequelizeMatch, 'create').resolves(newTeam);

    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .set({'Authorization': `Bearer ${loginMock.validToken}`})
    .send(matchMock.validNewMatch)

    expect(status).to.be.equal(201)
    expect(body).to.be.deep.equal(matchMock.validNewTeamFromDB)
  })

  it('Não retornar um erro caso não envie um token', async function () {
    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .send(matchMock.validNewMatch)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token not found' })
  })

  it('Deve retornar um erro caso seja enviado um token inválido', async function () {

    sinon.stub(jwt, 'verify').throws(new Error('Token must be a valid token'))
    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .set({'Authorization': `Bearer any-token`})
    .send(matchMock.validNewMatch)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' })
  });

  it('Deve retornar um erro caso seja enviado um token que não seja Bearer', async function () {

    sinon.stub(jwt, 'verify').throws(new Error('Token must be a valid token'))
    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .set({'Authorization': `Bea any-token`})
    .send(matchMock.validNewMatch)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' })
  });

  it('Não deve ser possível criar uma partida com um time inexistente', async function () { 
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});
    sinon.stub(MatchController, 'verifyTeams').resolves(false)

    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .set({'Authorization': `Bearer ${loginMock.validToken}`})
    .send(matchMock.invalidNewMatch)

    expect(status).to.be.equal(404)
    expect(body).to.be.deep.equal({ message: 'There is no team with such id!' })
  })

  it('Não deve ser possível criar uma partida com dois times iguais', async function () { 
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});
    sinon.stub(MatchController, 'verifyTeams').resolves(true)

    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .set({'Authorization': `Bearer ${loginMock.validToken}`})
    .send(matchMock.invalidNewMatchSameTeam)

    expect(status).to.be.equal(422)
    expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  })

  it('Deve ser possível atualizar o placar de uma partida', async function () {
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});

    sinon.stub(SequelizeMatch, 'findByPk').onFirstCall().resolves(SequelizeMatch.build({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
    })).onSecondCall().resolves(SequelizeMatch.build({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 3,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
    }));
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const { status, body } = await chai
    .request(app)
    .patch("/matches/1")
    .set({'Authorization': `Bearer ${loginMock.validToken}`})
    .send(matchMock.validUpdateMatchScore)

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal({ message: 'Score updated' })
  })

  it('Não deve atualizar uma partida caso seja passado um id inexistente', async function () {
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});

    const { status, body } = await chai
    .request(app)
    .patch("/matches/99999999")
    .set({'Authorization': `Bearer ${loginMock.validToken}`})
    .send(matchMock.validUpdateMatchScore)

    expect(status).to.be.equal(404)
    expect(body).to.be.deep.equal({ message: 'Match 99999999 not found' })
  })

  it('Deve ser possível finalizar uma partida', async function () {
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});

    const { status, body } = await chai
    .request(app)
    .patch("/matches/1/finish")
    .set({'Authorization': `Bearer ${loginMock.validToken}`})

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal({ message: 'Finished' })
  });

  it('Não deve ser possível finalizar uma partida que não exista', async function () {
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});
    sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

    const { status, body } = await chai
    .request(app)
    .patch("/matches/99999999/finish")
    .set({'Authorization': `Bearer ${loginMock.validToken}`})

    expect(status).to.be.equal(404)
    expect(body).to.be.deep.equal({ message: 'Match 99999999 not found' })
  })

  afterEach(sinon.restore);
}) 