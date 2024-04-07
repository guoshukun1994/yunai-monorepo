import { describe, it, expect } from 'vitest';

const asyncSum = (a, b) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000)
    })
}

describe('TDD basic', () => {
    it('sync work', () => {
        expect(Math.sqrt(4)).toBe(2);
        expect(Math.sqrt(16)).not.toBe(3);
    });

    it('async work', async () => {
        const sum = await asyncSum(1, 2);
        expect(sum).toBe(3);
    })
})