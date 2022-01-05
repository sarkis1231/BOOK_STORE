const JEST_CONSTANTS = require("./utils/constants.js");
const CustomPage = require("./utils/page");

let page = null;

beforeEach(async () => {
    page = await CustomPage.build();
    await page.login();
});

afterEach(async () => {
    await page.close();
});

test('Am i Logged in', async () => {
    const current_url = await page.url();
    expect(current_url).toEqual(`${JEST_CONSTANTS.CLIENT_URL}/books`);
});
