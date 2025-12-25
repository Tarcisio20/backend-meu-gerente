import { hash, compare } from "bcrypt-ts";

// custo (quanto maior, mais lento/seguro). 10-12 é comum.
const SALT_ROUNDS = 12;

export async function hashPassword(plain: string) {
    return hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, passwordHash: string) {
    return compare(plain, passwordHash);
}