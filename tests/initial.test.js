const puppeteer = require('puppeteer');
const {MongoClient} = require('mongodb');
const {authentication} = require("./utils/functions.js");
const JEST_FN = require("./utils/functions.js");

const MONGODB_URI = `mongodb://localhost:${process.env.MONGODB_PORT}`;

require('dotenv').config();

let browser, page, DB, clientDb = null;

const URL = process.env.CLIENT_URL;

beforeEach(async () => {
    clientDb = new MongoClient(MONGODB_URI,
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
    await page.goto(URL);
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
    expect(current_url).toEqual(`${URL}/login`);
});


test('clicking login goes to register and register', async () => {
    let current_url = await JEST_FN.authentication(page, `${URL}/login`, {
        username: process.env.USER_1_NAME,
        password: process.env.USER_1_PASSWORD
    });
    expect(current_url).toEqual(`${URL}/books`);
});