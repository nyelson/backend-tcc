const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/Usuario');
const UserRepository = require('../../../repository/UsuarioRepository');

describe('User Endpoints', () => {
   beforeEach(async () => {
      await User.deleteMany();
   });

   describe('POST /', () => {
      it('should return an error when no name is given', async done => {
         const res = await request(app)
            .post('/usuarios')
            .send({ email: 'abc@abc.com', password: '123' });
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Campos obrigatórios não preenchidos');
         done();
      });

      it('should return an error when no email is given', async done => {
         const res = await request(app)
            .post('/usuarios')
            .send({ nome: 'abc', password: '123' });
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Campos obrigatórios não preenchidos');
         done();
      });

      it('should return an error when no password is given', async done => {
         const res = await request(app)
            .post('/usuarios')
            .send({ email: 'abc@abc.com', nome: 'abc' });
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Campos obrigatórios não preenchidos');
         done();
      });

      it('should create a new user and stores it in MongoDB', async done => {
         const res = await request(app)
            .post('/usuarios')
            .send({
               nome: 'test',
               email: 'test@test.com',
               password: '123',
            });
         expect(res.statusCode).toEqual(201);
         expect(res.body).toHaveProperty('nome');
         expect(res.body).not.toHaveProperty('password');
         expect(res.body.nome).toEqual('test');
         expect(res.body.email).toEqual('test@test.com');

         const user = await UserRepository.findUserByEmail('test@test.com');

         expect(user).not.toBeNull();
         expect(user.email).toEqual('test@test.com');

         done();
      });
   });

   describe('POST /singin', () => {
      it('should return an error when no email is given', async done => {
         const res = await request(app)
            .post('/usuarios/singin')
            .send({ password: '123' });
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Campos obrigatórios não preenchidos');
         done();
      });

      it('should return an error when no password is given', async done => {
         const res = await request(app)
            .post('/usuarios/singin')
            .send({ email: 'abc@abc.com' });
         expect(res.statusCode).toEqual(400);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Campos obrigatórios não preenchidos');
         done();
      });

      it('should not authenticate the user when wrong email is given', async done => {
         await UserRepository.addUser('test', 'abc@abc.com', '123');

         const res = await request(app)
            .post('/usuarios/singin')
            .send({ email: 'test@test.com', password: '123' });
         expect(res.statusCode).toEqual(404);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Credenciais incorretas');
         done();
      });

      it('should not authenticate the user when wrong password is given', async done => {
         await UserRepository.addUser('test', 'abc@abc.com', '123');

         const res = await request(app)
            .post('/usuarios/singin')
            .send({ email: 'test@test.com', password: '321' });
         expect(res.statusCode).toEqual(404);
         expect(res.body).toHaveProperty('erro');
         expect(res.body.erro).toEqual('Credenciais incorretas');
         done();
      });

      it('should authenticate the user', async done => {
         await UserRepository.addUser('test', 'abc@abc.com', '123');

         const res = await request(app)
            .post('/usuarios/singin')
            .send({ email: 'abc@abc.com', password: '123' });
         expect(res.statusCode).toEqual(200);
         expect(res.body).toHaveProperty('token');
         done();
      });
   });
});
