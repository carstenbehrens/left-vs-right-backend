# Left-vs-Right Backend

This is an API for a news aggregator. It gets news from the left and right-leaning news sites.
I used [Allsides](https://www.allsides.com/media-bias/media-bias-ratings) to choose the
appropriate media outlets.

I created this to improve my knowledge of TypeScript. The API is not that special in
that it just fetches some news from an external API and then saves them in a
database for future requests.

The architecture is loosely based on [Bulletproof Node.JS API](https://github.com/santiq/bulletproof-nodejs).

## Technology

- **Language:** Typescript.
- **Web Application Framework:** Express (For Node.js).
- **Database:** MongoDB (with Mongoose).

External API's:

- **Cloudinary:** To store images.
- **News API:** To get the news.

## Codestyle

- OOP.
- This project aims to implement the SOLID principles.
- Don't over-engineer too much.
- Separate business logic from Express as much as possible.

## Development

To run this API locally you will need a few things:

- A prod and dev MongoDB either locally or on the cloud. (I use [Atlas](https://www.mongodb.com/cloud/atlas) for this.)
- An API-Key for [News API](https://newsapi.org/)
- An API-Key for [Cloudinary](https://cloudinary.com/)

You need to enter all this in your .env file.

Before the first run:

```bash
npm install
```

After that, use this to start the dev server:

```bash
npm run dev
```

## Todos

- Add unit tests [ ]
- Use dependency injection for the HTTP client [ ]
- Add pre-commit hooks for linting [ ]
- Add diferently sized images for that sweet frontend performance [ ]
