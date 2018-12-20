# Nodejs url-shortener

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3 and [NodeJs](https://nodejs.org) version 8.11.2

![preview](https://dl.dropboxusercontent.com/s/d4nykgkrwtk46zi/shorten.jpg)

[Live Preview](http://url-shortener.dharmalab.ml/)

## Installation
use `npm install` in `api-backend` dir & `url-shortener-frontend` dir for install libs.

## Run
use `npm start` in `api-backend` dir for run nodejs api.
use `npm serve` in `url-shortener-frontend` dir for run client side.
 - nodejs api run on port `3000`
 - angular run on port `4200`

install `mongoDB`  and set DB adress for `database` var for `config.js`

## API
api adress after run: `{your_url}:3000/api/v0.1/...`

 - `/api/v0.1/{short_link}` - method: `GET` | redirect to original link
 - `/api/v0.1/urls` - method: `GET` | get all short url - auth necessary
 - `/api/v0.1/statics` - method `GET` | get service statics - auth necessary
 - `/api/v0.1/users/signup` - method: `POST` | sign up user
 - `/api/v0.1/users/signin` - method: `POST` | signin user
 - `/api/v0.1/urls/{user_id}` - method: `POST` | get user urls - auth necessary
 - `/api/v0.1/urls/{url}` - method: `POST` | save url for shorting - auth necessary
 - `/api/v0.1/urls/{url_id}` - method: `DELETE` | delete url - auth necessary




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help
visit [imohamad](http://imohamad.ml) or send e-mail: [mohamad.partizan@gmail.com](mailto:mohamad.partizan@gmail.com)
