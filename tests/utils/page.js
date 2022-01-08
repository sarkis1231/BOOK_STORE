const puppeteer = require("puppeteer");
const JEST_CONSTANTS = require("./constants");
const userFactory = require("../factories/userFactory");
const {redis_client} = require("../../src/redis_client");
const localStorageFactory = require("../factories/localStorageFactory");
const mongoose = require("mongoose");

/**
 * @description a singleton class
 * */
class CustomPage {

    /**
     * @param page {Page}
     * @param browser {Browser}
     * */
    constructor(page, browser) {
        this.page = page;
        this.browser = browser;
    }

    /**
     * @description build a browser instant and creates a page
     * @return {Page}
     * */
    static async build() {
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page, browser);

        return new Proxy(customPage, {
            get: function (target, property) {
                return customPage[property] || browser[property] || page[property];
            }
        });
    }

    /**
     * @description user login logic
     * @return Promise<String>
     * */
    async login() {
        const userInfo = await userFactory();

        const tokenWithPrefix = await localStorageFactory(userInfo);

        await this.page.evaluateOnNewDocument((tokenWithPrefix) => {
            localStorage.clear();
            localStorage.setItem('token', tokenWithPrefix);
        }, tokenWithPrefix);

        let current_url = `${JEST_CONSTANTS.CLIENT_URL}/books`;

        await this.page.goto(current_url);
        await this.page.waitForSelector('#log_out_btn');

        return current_url;
    }

    /**
     * @description user logout logic
     * @return Promise<String>
     * */
    async logout() {
        await this.page.evaluateOnNewDocument(() => {
            localStorage.clear();
        });
        let current_url = JEST_CONSTANTS.CLIENT_URL;
        await this.page.goto(current_url);
        return current_url;
    }

    /**
     * @description page custom Go to Function
     * @param action {String}
     * @return Promise
     * */
    async redirectTo(action) {
        return this.page.goto(`${JEST_CONSTANTS.CLIENT_URL}${action}`);
    }

    /**
     * @description closes the page related services
     * @return Promise
     * */
    async close() {
        return this.browser.close()
    }

    /**
     * @param selector {String}
     * @return Promise<String>
     * */
    async getContentOf(selector) {
        return await this.page.$eval(selector, el => el.innerHTML);
    }

    /**
     * @param selector {String}
     * @param prop {String}
     * @return Promise
     * */
    async waitGetElementProp(selector, prop) {
        await this.page.waitForSelector(selector);
        return this.getElementProp(selector, prop);
    }

    /**
     * @param selector {String}
     * @param prop {String}
     * @return Promise
     * */
    async getElementProp(selector, prop) {
        return this.page.$eval(selector, (el, prop) => el[prop], prop);
    }

    /**
     * @param selector {String}
     * @return Promise
     * */
    async clickSubmitBtn(selector) {
        return this.page.evaluate(
            (selector) => {
                let ele = document.querySelector(selector);
                if (ele) {
                    ele.click();
                }
            }
            , selector);
    }

    /**
     * @description Get Ajax request
     * @param url {String}
     * @return Promise
     * */
    async getRequest(url) {
        return this.page.evaluate(_path => {
            return fetch(_path, {
                method: 'GET',
            }).then(res => res.json());
        }, url);
    }

    /**
     * @description Get Ajax request
     * @param url {String}
     * @param data {*}
     * @return Promise
     * */
    async postRequest(url, data) {
        return this.page.evaluate(_path => {
            return fetch(_path, {
                method: 'POST',
                data: data
            }).then(res => res.json());
        }, url);
    }
}

module.exports = CustomPage;