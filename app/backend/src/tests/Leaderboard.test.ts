import * as sinon from 'sinon';
import * as chai from 'chai';
import SequelizeMatch from '../database/models/SequelizeMatch';
import * as matchMock from './mocks/match.mocks';
import * as leaderBoardMock from './mocks/leaderboard.mocks';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Leaderboard Tests', function () {
  it('Deve retornar o leaderboard para partidas jogadas em casa', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchMock.validMatches as any);

    const {status, body} = await chai.request(app).get('/leaderboard/home');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderBoardMock.homeTeamLeaderBoard);
  });

  it('Deve retornar o leaderboard para partidas jogadas fora', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchMock.validMatches as any);

    const {status, body} = await chai.request(app).get('/leaderboard/away');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderBoardMock.awayTeamLeaderBoard);
  })

  it('Deve retornar o leaderboard completo', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchMock.validMatches as any);

    const {status, body} = await chai.request(app).get('/leaderboard');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderBoardMock.leaderBoard);
  })

  afterEach(function () {
    sinon.restore();
  })
})