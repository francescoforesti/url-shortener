const persistence = require('../dist/persistence/repository')
const model = require('../dist/model/shorturl')

test('the repository is initially empty', async () => {
    let repo = new persistence.Repository();
    let all = await repo.findAll();
    expect(all.length).toBe(0);
});

test('adding an object to the repository', async () => {
    let repo = new persistence.Repository();
    let expected = new model.Shorturl('http://www.google.it', 'abcde');
    await repo.add(expected);
    let all = await repo.findAll();
    expect(all.length).toBe(1)
    expect(all[0]).toEqual(expected)
});

test('finding an object', async () => {
    let repo = new persistence.Repository();
    let expected = new model.Shorturl('http://www.google.it', 'abcde');
    await repo.add(expected);
    let actual = await repo.findOne(expected.shortened);
    expect(expected).toEqual(actual)
});

test('finding an object that doesn\'t exist', async () => {
    let repo = new persistence.Repository();
    return expect(repo.findOne('abcde')).rejects.toBe('abcde not found')
});


test('updating an object', async () => {
    let repo = new persistence.Repository();
    let expected = new model.Shorturl('http://www.google.it', 'abcde');
    await repo.add(expected);
    expected.url = 'http://bing.com';
    await repo.update(expected);
    let actual = await repo.findOne(expected.shortened);
    expect(expected).toEqual(actual)
});

test('updating an object that doesn\'t exist', async () => {
    let repo = new persistence.Repository();
    let expected = new model.Shorturl('http://www.google.it', 'abcde');
    return expect(repo.update(expected)).rejects.toBe('abcde not found')
});

test('deleting an object', async () => {
    let repo = new persistence.Repository();
    let expected = new model.Shorturl('http://www.google.it', 'abcde');
    await repo.add(expected);
    await repo.delete(expected.shortened)
    let all = await repo.findAll();
    expect(all.length).toBe(0)
});

test('deleting an object that doesn\'t exist', async () => {
    let repo = new persistence.Repository();
    return expect(repo.delete('abcde')).rejects.toBe('abcde not found')
});