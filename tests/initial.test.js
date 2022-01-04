const puppeteer = require('puppeteer');
const {MongoClient} = require('mongodb');

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
    await page.goto(`${URL}/login`);

    const username = process.env.USER_1_NAME;
    const password = process.env.USER_1_PASSWORD;

    // await Promise.all([
    //     page.type('#email_input input', username),
    //     page.type('#password_input input', password)
    // ]);

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