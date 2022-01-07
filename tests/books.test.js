const CustomPage = require("./utils/page");
const JEST_FN = require("./utils/functions");

let page = null;

beforeEach(async () => {
    page = await CustomPage.build();

});

afterEach(async () => {
    await page.close();
});

afterAll(async () => {
    await JEST_FN.cleanUp();
});


describe('Authenticated After Login able to see  ADD book functionality is present and model is opened', () => {
    beforeEach(async () => {
        await page.login();
        await page.click('#add_book_btn');
        await page.waitForSelector('#book_form_modal form', {visible: true});
    });

    test('add Book Form', async () => {
        const formId = await page.waitGetElementProp('#book_form_modal form', 'id');
        expect(formId).toEqual('book_form');
    });

    test('add Book Form check validation', async () => {
        await page.clickSubmitBtn('#add_book_submit_btn');

        const content = await page.getContentOf("#name_error");
        expect(!!content).toBeTruthy();
    });
});


describe('Non authenticated Books Permission', () => {

});