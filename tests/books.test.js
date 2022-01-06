const CustomPage = require("./utils/page");
const JEST_FN = require("./utils/functions");

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


describe('After Login able to see  ADD book functionality is present and model is opened', () => {
    beforeEach(async () => {
        await page.click('#add_book_btn');
        await page.waitForSelector('#book_form_modal form', {visible: true});
    });

    test('add Book Form', async () => {
        const formId = await page.waitGetElementProp('#book_form_modal form', 'id');
        expect(formId).toEqual('book_form');
    });

    test('add Book Form check validation', async () => {
        await page.clickSubmitBtn('#add_book_submit_btn')

        const content = await page.getContentOf("#name_error");
        expect(!!content).toBeTruthy();
    });
});