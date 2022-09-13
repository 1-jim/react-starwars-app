import { timesTwo } from '../services/functions'

test("multiply by two", () => {
    expect(timesTwo(5)).toBe(10);
    expect(timesTwo(2)).toBe(4);
    expect(timesTwo(25)).toBeLessThan(100);
})