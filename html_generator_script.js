const input_config = fs.readFileSync('/public/config/input_config.json', {encoding:'utf8', flag:'r'})
const chart_ids = fs.readFileSync('/public/config/chart_ids.json', {encoding:'utf8', flag:'r'})

console.log(input_config)
console.log(chart_ids)

