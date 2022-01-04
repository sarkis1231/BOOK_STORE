const puppeteer = require('puppeteer');

const MONGODB_URI = `mongodb://localhost:${process.env.MONGODB_PORT}`;

require('dotenv').config();

let browser, page = null;

const URL = process.env.CLIENT_URL;

beforeEach(async () => {

    browser = await puppeteer.launch({
        headless: true
    })

    page = await browser.newPage();
    await page.goto(URL);

    // TODO write the authentication here
});

afterEach(async () => {
    await browser.close();
});



test('clicking login goes to register and register', async () => {
    await page.goto(`${URL}/login`);

    const username = process.env.USER_1_NAME;
    const password = process.env.USER_1_PASSWORD;

    await Promise.all([
        page.waitForSelector('#email_input input'),
        page.waitForSelector('#password_input input')
    ]);

    await page.click('#email_input input');
    await page.type('#email_input input', username);

    await page.click("#password_input input");
    await page.type("#password_input input", password);


    await Promise.all([
        page.click('#submit_login_btn'), // Clicking the link will indirectly cause a navigation
        page.waitForNavigation(), // The promise resolves after navigation has finished
    ]);

    let current_url = await page.url();
    expect(current_url).toEqual(`${URL}/books`);
});