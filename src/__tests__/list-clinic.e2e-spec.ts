import supertest from 'supertest';
import Express from '@/externals/express';
import { Clinic } from '@/types/entities';

const request = supertest(Express);

describe('e2e listClinc', () => {
  it('should give 200 status code ', async () => {
    await request.get('/api/clinics').expect('Content-Type', /json/).expect(200);
  });

  it('should return clinics filtered by name', async () => {
    const filter = { name: 'good' };
    const regex = new RegExp(`\\${filter.name}\\.*`, 'i');
    const { body }: { body: Clinic[] } = await request
      .get('/api/clinics')
      .query(`name=${filter.name}`)
      .expect('Content-Type', /json/)
      .expect(200);

    body.every((clinic) => {
      expect(clinic.name).toMatch(regex);
    });

    if (body.length) {
      expect(body[0]).toHaveProperty('name');
      expect(body[0]).toHaveProperty('stateName');
      expect(body[0]).toHaveProperty('availability');
    }
  });
});
