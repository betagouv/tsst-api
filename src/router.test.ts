import express, { Express } from 'express';
import { describe, it, expect, test } from '@jest/globals';
import request from 'supertest';
import { buildApp } from './app';

const app = buildApp();

describe('POST /users', function () {
    it('inserts one user in database', async function () {
        const response = await request(app)
            .post('/api/users')
            .send([{ email: 'test@example.com' }])
            .set('Accept', 'application/json');
        console.log(response.statusCode);
        console.log(response.text);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text)['inserted']).toBe(1);
    });
});
