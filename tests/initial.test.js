const puppeteer = require('puppeteer');
const {MongoClient} = require('mongodb');

const MONGODB_URI = `mongodb://localhost:${process.env.MONGODB_PORT}`;

require('dotenv').config();

let browser, page, DB, clientDb = null;

const URL = process.env.CLIENT_URL;

beforeEach(async () => {
    // TODO make this code more promise like for optimization purposes
    // clientDb = new MongoClient(MONGODB_URI,
    //     {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     }
    // );
    // DB = await clientDb.connect();

    browser = await puppeteer.launch({
        headless: true
    });
    page = await browser.newPage();
    await page.goto(URL);
});

afterEach(async () => {
    await browser.close();
    // await clientDb.close();
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