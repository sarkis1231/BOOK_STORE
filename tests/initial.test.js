const puppeteer = require('puppeteer');
require('dotenv').config();

let browser, page = null;

const URL = process.env.CLIENT_URL;


beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: true
    });
    page = await browser.newPage();
    await page.goto(URL);
});

afterEach(async () => {
    await browser.close();
});

test('Adds to numbers', () => {
    const sum = 1 + 2;
    expect(sum).toEqual(3)
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