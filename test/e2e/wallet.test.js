const app = require('../../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('Wallet', () => {

    describe('/wallet/create', () => {
        it('should return private key and address values of generated wallet ', done => {
            chai
                .request(app)
                .get('/wallet/create')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('success');
                    res.body.success.should.be.eql(true);
                    res.body.should.have.property('data');
                    res.body.data.should.be.an('object');
                    res.body.data.should.have.property('privateKey');
                    res.body.data.privateKey.should.be.a('string');
                    res.body.data.should.have.property('address');
                    res.body.data.address.should.be.a('string');
                    done();
                });
        });

    });
});