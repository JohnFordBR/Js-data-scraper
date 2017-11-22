const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');
const fs = require('fs');
let movobj = { articles: [] };
jsonfile.readFile("links.json", function (err, obj) {
    console.dir(err || 'success');
    scraperloop(obj.articles, 200);

})

let data = {
    // Fetch the articles
    articles: {
        listItem: ".itemprop",
        data: {
            title: "span"
        }
    }
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        let page = scrapeIt.scrapeHTML(body, data);
        for (let i in page.articles) {
            if (page.articles[i].title != "") {
                movobj.articles = movobj.articles.concat(page.articles[i]);
            }
        }

    }

}

function scraperloop(arr, i) {
    setTimeout(function () {
        var url = arr[i].url;
        request(url, callback);
        scraperloop(arr, ++i);
        if (i == 250) {
            jsonfile.writeFile('print.json', movobj, { spaces: 2, flag: 'a' }, () => {
                console.error(err);
            });
            return "norm";
        }
    }, 2000)
}


//   request(options,callback);
