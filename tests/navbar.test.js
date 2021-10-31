const puppeteer = require('puppeteer');

test('Adds to numbers', () => {
    const sum = 1 + 2;
    expect(sum).toEqual(3)
});

test('We can launch a browser', async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
});