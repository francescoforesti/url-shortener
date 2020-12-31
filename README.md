## URL Shortener example project

This is an example of an url shortening service, with a simple crud backend made with Node.js and a small management UI made with React and Ant Design.

### Main Features

* the application frontend is served at `http://localhost:8080/application`
* the API documentation (swagger) is served at `http://localhost:8080/api/docs/`

#### Build and run

In order to build and run the project the following prerequisites must be met:
* the user running the script must have full permissions to work in the current directory
* npm must be available to the user running the build and run scripts

Once these conditions are met, just do the following:

```
cd in the project root directory
sh build.sh
sh start.sh
open a browser and navigate to localhost:8080/application or localhost:8080/api/docs
```