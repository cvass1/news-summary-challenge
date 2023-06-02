const NewsModel = require("./newsModel");


describe("NewsModel", () =>{
    it('returns an empty array', ()=>{
        model = new NewsModel();
        expect(model.getArticles()).toEqual([]);
    });

    it('adds articles', () => {
        model = new NewsModel();
        model.addArticle({
            title: 'New Article',
            content: 'new content',
        });
        expect(model.getArticles()).toEqual([{
            title: 'New Article',
            content: 'new content',
        }]);
    });

    it('sets the articles',()=> {
        model = new NewsModel();
        model.setsArticles([{
            title: 'New Article',
            content: 'new content',
        },
        {
        title: 'New Article 2',
        content: 'new content 2',
    }]);
        expect(model.getArticles()).toEqual([{
            title: 'New Article',
            content: 'new content',
        },
        {
            title: 'New Article 2',
            content: 'new content 2',
        }]);
    });

});