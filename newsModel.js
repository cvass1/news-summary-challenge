class NewsModel {
    constructor() {
        this.articles = [];
    }

    getArticles() {
        return this.articles
    }

    addArticle(article) {
        this.articles.push(article);
    }

    setsArticles(articles) {
        this.articles = articles;
    }
};

module.exports = NewsModel;