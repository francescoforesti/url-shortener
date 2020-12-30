import {Shorturl} from "../model/shorturl";

export class Repository {
    private repo: Shorturl[] = [];

    findAll(): Promise<Shorturl[]> {
        return new Promise<Shorturl[]>((res, rej) => res(this.repo));
    }

    findOne(shortUrl: string): Promise<Shorturl> {
        return new Promise<Shorturl>((res, rej) => {
            if (this.repo.map(e => e.shortened).includes(shortUrl)) {
                res(this.repo.filter(e => e.shortened === shortUrl)[0])
            } else {
                rej(`${shortUrl} not found`)
            }
        });
    }

    add(url: Shorturl): Promise<Shorturl[]> {
        this.repo.push(url);
        return this.findAll();
    }

    delete(shortenedUrl: string): Promise<Shorturl[]> {
        return this.replaceElement(shortenedUrl);
    }

    update(url: Shorturl): Promise<Shorturl[]> {
        return this.replaceElement(url.shortened, url);
    }

    private replaceElement(key: string, replacement?: Shorturl): Promise<Shorturl[]> {
        let index = this.repo.map(e => e.shortened).indexOf(key);
        return new Promise<Shorturl[]>((res, rej) => {
            if (index >= 0) {
                replacement?
                    this.repo.splice(index, 1, replacement) :
                    this.repo.splice(index, 1);
                res(this.repo)
            } else {
                rej(`${key} not found`)
            }
        });
    }

}