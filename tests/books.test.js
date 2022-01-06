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

test('After Login able to see add Book Form', async () => {
    await page.click('#add_book_btn');
    const formId = await page.waitGetElementProp('#book_form_modal form', 'id');
    expect(formId).toEqual('book_form');
});