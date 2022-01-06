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
        await page.waitForSelector('#add_genre_btn', {visible: true});
    });

    test('add Book Form check validation', async () => {
        await page.clickSubmitBtn('#add_genre_btn');

        const content = await page.getContentOf("#add_genre_input_error");
        expect(!!content).toBeTruthy();
    });


    test('add Book Form check validation submit a valid genre', async () => {
        await page.type('#add_genre_input', JEST_FN.getUniqueStr());

        await page.clickSubmitBtn('#add_genre_btn');
        const content = await page.getContentOf("#add_genre_input_error");
        expect(!!content).toBeFalsy();
        // reset after submit
        expect(!!await page.getElementProp('#add_genre_input', 'value')).toBeFalsy();

    });
});