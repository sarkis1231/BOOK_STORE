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
        await page.goto(`${JEST_CONSTANTS.CLIENT_URL}/users`);
    });

    test('User cannot get a fetch users', async () => {

        const result = await page.evaluate((url) => {
            return fetch(`${url}/users`, {
                method: 'GET'
            }).then(res => res.statusText);
        }, JEST_CONSTANTS.BE_BASE_URL);

        expect(result).toEqual('Unauthorized');

    });
});