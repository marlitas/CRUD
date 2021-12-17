const chai = require('chai');
const expect = chai.expect
const chaiHttp = require('chai-http');
// const app = 'http://localhost:3000';
const mongoose = require('mongoose');
const User = require('../models/sample_user')

let url = 'http://localhost:3000';
const create = require('../controllers/sample_user');
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
        const expected = {
            'data': {
                'type': 'user',
                'id': '',
                'attributes': {
                    'name': 'Derek',
                    'age': 32,
                    'hobby': 'fishing',
                    'surgeon': true
                }
            }
        };
        const user = {
            name: 'Derek',
            age: 32,
            hobby: 'fishing',
            surgeon: true
        };

        chai.request(url)
            .post('/sample_users')
            .set('content-type', 'application/json')
            .send(JSON.stringify(user))
            .then((res) => {
                res.should.have.status(200);
                expect(res).equal(expected.json());
                done();
            }).catch((res) => {
                console.log(res, 'res');
            })
    });
});