const puppeteer = require('puppeteer');
let browser, page = null;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: true
    });
    page = await browser.newPage();
    // TODO take this from ENV
    await page.goto('http://localhost:3000');
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