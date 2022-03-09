/* eslint-disable no-undef */
import { calculate } from '../src/client/utils/calculate.mjs';

describe('addition', function() {
    it('correctly adds', function() {
        const answer = calculate("3 + 4 - 6");
        expect(answer).toEqual(1);
    })
})

describe('subtraction', function() {
    it('correctly subtracts', function() {
        const answer = calculate("15 - 4");
        expect(answer).toEqual(11);
    })
})

describe('division', function() {
    it('correctly divides', function() {
        const answer = calculate("6 / 3 + 10");
        expect(answer).toEqual(12);
    })
})

describe('power', function() {
    it('correctly calculates the power', function() {
        const answer = calculate("10 ^ 2");
        expect(answer).toEqual(100);
    })
})