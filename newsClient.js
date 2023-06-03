const apiKey = require('./apiKey');

class NewsClient {
    constructor() {

    }

    loadArticles(callback, searchKeyword) {
        if (searchKeyword == null) {
            searchKeyword ="";
        } else {
            searchKeyword ="q="+ searchKeyword;
        }
        fetch(`https://content.guardianapis.com/search?${searchKeyword}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`)
        .then((response) =>{
            return response.json()
        })
        .then((data)=>{
            callback(data);
        });
    }
};

module.exports = NewsClient;