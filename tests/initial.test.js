const JEST_CONSTANTS = require("./utils/constants.js");
const CustomPage = require("./utils/page");

let page = null;

beforeEach(async () => {

    page = await CustomPage.build();

    await page.goto(JEST_CONSTANTS.CLIENT_URL);
});

afterEach(async () => {
    await page.close();
});

test('Adds to numbers', () => {
    const sum = 1 + 2;
    expect(sum).toEqual(3);
});

test('We can launch a browser', async () => {
    const text = await page.getContentOf('h1');
    expect(text).toEqual('Welcome to our Book-Library');
});

test('clicking login goes to register', async () => {
    await page.click('#login_btn');
    const current_url = await page.url();
    expect(current_url).toEqual(`${JEST_CONSTANTS.CLIENT_URL}/login`);
});

test('Login and Logout functionality', async () => {
    let current_url = await page.login();
    expect(await page.url()).toEqual(current_url);

    current_url = await page.logout();
    expect(await page.url()).toEqual(`${current_url}/`);
});