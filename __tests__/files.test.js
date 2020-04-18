const request = require('supertest');
const app = require('../app');

describe('GET /api/files', function() {
  test('Should list all files', function(done) {
      return request(app)
        .get('/api/files')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          "text1.txt": "file 1 contents",
          "text2.txt": "file 2 contents",
          "text3.txt": "file 3 contents",
          "text4.txt": "file 4 contents",
        }, done);
    });
});