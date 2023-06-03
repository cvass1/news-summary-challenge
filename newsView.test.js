/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NewsModel = require("./newsModel");
const NewsView = require("./newsView");
const NewsClient = require('./newsClient');

jest.mock('./newsClient');

describe('NewsView', ()=> {
    it('displays all articles', () => {
        document.body.innerHTML = fs.readFileSync('./index.html')
        const model = new NewsModel();
        const view = new NewsView(model);

        model.addArticle({
            sectionName: "Section 1",
            webTitle: "Article Title 1",
            fields: {
                thumbnail: "test URL 1",
            }
        });

        model.addArticle({
            sectionName: "Section 2",
            webTitle: "Article Title 2",
            fields: {
                thumbnail: "test URL 2",
            }
        });

        view.displayArticles();

        const allArticleDivs = document.querySelectorAll('div.article');
        expect(allArticleDivs.length).toBe(2);

    });

    it('displays notes from API',()=>{
        NewsClient.mockClear();
        document.body.innerHTML = fs.readFileSync('./index.html')
        const model = new NewsModel();
        const mockClient = new NewsClient();
        const view = new NewsView(model, mockClient);
        
        mockClient.loadArticles.mockImplementation((callback) => {
            callback({
                response: {
                    results: [
                        {
                            sectionName: "Section 1",
                            webTitle: "Article Title 1",
                            fields: {
                                thumbnail: "test URL 1",
                            }
                        },
                        {
                            sectionName: "Section 2",
                            webTitle: "Article Title 2",
                            fields: {
                                thumbnail: "test URL 2",
                            }
                        }
                    ]
                }
            });
        });

        view.displayArticlesFromApi();

        const allArticleDivs = document.querySelectorAll('div.article');
        expect(allArticleDivs.length).toBe(2);
        expect(allArticleDivs[0].textContent).toEqual("Article Title 1");

    });

});