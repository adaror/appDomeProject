const request = require('supertest');
const app = require('../app');

describe('POST /api/parse', function () {
  test('User: No React, Both. App: native.apk', function (done) {
    return request(app)
      .post('/api/parse')
      .field('userId', '5e09e77768698614f8a4a815')
      .attach('file', 'apps/native.apk')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        'platform': 'apk',
        'react': false
      }, done);
  });

  test('User: React, Both. App: native.apk', function (done) {
    return request(app)
      .post('/api/parse')
      .field('userId', '5e09e77768698614f8a4a815')
      .attach('file', 'apps/native.apk')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        'platform': 'apk',
        'react': false
      }, done);
  });

  test('User: React, APK. App: react.apk', function (done) {
    return request(app)
      .post('/api/parse')
      .field('userId', '5e09e77768698614f8a4a815')
      .attach('file', 'apps/react.apk')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        'platform': 'apk',
        'react': true
      }, done);
  });

  test('User: No React, IPA. App: react.ipa', function (done) {
    return request(app)
      .post('/api/parse')
      .field('userId', '5e09e77768698614f8a4a815')
      .attach('file', 'apps/react.ipa')
      .set('Accept', 'application/json')
      .expect(403, done);
  });

  test('User: No React, IPA. App: native.apk', function (done) {
    return request(app)
      .post('/api/parse')
      .field('userId', '5e09e77768698614f8a4a815')
      .attach('file', 'apps/native.apk')
      .set('Accept', 'application/json')
      .expect(403, done);
  });
});