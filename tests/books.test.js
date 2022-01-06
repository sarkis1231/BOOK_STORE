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

test('', async () => {

});