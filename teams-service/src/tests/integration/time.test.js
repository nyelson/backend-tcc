const request = require('supertest');
const app = require('../../app');

describe('Team Endpoints', () => {
   it('should create return an error when no name is given', async done => {
      const res = await request(app)
         .post('/times')
         .send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('erro');
      expect(res.body.erro).toEqual('Campos obrigatórios não preenchidos');
      done();
   });

   it('should create a new team', async done => {
      const res = await request(app)
         .post('/times')
         .send({
            nome: 'test is cool',
         });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('nome');
      expect(res.body.nome).toEqual('test is cool');
      done();
   });
});
