const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');
const fs = require('fs');


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
        jsonfile.writeFile('characters.json', page, { spaces: 2 }, ()=>{

        });

    }

}



  request(options,callback);
