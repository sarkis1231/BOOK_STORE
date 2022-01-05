const puppeteer = require("puppeteer");
const JEST_CONSTANTS = require("./constants");
const userFactory = require("../factories/userFactory");
const localStorageFactory = require("../factories/localStorageFactory");

/**
 * @description a singleton class
 * */
class CustomPage {
    /**
     * @param page {Page}
     * */
    constructor(page) {
        this.page = page;
    }

    static async build() {
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function(target, property) {
                return customPage[property] || browser[property] || page[property];
            }
        });
    }

    async login() {
        const userInfo = await userFactory();
        const tokenWithPrefix = await localStorageFactory(userInfo);
        localStorage.setItem('token', tokenWithPrefix);

        await this.page.goto(`${JEST_CONSTANTS.CLIENT_URL}/books`);
        await this.page.waitForSelector('#log_out_btn');
    }

    async logout(){
        localStorage.removeItem('token');
    }

    /**
     * @param selector {String}
     * @return Promise<String>
     * */
    async getContentOf(selector){
        await this.page.$eval(selector, el => el.innerHTML);
    }
}

module.exports = CustomPage;