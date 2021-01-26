import App from '../../app';
import MockLogger from '../../utils/mockLogger';
import { Container } from 'typedi';
import dropAllCollections from '../../utils/dropCollections';
import ArticleModel from '../../models/articles';
import express from 'express';
import mongoose from 'mongoose';
import request from 'supertest';

const path = '/news';

// Set MockLogger since we don't need logs for every test.
const logger = new MockLogger();
Container.set('logger', logger);

describe('#news', () => {
  let app: express.Express;
  let instance: App;
  let connection: mongoose.Connection;

  beforeAll(async () => {
    instance = new App(Container.get('logger'));
    await instance.init();
    app = instance.getServer();
    connection = instance.getDbConnection();
  });

  afterEach(async () => await dropAllCollections(connection));

  afterAll(async () => {
    await connection.close();
  });

  test('Respond with status code 400 when correct JSON data is not sent', async (done) => {
    await request(app).get(path).expect(400);
    done();
  });

  test('Respond with correct error messages when JSON data is not sent', async (done) => {
    const res = await request(app).get(path);
    const errors = res.body.errors;
    expect(errors[0].msg).toBe(
      'Date should be provided with the following value: YYYY-MM-DD e.g. 2020-10-15'
    );
    expect(errors[1].msg).toBe(
      'PoliticalSpectrum should with the following value: right | left e.g. left'
    );
    done();
  });

  test('Respond with correct data from db', async (done) => {
    const date = '2021-01-20';

    // Create mock data
    const mockArticles = {
      date,
      articles: [
        {
          source: {
            id: '123',
            name: 'CNN'
          },
          author: 'Max Mustermann',
          title: 'Title of the Article',
          description: 'Some description',
          url: 'https://www.cnn.com',
          urlToImage:
            'https://res.cloudinary.com/left-vs-right/image/upload/v1611296110/v0jvtbapqbwuxcl1pzma.jpg',
          publishedAt: '2021-01-20T00:53:33Z',
          politicalSpectrum: 'left'
        }
      ]
    };

    const articlesModel = new ArticleModel({
      ...mockArticles
    });

    // Save the mock data to db
    await articlesModel.save();

    const res = await request(app).get(path).send({
      date,
      politicalSpectrum: 'left'
    });

    // Remove the ids that are added by mongoose
    delete res.body._id;
    delete res.body.articles[0]._id;

    // Check if mock data is correct
    expect(res.body).toEqual({ ...mockArticles, __v: 0 });
    done();
  });
});
