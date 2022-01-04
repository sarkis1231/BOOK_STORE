const puppeteer = require('puppeteer');
const {MongoClient} = require('mongodb');
const JEST_FN = require("./utils/functions.js");
const JEST_CONSTANTS = require("./utils/constants.js");

let browser, page, DB, clientDb = null;

beforeEach(async () => {
    clientDb = new MongoClient(JEST_CONSTANTS.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    const promiseRes = await Promise.all([
        clientDb.connect(),
        puppeteer.launch({
            headless: true
        })
    ]);

    DB = promiseRes[0];

    browser = promiseRes[1];

    page = await browser.newPage();
    await page.goto(JEST_CONSTANTS.CLIENT_URL);
});

afterEach(async () => {
    await browser.close();
    await clientDb.close();
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