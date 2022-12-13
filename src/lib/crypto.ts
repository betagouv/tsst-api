import { randomBytes } from 'crypto';
import { sha256 } from 'js-sha256';

export { generateRandomKey, hasher };

function generateRandomKey() {
    return randomBytes(32).toString('hex');
}

function hash(value: string) {
    return sha256(value);
}

function verify(value: string, hashed_value: string) {
    return hash(value) === hashed_value;
}

const hasher = {
    hash,
    verify,
};
