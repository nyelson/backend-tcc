const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Team = require('../../models/Team');
const TeamRepository = require('../../repository/TeamRepository');

describe('Team Endpoints', () => {
   beforeEach(async () => {
      await Team.deleteMany();
   });

   describe('POST', () => {
      it('should create return an error when no name is given', async done => {
         const res = await request(app)
            .post('/times')
            .send({});
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Campos obrigatórios não preenchidos');
         done();
      });

      it('should create a new team and stores it in MongoDB', async done => {
         const res = await request(app)
            .post('/times')
            .send({
               nome: 'test is cool',
            });
         expect(res.statusCode).toEqual(201);
         expect(res.body).toHaveProperty('nome');
         expect(res.body.nome).toEqual('test is cool');

         const team = await TeamRepository.findTeamByName('test is cool');

         expect(team).not.toBeNull();
         expect(team.nome).toEqual('test is cool');

         done();
      });
   });

   describe('GET /', () => {
      it('should return a list of registered teams - No teams', async done => {
         const res = await request(app)
            .get('/times')
            .send();
         expect(res.statusCode).toEqual(200);
         expect(res.body).toHaveProperty('times');
         expect(res.body.times).toEqual([]);

         done();
      });

      it('should return a list of registered teams - Has teams', async done => {
         await TeamRepository.addTeam('abc');
         await TeamRepository.addTeam('123');

         const res = await request(app)
            .get('/times')
            .send();
         expect(res.statusCode).toEqual(200);
         expect(res.body).toHaveProperty('times');
         expect(res.body.times.map(time => time.nome)).toEqual(['abc', '123']);

         done();
      });
   });

   describe('GET /:id', () => {
      it('should return not found when no team is available', async done => {
         const res = await request(app)
            .get(`/times/${mongoose.Types.ObjectId()}`)
            .send();
         expect(res.statusCode).toEqual(404);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Time não existe');

         done();
      });

      it('should return bad request when search with invalid ID', async done => {
         const res = await request(app)
            .get(`/times/1`)
            .send();
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Id inválido');

         done();
      });

      it('should return the searched team', async done => {
         const { _id } = await TeamRepository.addTeam('abc');

         const res = await request(app)
            .get(`/times/${_id}`)
            .send();
         expect(res.statusCode).toEqual(200);
         expect(res.body.nome).toEqual('abc');

         done();
      });
   });

   describe('GET /name/:name', () => {
      it('should return not found when no team is available', async done => {
         const res = await request(app)
            .get(`/times/name/abc`)
            .send();
         expect(res.statusCode).toEqual(404);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Time não existe');

         done();
      });

      it('should return bad request when search with no name', async done => {
         const res = await request(app)
            .get(`/times/name/`)
            .send();
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Id inválido');

         done();
      });

      it('should return the searched team', async done => {
         await TeamRepository.addTeam('abc');

         const res = await request(app)
            .get(`/times/name/abc`)
            .send();
         expect(res.statusCode).toEqual(200);
         expect(res.body.nome).toEqual('abc');

         done();
      });
   });

   describe('DELETE /:id', () => {
      it('should return not found when no team is available', async done => {
         const res = await request(app)
            .delete(`/times/${mongoose.Types.ObjectId()}`)
            .send();
         expect(res.statusCode).toEqual(404);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Time não existe');

         done();
      });

      it('should return bad request when search with invalid ID', async done => {
         const res = await request(app)
            .delete(`/times/1`)
            .send();
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Id inválido');

         done();
      });

      it('should return the searched team', async done => {
         const { _id } = await TeamRepository.addTeam('abc');

         const res = await request(app)
            .delete(`/times/${_id}`)
            .send();

         expect(res.statusCode).toEqual(204);

         done();
      });
   });
});
