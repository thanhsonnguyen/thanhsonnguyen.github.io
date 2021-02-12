const fs = require('fs')
const {
    chromium
} = require('playwright');

(async () => {
    selector_list_of_charts = [{
        "name": "source",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(3) > div > div > div",
    }, {
        "name": "created_at_line",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(6) > div > div > div"
    }, {
        "name": "created_at_bar",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(7) > div > div > div"
    }, {
        "name": "created_at_bar_time",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(8) > div > div > div"
    }, {
        "name": "created_at_bar_days",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(9) > div > div > div"
    }, {
        "name": "created_at_bar_month",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(10) > div > div > div"
    }, {
        "name": "created_at_bar_quarterly",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(11) > div > div > div"
    }, {
        "name": "people_per_state",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(13) > div"
    }, {
        "name": "people_per_state2",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(14) > div"
    }, {
        "name": "people_per_source_over_time",
        "selector": "#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(16) > div > div > div"
    }]



    const browser = await chromium.launch();
    // Create pages, interact with UI elements, assert values
    const page = await browser.newPage();
    await page.setViewportSize({ width: 768, height: 1024 })
    dashboard_url = 'https://metabase.dwh.abnasia.org/public/dashboard/759a7732-2b70-46de-b886-24e72c37da86'
    await page.goto(dashboard_url);
    for (let i = 0; i < selector_list_of_charts.length; i++) {
        try {
            console.log('Fetching: ', selector_list_of_charts[i].name)
            const element = await page.$(selector_list_of_charts[i].selector)
            await element.screenshot({
                path: './public/images/' + selector_list_of_charts[i].name + `.png`
            })
        } catch (error) {
            console.log(`couldnt take screenshot of element with index: ${selector_list_of_charts[i].name}. cause: `, error)
        }
    }
    // const element = await page.$("#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(3) > div > div > div");
    // await element.screenshot({path: `example.png`});
    //   await page.screenshot({ path: `example.png` });
    await browser.close();
})();