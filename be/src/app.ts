import "reflect-metadata";
import {Repository} from "./persistence/repository";
import Api from "./api/api";
import {Shortener} from "./service/shortener";

const port = 8080;

export class Application {

    main() {
        let api: Api = new Api(new Repository(), new Shortener());

        api.listen(port, function () {
            console.log(`App is listening on port ${port}!`);
        });
    }

}

function main() {
    new Application().main();
}

if (require.main === module) {
    main();
}
