process.env.NODE_ENV = "test";

var http = require("http");
var expect = require("chai").expect;
var config = require("../config/appConfig");

describe("Test Application Server", () => {
  beforeEach(function(done) {
    require("../index");
    done();
  });

  it('should return "Welcome to Chatter"', function(done) {
    baseUrl = "http://127.0.0.1:" + config.PORT.toString();
    http.get(baseUrl, function(res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

require("./routes/user");