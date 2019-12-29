var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

/* GET home page. */
router.get('/', function (req, res, next) {
    let formToken = req.query.formToken;
    let cover_path = '/tmp/form-' + formToken + '.jpg';
    let full_path = '/tmp/form-full-' + formToken + '.jpg';
    (async () => {
        const browser = await puppeteer.launch({'headless': false});
        const page = await browser.newPage();
        await page.goto('https://jinshuju.net/f/' + formToken);
        await page.waitFor(5000);
        await page.screenshot({path: full_path, fullPage: true});
        await page.setViewport({
            width: 576,
            height: 740
        });
        await page.screenshot({path: cover_path});
        await browser.close();
        await res.json({"coverPath": cover_path, "fullPath": full_path})
    })()
});

module.exports = router;
