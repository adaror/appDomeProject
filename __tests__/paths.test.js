const request = require('supertest');
const app = require('../app');

describe('POST /api/paths', function() {
  test('correctly parse exmaple 1', function(done) {
    return request(app)
      .post('/api/paths')
      .set('Accept', 'application/json')
      .send({
        "a": {
          "b": {
            "c": ""
          }
        },
        "d": {
          "e": ""
        },
        "f": {
          "g": "",
          "h": {
            "i": ""
          }
        }
    })
      .expect('Content-Type', /json/)
      .expect(200, {
        "a": {
          "b": {
            "c": "a.b.c"
          }
        },
        "d": {
          "e": "d.e"
        },
        "f": {
          "g": "f.g",
          "h": {
            "i": "f.h.i"
          }
        }
    }, done);
  });

  test('correctly parse exmaple 2', function(done) {
    return request(app)
      .post('/api/paths')
      .set('Accept', 'application/json')
      .send({
        "a": {
          "b": ""
        },
        "c": {
          "d": ""
        },
        "t": {
          "u": {
            "k": {
              "i": ""
            }
          }
        }
    })
      .expect('Content-Type', /json/)
      .expect(200, {
        "a": {
          "b": "a.b"
        },
        "c": {
          "d": "c.d"
        },
        "t": {
          "u": {
            "k": {
              "i": "t.u.k.i"
            }
          }
        }
    }, done);
  });
});