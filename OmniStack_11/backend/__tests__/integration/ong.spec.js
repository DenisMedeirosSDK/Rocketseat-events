const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {

        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Denis Medeiros",
                email: "opticom.motorola@hotmail.com",
                whatsapp: "15996102148",
                city: "sorocaba",
                uf: "SP"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to create a new incidents', async () => {
        const response = await request(app)
            .post('/incidents')
            .set('Authorization', '7d62cb5c')
            .send({
                title: 'Caso 1',
                description: 'Descrição do caso 1',
                value: '500',
            });

        expect(response.body).toHaveProperty('id');
    })
})