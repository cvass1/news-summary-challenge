class NewsView {
    constructor(model, client) {
        this.model = model;
        this.client = client;
        this.mainContainerEl = document.querySelector('#main-container');
        
        const searchBox = document.querySelector('#search-box');
        const searchButton = document.querySelector('#search-button');
        searchButton.addEventListener('click', ()=>{
            this.clearArticles();
            this.displayArticlesFromApi(searchBox.value);
        });


    }
    displayArticles() {
        this.model.getArticles().forEach((article) => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';

            const articleImg = document.createElement('img');
            articleImg.src = this.getArticleImgUrl(article);

            articleDiv.append(articleImg);

            const articleAnchor = document.createElement('a');
            articleAnchor.textContent = article.webTitle;
            articleAnchor.setAttribute('href',article.webUrl);
            articleAnchor.setAttribute('target',"_blank");
            articleDiv.append(articleAnchor);

            this.mainContainerEl.append(articleDiv);
        });
    }

    displayArticlesFromApi(searchKeyword) {
        this.client.loadArticles((apiData)=>{
            this.model.setsArticles(apiData.response.results);
            console.log(this.model.getArticles());
            this.displayArticles();
        }, searchKeyword);
    }

    getArticleImgUrl (article) {
        let articleImgUrl ='';
        if (article.fields != null && article.fields.thumbnail != null) {
            articleImgUrl = article.fields.thumbnail;
        } else {
            console.log(`no image available for article "${article.id}"`);
            articleImgUrl = 'background.webp';
        };
        return articleImgUrl;
    }

    clearArticles() {
        const allArticleDivs = document.querySelectorAll('div.article');
        allArticleDivs.forEach((div) => {
            div.remove();
        });

    }

    
};

module.exports = NewsView;