const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');
const fs = require('fs');



let options = {
    url: 'http://www.imdb.com/chart/top',
};

let data = {
    // Fetch the articles
    articles: {
        listItem: ".titleColumn",
        data: {
            url: {
                selector: "a",
                attr: "href",
                convert: function(x){
                    return 'http://www.imdb.com/' + x;
                }
            }
        }
    }
}
function callback(error, response, body) {
 if(error) throw error;
    if (!error && response.statusCode == 200) {

        let page = scrapeIt.scrapeHTML(body, data);
        for(let i in page.articles)
        {
          if(page.articles[i].title=="")
            {
              page.articles.splice(i, 1);
            }
        }
        jsonfile.writeFile('links.json', page, { spaces: 2 }, (err)=>{
          if (err) throw err;
        });

    }

}



  request(options,callback);
