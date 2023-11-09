const request = require('supertest');
const app = require('../app');

describe('GET /home', function() {
  it('responds with HTML', function(done) {
    request(app)
      .get('/home')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('POST /home', function() {
    it('sends an email successfully', function(done) {
      const data = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        message: 'Test message'
      };
  
      request(app)
        .post('/home')
        .send(data)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    }).timeout(5000); // Increased timeout value
  });
  

describe('GET /about', function() {
  it('responds with HTML', function(done) {
    request(app)
      .get('/about')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /skills', function() {
  it('responds with HTML', function(done) {
    request(app)
      .get('/skills')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /experience', function() {
  it('responds with HTML', function(done) {
    request(app)
      .get('/experience')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
