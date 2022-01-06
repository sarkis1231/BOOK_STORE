const JEST_CONSTANTS = require("./utils/constants.js");
const CustomPage = require("./utils/page");
const JEST_FN = require("./utils/functions");

let page = null;

beforeEach(async () => {
    page = await CustomPage.build();
    await page.login();
});

afterEach(async () => {
    await page.close();
});

afterAll(async () => {
    await JEST_FN.cleanUp();
});

test('Am i Logged in', async () => {
    const current_url = await page.url();
    expect(current_url).toEqual(`${JEST_CONSTANTS.CLIENT_URL}/books`);
});
