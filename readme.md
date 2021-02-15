Setup charts
Charts_id.json this is the chart repository this contains list and data of all the charts

There are 3 types of chart can be added

Data charts: This contains raw data and charts are recreated with this data. The data is in the div on the demo.wn site all 37 charts are added right now

Iframe charts: This are single page charts for example datawrapper. Only source url needs to be added.

Image charts: charts captured as images using a script. The images are stored in images folder and relative path of the image to be mentioned the root is /public directory

Setup users
Input_config.json is the user repository this contains list of users with serial number. For each serial number associated to a particular user contains layout which is list of charts-id to be displayed for each serial number. The chart-id are fixed.

html_generator_script.js is for generating seral number specific HTML files these are stored in generated_html_files directory.

Index file is the base home page for the site which loads the required serial number html as entered in the input field. If a serial numbered file doesn't exist it'll show an error for the same.

PWA offline capabilities

It will cache all the necessary files and dependencies in memory and serve the pages till network is available.

There is a memory cap of 50 MB but data charts doesn't consume much memory as those are recreated on runtime and iframes can't be cached they are online only.


