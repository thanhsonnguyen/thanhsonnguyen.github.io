const fs = require('fs')
const cheerio = require('cheerio')

const input_config = JSON.parse(fs.readFileSync('./public/config/input_config.json', {
    encoding: 'utf8',
    flag: 'r'
}))
const chart_ids = JSON.parse(fs.readFileSync('./public/config/chart_ids.json', {
    encoding: 'utf8',
    flag: 'r'
}))

// console.log(input_config)
// console.log(chart_ids)



for (i = 0; i < input_config.length; i++) {
    // console.log(input_config[i])
    create_html(input_config[i].serial_no, input_config[i].layout)
}


function create_html(serial, layout) {
    html_template = fs.readFileSync('./template.html')
    const $ = cheerio.load(html_template)

    container_html = ""
    for (j = 0; j < layout.length; j++) {

        chart_element = "<div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 p-2'><div id='" + layout[j] + "' class='card'><h5 class='card-title'></h5><div class='card-body' ></div></div></div>"
        if (j % 2 == 0) {
            container_html += "<div class='row clearfix p-2'>" + chart_element
        } else {
            container_html += chart_element + "</div>"
        }
        // container_html += "</div>"
    }
    // console.log(container_html)
    $('.container-fluid').append(container_html)
    fs.writeFileSync('./public/generated_html_files/' + serial + '.html', $.html())
}