const puppeteer = require('puppeteer');
const JEST_FN = require("./utils/functions.js");

require('dotenv').config();

let browser, page = null;

const URL = process.env.CLIENT_URL;

beforeEach(async () => {

    browser = await puppeteer.launch({
        headless: true
    })

    page = await browser.newPage();

    await JEST_FN.authentication(page, `${URL}/login`, {
        username: process.env.USER_1_NAME,
        password: process.env.USER_1_PASSWORD
    });
});

afterEach(async () => {
    await browser.close();
});

test('Am i Logged in', async () => {
    const current_url = await page.url();
    expect(current_url).toEqual(`${URL}/books`);
});
