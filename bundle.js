(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // apiKey.js
  var require_apiKey = __commonJS({
    "apiKey.js"(exports, module) {
      module.exports = "e0fb070f-e312-42b9-9d23-cd3e50fb535e";
    }
  });

  // newsClient.js
  var require_newsClient = __commonJS({
    "newsClient.js"(exports, module) {
      var apiKey = require_apiKey();
      var NewsClient2 = class {
        constructor() {
        }
        loadArticles(callback, searchKeyword) {
          if (searchKeyword == null) {
            searchKeyword = "";
          } else {
            searchKeyword = "q=" + searchKeyword;
          }
          fetch(`https://content.guardianapis.com/search?${searchKeyword}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`).then((response) => {
            return response.json();
          }).then((data) => {
            callback(data);
          });
        }
      };
      module.exports = NewsClient2;
    }
  });

  // newsModel.js
  var require_newsModel = __commonJS({
    "newsModel.js"(exports, module) {
      var NewsModel2 = class {
        constructor() {
          this.articles = [];
        }
        getArticles() {
          return this.articles;
        }
        addArticle(article) {
          this.articles.push(article);
        }
        setsArticles(articles) {
          this.articles = articles;
        }
      };
      module.exports = NewsModel2;
    }
  });

  // newsView.js
  var require_newsView = __commonJS({
    "newsView.js"(exports, module) {
      var NewsView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
          this.mainContainerEl = document.querySelector("#main-container");
          const searchBox = document.querySelector("#search-box");
          const searchButton = document.querySelector("#search-button");
          searchButton.addEventListener("click", () => {
            this.clearArticles();
            this.displayArticlesFromApi(searchBox.value);
          });
        }
        displayArticles() {
          this.model.getArticles().forEach((article) => {
            const articleDiv = document.createElement("div");
            articleDiv.className = "article";
            const articleImg = document.createElement("img");
            articleImg.src = this.getArticleImgUrl(article);
            articleDiv.append(articleImg);
            const articleAnchor = document.createElement("a");
            articleAnchor.textContent = article.webTitle;
            articleAnchor.setAttribute("href", article.webUrl);
            articleAnchor.setAttribute("target", "_blank");
            articleDiv.append(articleAnchor);
            this.mainContainerEl.append(articleDiv);
          });
        }
        displayArticlesFromApi(searchKeyword) {
          this.client.loadArticles((apiData) => {
            this.model.setsArticles(apiData.response.results);
            console.log(this.model.getArticles());
            this.displayArticles();
          }, searchKeyword);
        }
        getArticleImgUrl(article) {
          let articleImgUrl = "";
          if (article.fields != null && article.fields.thumbnail != null) {
            articleImgUrl = article.fields.thumbnail;
          } else {
            console.log(`no image available for article "${article.id}"`);
            articleImgUrl = "background.webp";
          }
          ;
          return articleImgUrl;
        }
        clearArticles() {
          const allArticleDivs = document.querySelectorAll("div.article");
          allArticleDivs.forEach((div) => {
            div.remove();
          });
        }
      };
      module.exports = NewsView2;
    }
  });

  // index.js
  var NewsClient = require_newsClient();
  var NewsModel = require_newsModel();
  var NewsView = require_newsView();
  var model = new NewsModel();
  var client = new NewsClient();
  var view = new NewsView(model, client);
  view.displayArticlesFromApi();
})();
