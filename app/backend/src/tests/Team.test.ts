import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams, team } from './mocks/team.mocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Teams test', function () {
  it("Deve retornar todos os times corretamente", async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const {status, body} = await chai
      .request(app)
      .get("/teams");

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  });

  it("Deve retornar um time pelo id", async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);

    const {status, body} = await chai
    .request(app)
    .get("/teams/1");

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(team);
  });

  it("Deve retornar 'not found' se o time não existir", async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    
    const {status, body} = await chai
    .request(app)
    .get("/teams/9999");

    expect(status).to.be.equal(404);
    expect(body.message).to.be.equal('Team 9999 not found')
  })

  afterEach(sinon.restore);
})