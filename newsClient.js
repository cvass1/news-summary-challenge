const apiKey = require('./apiKey');

class NewsClient {
    constructor() {

    }

    loadArticles(callback) {
        fetch(`https://content.guardianapis.com/search?q=UK&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`)
        .then((response) =>{
            return response.json()
        })
        .then((data)=>{
            callback(data);
        });
    }
};

module.exports = NewsClient;