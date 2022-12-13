import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import { buildApp } from './app';
import { config } from './config';

const app = buildApp();

describe('POST /users', function () {
    it('inserts one user in database', async function () {
        const response = await request(app)
            .post('/api/users')
            .send([{ email: 'test@example.com' }])
            .set('Accept', 'application/json')
            .set('x-api-key-id', config.LOCAL_API_KEY_ID || '')
            .set('x-api-key', config.LOCAL_API_KEY || '');

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text)['inserted']).toBe(1);
    });
});
