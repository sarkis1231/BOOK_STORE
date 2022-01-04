

/**
 * @type {{
 *     authentication:Function
 * }}
 * */
let JEST_FN = {};

/**
 * @param page {Page} Page class for testing
 * @param URL {String} login page url
 * @param userInfo {{
 *     username:String,
 *     password:String
 * }}
 * does the authentication and return the page url
 * @return {Promise}
 * */
JEST_FN.authentication = async function (page, URL ,userInfo) {
    await page.goto(URL);

    const username = userInfo.username;
    const password = userInfo.password;

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

    return  page.url();
};

module.exports = JEST_FN;