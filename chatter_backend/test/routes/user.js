process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../../index").app;
var User = require("../../models/user").User;
var should = chai.should();

chai.use(chaiHttp);

// before(function() {
//   server.listen(3000);
// });

describe("User", function() {
  beforeEach(function(done) {
    User.deleteMany({}, function() {
      done();
    });
  });

  describe("/GET user", function() {
    it("it should GET all the Users", function(done) {
      chai
        .request(server)
        .get("/api/v1/user")
        .end(function(err, res) {
          if (err) {
            console.log(err);
            done();
          }

          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST book', () => {
      it('it should not POST a book without pages field', (done) => {
          let book = {
              title: "The Lord of the Rings",
              author: "J.R.R. Tolkien",
              year: 1954
          }
        chai.request(server)
            .post('/book')
            .send(book)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('pages');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

  });

  // it("it should GET a user with id", function(done) {

  //     chai
  //       .request(server)
  //       .get("/api/v1/user")
  //       .end(function(err, res) {
  //         if (err) {
  //           console.log(err);
  //           done();
  //         }

  //         res.should.have.status(200);
  //         res.body.should.be.a("array");
  //         res.body.length.should.be.eql(0);
  //         done();
  //       });
  //   });
  // });
});
