# Express Boiler Plate

A NodeJS web application building using the following technologies:

- Express
- Bootstrap
- CodeMirror 6.65.7
- Handlebars
- Swagger
- Select2
- JQuery 3.7.1
- PopperJS Core 2.11.8
- FontAwesome 6.5.1
- Toast

## Installation

Run as native node application using npm:

```javascript
npm install
npm run start
```

Build and run using Docker:

```bash
npm run docker:build
npm run docker:run
```

Pull image from Docker.io and run with the following:

```bash
docker run -d -p 3000:3000 --name express-boilerplate --restart=always --env-file=.env -v data:/app/data sieteunoseis/express-boilerplate:latest
```

## Environment Variable

```javascript
NODE_ENV=production
```

## Exposed API

API's used in this project can be used externally. Currently they are unsecured. Documentation can be found at:

http://localhost:3000/docs

## Giving Back

If you would like to support my work and the time I put in creating the code, you can click the image below to get me a coffee. I would really appreciate it (but is not required).

[![Buy Me a Coffee](https://github.com/appcraftstudio/buymeacoffee/raw/master/Images/snapshot-bmc-button.png)](https://www.buymeacoffee.com/automatebldrs)