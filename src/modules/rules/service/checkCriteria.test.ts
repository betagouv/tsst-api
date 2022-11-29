import { describe, expect, test } from '@jest/globals';
import { userType } from './types';
import { checkCriteria } from './checkCriteria';
import { rule } from './rule';

describe('checkCriteria', () => {
    const user1: userType = {
        id: 1,
        is_unemployed: true,
        age: 27,
    };

    const user2: userType = {
        id: 2,
        is_unemployed: false,
        age: 23,
    };

    const user3: userType = {
        id: 3,
        is_unemployed: false,
        age: 32,
    };

    test('should return true for user1', () => {
        expect(checkCriteria(user1)).toBe(true);
    });

    test('should return true for user2', () => {
        expect(checkCriteria(user2)).toBe(true);
    });

    test('should return true for user3', () => {
        expect(checkCriteria(user3)).toBe(false);
    });
});
