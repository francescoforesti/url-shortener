import express from 'express';
import bodyParser from "body-parser";
import {Repository} from "../persistence/repository";
import {Request, Response} from "express-serve-static-core";
import {Shortener} from "../service/shortener";
import {Shorturl} from "../model/shorturl";

const baseUrl = '/api/';

export default class Api {
    private _express: express.Application;

    public constructor(
        private _repository: Repository,
        private _shortener: Shortener
    ) {
        this._express = express();
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({extended: true}));

        // TODO : serve only in production
        this._express.use('/application', express.static('frontend'));

        this.addFindAll(this._repository);
        this.addFindOne(this._repository);
        this.addCreate(this._repository, this._shortener);
        this.addUpdate(this._repository, this._shortener);
        this.addDelete(this._repository);
        this.addRedirector(this._repository);

    }

    listen(port: number, callback: () => void) {
        this._express
            .listen(port, callback);
    }

    get express() {
        return this._express;
    }

    private addRedirector(repo: Repository) {
        this._express.get(`/:shortened`, function (req: Request, res: Response) {
            repo.findOne(req.params.shortened)
                .then(updated => res.status(302).header('Location', updated.url).send())
                .catch(reason => res.status(404).contentType("text/plain").send(reason))
        })
    }

    private addFindAll(repo: Repository) {
        this._express.get(baseUrl, function (req: Request, res: Response) {
            repo.findAll()
                .then(list => res.send(list))
        });
    }

    private addFindOne(repo: Repository) {
        this._express.get(`${baseUrl}:shortened`, function (req: Request, res: Response) {
            repo.findOne(req.params.shortened)
                .then(updated => res.send(updated))
                .catch(reason => res.status(404).contentType("application/json").send(reason))
        })
    }

    private addCreate(repo: Repository, shortener: Shortener) {
        this._express.post(baseUrl, function (req: Request, res: Response) {
            let reqBody: Shorturl = req.body;
            shortener.newShortUrl(reqBody.url)
                .then(shortUrl => repo.add(shortUrl)
                    .then(saved => res.status(201).header('Location', `${baseUrl}${shortUrl.shortened}`).send(saved))
                ).catch((reason => res.status(422).contentType("application/json").send(reason)))
        })
    }

    private addUpdate(repo: Repository, shortener: Shortener) {
        this._express.put(`${baseUrl}:shortened`, function (req: Request, res: Response) {
            let oldKey = req.params.shortened;
            let reqBody: Shorturl = req.body;
            shortener.newShortUrl(reqBody.url)
                .then(shortUrl => {
                        shortUrl.shortened = oldKey; // put the candle back
                        repo.update(shortUrl)
                            .then(saved => res.status(201).send(saved))
                    }
                ).catch((reason => res.status(422).contentType("application/json").send(reason)))
            repo.update(req.body)
                .then(updated => res.send(updated))
        })
    }

    private addDelete(repo: Repository) {
        this._express.delete(`${baseUrl}:shortened`, function (req: Request, res: Response) {
            repo.delete(req.params.shortened)
                .then(updated => res.status(204).send(updated))
                .catch(reason => res.status(410).contentType("application/json").send(reason))
        })
    }

}



