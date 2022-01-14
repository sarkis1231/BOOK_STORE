const CustomPage = require("./utils/page");
const JEST_FN = require("./utils/functions");
const JEST_CONSTANTS = require("./utils/constants");

let page = null;

beforeEach(async () => {
    page = await CustomPage.build();
});

afterEach(async () => {
    await page.close();
});

afterAll(async () => {
    await JEST_FN.cleanUp();
});


describe('Non authenticated users Permission', () => {
    beforeEach(async () => {
        await page.redirectTo(`users`);
    });

    test('User cannot get a fetch users', async () => {

        const result = await page.evaluate((url) => {
            return fetch(`${url}/users/all`, {
                method: 'GET'
            }).then(res => res.statusText);
        }, JEST_CONSTANTS.BE_BASE_URL);

        expect(result).toEqual(JEST_CONSTANTS.UNAUTHORISED);

    });
});