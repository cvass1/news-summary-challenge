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
        loadArticles(callback) {
          fetch(`https://content.guardianapis.com/search?api-key=${apiKey}`).then((response) => {
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
        }
        displayArticles() {
          this.model.getArticles().forEach((article) => {
            const newArticleDiv = document.createElement("div");
            newArticleDiv.textContent = article.webTitle;
            newArticleDiv.className = "article";
            this.mainContainerEl.append(newArticleDiv);
          });
        }
        displaysArticlesFromApi() {
          this.client.loadArticles((apiData) => {
            this.model.setsArticles(apiData.response.results);
            console.log(this.model.getArticles());
            this.displayArticles();
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
  model.addArticle("hello");
  view.displaysArticlesFromApi();
})();
