// Load dependencies
var fs = require('fs');
require('total.js');

// Worker settings
var options = {path: '', hostname: ''};

process.on('message', function (data) {
    options = data;
    createXML();
});

function createXML() {

    var writer = fs.createWriteStream(options.path);

    var write = function (url, lastmod, priority, changefreq) {
        var str = '<url><loc>' + url.encode() + '</loc><lastmod>' + lastmod + '</lastmod><changefreq>' + changefreq + '</changefreq><priority>' + priority + '</priority></url>';
        writer.write(str);
    };

    var hostname = options.hostname;
    var lastmod = new Date().format('yyyy-MM-dd');

    writer.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', 'utf8');

    // Many items
    //write(hostname + '/', lastmod, '1.0000', 'weekly');
    //console.log(options.sitemap);
var i=0;
    Object.keys(options.sitemap).forEach(function (key) {
        var arr = options.sitemap[key];

        if (arr.noIndex)
            return;

        //for (var i = 0, length = arr.length; i < length; i++) {
        write(hostname + arr.url, lastmod, '1', 'daily');

        //value.sitemap // current sitemap id
        //value.id      // current item id
        //value.name    // current item name
        //value.url     // current item url
        //value.last    // is the last item?
        //value.first   // is the first item?
        //value.index   // current item index in sitemap (in the parent tree)
        //}
        console.log(i++);
    });

    // Complete
    writer.end('</urlset>');

    writer.on('finish', function () {
        // Done
        process.exit();
    });

}