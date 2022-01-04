const puppeteer = require('puppeteer');
const JEST_FN = require("./utils/functions.js");
const JEST_CONSTANTS = require("./utils/constants.js");

let browser, page = null;

beforeEach(async () => {

    browser = await puppeteer.launch({
        headless: true
    })

    page = await browser.newPage();

    await JEST_FN.authentication(page, `${JEST_CONSTANTS.CLIENT_URL}/login`, {
        username: JEST_CONSTANTS.USER_1_NAME,
        password: JEST_CONSTANTS.USER_1_PASSWORD
    });
});

afterEach(async () => {
    await browser.close();
    JEST_FN.cleanUps();
});

test('Am i Logged in', async () => {
    const current_url = await page.url();
    expect(current_url).toEqual(`${JEST_CONSTANTS.CLIENT_URL}/books`);
});
