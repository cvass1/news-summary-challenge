class NewsView {
    constructor(model, client) {
        this.model = model;
        this.client = client;
        this.mainContainerEl = document.querySelector('#main-container');

    }
    displayArticles() {
        this.model.getArticles().forEach((article) => {
            const newArticleDiv = document.createElement('div');
            newArticleDiv.textContent = article.webTitle;
            newArticleDiv.className = 'article';
            this.mainContainerEl.append(newArticleDiv);
        });
    }

    displaysArticlesFromApi() {
        this.client.loadArticles((apiData)=>{
            this.model.setsArticles(apiData.response.results);
            console.log(this.model.getArticles());
            this.displayArticles();
        });
    }
};

module.exports = NewsView;