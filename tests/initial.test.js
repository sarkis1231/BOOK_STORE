const puppeteer = require('puppeteer');
const JEST_FN = require("./utils/functions.js");
const JEST_CONSTANTS = require("./utils/constants.js");

let browser, page = null;

beforeEach(async () => {

    browser = await puppeteer.launch({
        headless: true
    })

    page = await browser.newPage();
    await page.goto(JEST_CONSTANTS.CLIENT_URL);
});

afterEach(async () => {
    await browser.close();
    JEST_FN.cleanUps();
});

test('Adds to numbers', () => {
    const sum = 1 + 2;
    expect(sum).toEqual(3);
});

test('We can launch a browser', async () => {
    const text = await page.$eval('h1', el => el.innerHTML);
    expect(text).toEqual('Welcome to our Book-Library');
});

test('clicking login goes to register', async () => {
    await page.click('#btn_login');
    const current_url = await page.url();
    expect(current_url).toEqual(`${JEST_CONSTANTS.CLIENT_URL}/login`);
});

test('clicking login goes to register and register', async () => {
    let current_url = await JEST_FN.authentication(page, `${JEST_CONSTANTS.CLIENT_URL}/login`, {
        username: JEST_CONSTANTS.USER_1_NAME,
        password: JEST_CONSTANTS.USER_1_PASSWORD
    });
    expect(current_url).toEqual(`${JEST_CONSTANTS.CLIENT_URL}/books`);
});