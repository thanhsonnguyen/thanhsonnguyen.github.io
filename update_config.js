const fs = require('fs')

test_data = JSON.parse(fs.readFileSync('temp_config.json'))

// console.log(test_data[0])
out_file = './public/config/chart_ids.json'
out_data = {}
for (i = 0; i < test_data.length; i++) {
    out_data["chart-id-" + (i + 1)] = test_data[i]
}
console.log(out_data)
fs.writeFileSync(out_file, JSON.stringify(out_data))