const NewsClient = require('./newsClient');
const NewsModel = require('./newsModel');
const NewsView = require('./newsView');

const model = new NewsModel();
const client = new NewsClient();
const view = new NewsView(model,client);

// for(let i = 0; i< 10; i++) {
//     model.addArticle(
//         {sectionName: "Section 1",
//         webTitle: "Article Title 1",
//         fields: {
//             thumbnail: 'background.webp',
//         }
//     });
// };

// console.log(model.getArticles());
// view.displayArticles();

view.displayArticlesFromApi();


