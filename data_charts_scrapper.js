const fs = require('fs')
const {
    chromium
} = require('playwright');

(async () => {
    const browser = await chromium.launch();
    // Create pages, interact with UI elements, assert values
    const page = await browser.newPage();
    await page.setViewportSize({
        width: 768,
        height: 1024
    })
    chart_config_file = 'test_config.json'
    chart_config = []
    dashboard_urls = ['http://demo.edu.vn/divi/tap-1/#tap-1', 'http://demo.edu.vn/divi/tap-2/#tap-2', 'http://demo.edu.vn/divi/tap-3/#tap-3']
    for (let p = 0; p < dashboard_urls.length; p++) {
        try {
            await page.goto(dashboard_urls[p])
            const chart_elements = await page.$$('.vc_chart')
            // console.log(chart_elements)
            // const chart_elements_html = await page.$$eval('.vc_chart', element => element.innerHTML)
            // for (let e = 0; chart_elements.length; e++) {
            //     elem_html = await page.evaluate(el => el.innerHTML, chart_elements[e])
            //     chart_config.push({
            //         type: "data",
            //         content: elem_html
            //     })
            // }
            e = 0
            for (const ele of chart_elements) {
                // pass the single handle below
                const single_ele_html = await page.evaluate(el => el.outerHTML, ele)
                chart_config.push({
                    type: "data",
                    content: single_ele_html.replace(/"/g,"'")
                })
                console.log(`${e++} of ${chart_elements.length} in ${p} of ${dashboard_urls.length} captured!`)
            }
            // console.log(chart_elements)

        } catch (error) {
            console.log(`couldnt fetch : ${dashboard_urls[p]}. cause: `, error)
        }


    }
    fs.writeFileSync(chart_config_file, JSON.stringify(chart_config))
    // await page.goto(dashboard_url);
    // for (let i = 0; i < selector_list_of_charts.length; i++) {
    //     try {
    //         console.log('Fetching: ', selector_list_of_charts[i].name)
    //         const element = await page.$(selector_list_of_charts[i].selector)
    //         await element.screenshot({
    //             path: './public/images/' + selector_list_of_charts[i].name + `.png`
    //         })
    //     } catch (error) {
    //         console.log(`couldnt take screenshot of element with index: ${selector_list_of_charts[i].name}. cause: `, error)
    //     }
    // }
    // const element = await page.$("#root > div > div.flex.flex-column.flex-full.relative.scroll-y > div.flex.flex-column.relative.full.flex-full > div > div > div > div:nth-child(3) > div > div > div");
    // await element.screenshot({path: `example.png`});
    //   await page.screenshot({ path: `example.png` });
    await browser.close();
})();