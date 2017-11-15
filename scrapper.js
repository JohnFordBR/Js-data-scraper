const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');
const fs = require('fs');

jsonfile.readFile("links.json", function (err, obj) {
    console.dir(err || 'success');
    scraperloop(obj.articles, 0);

})



let options = {
    url: 'http://www.imdb.com/title/tt0111161/fullcredits?ref_=tt_ov_st_sm',

};

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
        for(let i in page.articles)
        {
          if(page.articles[i].title=="")
            {
              page.articles.splice(i, 1);
            }
        }
        jsonfile.writeFile('characters.json', page, { spaces: 2 },{'flags': 'w'}, ()=>{

        });

    }

}

function scraperloop(arr, i) {
    setTimeout(function () {
        var url = arr[i].url;
        request(url, callback)
        scraperloop(arr, ++i)
    }, 2000)
}


//   request(options,callback);
