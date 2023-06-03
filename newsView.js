class NewsView {
    constructor(model, client) {
        this.model = model;
        this.client = client;
        this.mainContainerEl = document.querySelector('#main-container');

    }
    displayArticles() {
        this.model.getArticles().forEach((article) => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';

            const articleImg = document.createElement('img');
            if (article.fields.thumbnail != null) {
                articleImg.src = article.fields.thumbnail;
            } else {
                console.log(`no image available for article "${article.id}"`);
                articleImg.src = 'https://dummyimage.com/200x120/ffffff/ffffff';
            }
            articleDiv.append(articleImg);

            const articleAnchor = document.createElement('a');
            articleAnchor.textContent = article.webTitle;
            articleAnchor.setAttribute('href',article.webUrl);
            articleAnchor.setAttribute('target',"_blank");
            articleDiv.append(articleAnchor);

            this.mainContainerEl.append(articleDiv);
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