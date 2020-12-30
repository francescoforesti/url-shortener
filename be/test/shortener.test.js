const service = require('../src/service/shortener')

test('creating a shortened url', async () => {
    let shortener = new service.Shortener();
    let expectedLongUrl = 'http://www.google.it';
    let result = await shortener.newShortUrl(expectedLongUrl)
    expect(result.url).toBe(expectedLongUrl);
    expect(result.shortened).toBeDefined()
});

test('creating a shortened url with an invalid url', async () => {
    let shortener = new service.Shortener();
    let invalidUrl = "www.google.it"
    return expect(shortener.newShortUrl(invalidUrl)).rejects.toBe(`'${invalidUrl}' is not a valid url`)
});

test('creating a shortened url with an invalid http url', async () => {
    let shortener = new service.Shortener();
    let invalidUrl = new URL("ftp://example.com/path")
    return expect(shortener.newShortUrl(invalidUrl)).rejects.toBe(`'${invalidUrl}' is not a valid http/https url`)
});