/**
 * @type {{
 *     authentication:Function,
 *     cleanUps:Function
 * }}
 * */
const {redis_client} = require("../../src/redis_client");
let JEST_FN = {};


/**
 * @description does the authentication and return the page url
 * @param page {Page} Page class for testing
 * @param URL {String} login page url
 * @param userInfo {{
 *     username:String,
 *     password:String
 * }}
 * @return {Promise}
 * */
JEST_FN.authentication = async function (page, URL, userInfo) {

    // maybe can be done by direct mongo relation and with local storage trick

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

    return page.url();
};


JEST_FN.cleanUps = function () {
    redis_client.quit();
};

module.exports = JEST_FN;