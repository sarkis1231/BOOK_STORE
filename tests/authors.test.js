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

describe('Authenticated After Login able to see  ADD book functionality is present and model is opened', () => {
    beforeEach(async () => {
        await page.login();
        await page.goto(`${JEST_CONSTANTS.CLIENT_URL}/author`);
        await page.waitForSelector('#add_author_btn', {visible: true});
    });

    test('add Author Form check validation', async () => {
        await page.clickSubmitBtn('#add_author_btn');

        const content = await page.getContentOf("#add_author_input_error");
        expect(!!content).toBeTruthy();
    });
});

describe('Non authenticated users Permission', () => {
    beforeEach(async () => {
        await page.goto(`${JEST_CONSTANTS.CLIENT_URL}/users`);
    });

    test('User cannot get a fetch authors', async () => {
        const result = await page.evaluate((url) => {
            return fetch(`${url}/authors`, {
                method: 'GET'
            }).then(res => res.statusText);
        }, JEST_CONSTANTS.BE_BASE_URL);

        expect(result).toEqual('Unauthorized');
    });
});