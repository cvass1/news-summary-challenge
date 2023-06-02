const apiKey = require('./apiKey');

class NewsClient {
    constructor() {

    }

    loadArticles(callback) {
        fetch(`https://content.guardianapis.com/search?api-key=${apiKey}`)
        .then((response) =>{
            return response.json()
        })
        .then((data)=>{
            callback(data);
        });
    }
};

module.exports = NewsClient;