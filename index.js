const NewsClient = require('./newsClient');
const NewsModel = require('./newsModel');
const NewsView = require('./newsView');

const model = new NewsModel();
const client = new NewsClient();
const view = new NewsView(model,client);

model.addArticle(
    {sectionName: "Section 1",
    webTitle: "Article Title 1",
    fields: {
        thumbnail: 'https://dummyimage.com/200x120/ffffff/ffffff',
    }
    });

    model.addArticle(
        {sectionName: "Section 2",
        webTitle: "Article Title 2",
        fields: {
            thumbnail: 'https://dummyimage.com/200x120/ffffff/ffffff',
        }
        });

console.log(model.getArticles());
view.displayArticles();

//view.displaysArticlesFromApi();


