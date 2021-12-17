const chai = require('chai');
const expect = chai.expect
const chaiHttp = require('chai-http');
const app = require('../app.js');

const mongoose = require('mongoose');
let User = require('../models/user');
// let url = 'http://localhost:3000';

// const create = require('../controllers/usersController');

chai.use(chaiHttp);

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    }); 
});

describe("Create", function() {
    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/test_crud')
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });
    
    it("creates new user", async () => {
        const user = new User({ 
            name: 'Meredith',
            age: 28,
            surgeon: true
         });

        await user.save();
        User.find()
            .then((res) => {
                expect(res[-1].name).equal('Meredith');
            })
    });

    it("can create new user POST /users", (done) => {
        const user = {
            name: 'Derek',
            age: 32,
            hobby: 'fishing',
            surgeon: true
        };

        chai.request(app)
            .post('/users/new')
            .set('content-type', 'application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.all.keys('type', 'id', 'attributes');
                expect(res.body.data.type).to.equal('user')
                expect(res.body.data.attributes).to.have.all.keys('name', 'age', 'hobby', 'surgeon', 'dateAdded');
                done();
            });
    });
});