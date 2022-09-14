import swapiGetter from "../services/swapiGetter";

describe('Star Wars API Get Function', () => {
    afterEach(()=> {
        jest.clearAllMocks();
    });
    test('Should return a Person name', async () => {
        const result = await swapiGetter("people", 1);
        console.log(result);
        expect(result).toBe("Luke Skywalker");
    });

    test('Should return a Person name again', async () => {
        const result = await swapiGetter("people", 2);
        console.log(result);
        expect(result).toBe("Luke Skywalker");
    });
})