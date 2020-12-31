import {Shorturl} from "../model/shorturl";

export class Shortener {
    private current: number = new Date().valueOf();

    async newShortUrl(url: string): Promise<Shorturl> {
        return new Promise<Shorturl>((resolve, reject) => {
            let error = Shortener.isValidHttpUrl(url);
            if (error) {
                reject(error);
            } else {
                const id = this.current++;
                resolve(new Shorturl(url, Shortener.encode(id)))
            }
        });
    }

    private static isValidHttpUrl(maybeUrl: string): string | null {
        let error = null;
        let url;
        try {
            url = new URL(maybeUrl);
            if(!(url.protocol === "http:" || url.protocol === "https:")) {
                error = `'${maybeUrl}' is not a valid http/https url`
            }
        } catch (_) {
            error = `'${maybeUrl}' is not a valid url`
        }
       return error;
    }

    private static allowedCharacters = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    private static base = Shortener.allowedCharacters.length;

    private static encode(input: number): string {
        let num = input;
        let result: string[] = [];

        while (num > Shortener.base) {
            result.push(Shortener.allowedCharacters[Math.floor(num) % Shortener.base]);
            num = num / this.base;
        }

        return result.reverse().join('');
    }


}