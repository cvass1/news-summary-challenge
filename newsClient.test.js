const NewsClient = require("./newsClient");
require('jest-fetch-mock').enableMocks();

describe('NewsClient', () => {
    it('fetches from the API', (done)=>{
        const client = new NewsClient();

        fetch.mockResponseOnce(JSON.stringify(
            {
                title: 'New Article',
                content: 'new content',
            }
        ));

        client.loadArticles((apiData)=>{
            expect(apiData).toEqual({
                title: 'New Article',
                content: 'new content',
            });
            done();
        });

    });
});