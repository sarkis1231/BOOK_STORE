const CustomPage = require("./utils/page");
const JEST_FN = require("./utils/functions");
const JEST_CONSTANTS = require("./utils/constants");

let page = null;

beforeEach(async () => {
    page = await CustomPage.build();
    await page.login();
});

afterEach(async () => {
    await page.close();
});

afterAll(async () => {
    await JEST_FN.cleanUp();
});


describe('After Login able go to Genre check the input functionality', () => {
    beforeEach(async () => {
        await page.goto(`${JEST_CONSTANTS.CLIENT_URL}/genre`);
        await page.waitForSelector('#genre_add_form', {visible: true});
    });

    test('add Book Form check validation', async () => {
        await page.clickSubmitBtn('#add_genre_btn')

        const content = await page.getContentOf("#genre_add_input");
        expect(!!content).toBeTruthy();
    });


    test('add Book Form check validation submit a valid genre', async () => {
        await page.clickSubmitBtn('#add_book_submit_btn')

        const content = await page.getContentOf("#name_error");
        expect(!!content).toBeTruthy();
    });
});