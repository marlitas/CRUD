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
                .then(res => res.json())
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });
    
    it("creates new user", async (done) => {
        const user = new User({ 
            name: 'Meredeith',
            age: 28,
            surgeon: true
         });
        await user.save()
        const users = User.find()
                         .then(res => console.log(res,'Response'))
        // console.log(users)
         //done() tells mocha that test is done
         //const amount_users = users.length()
            // .then(() => {
            //     expect(User.find.length()).to.equal(1)
            // })
    });
    it("throws error with invalid user", (done) => {
        const badUser = new User({
            notName: 'Wrong'
        });

        badUser.save(err => {
            if(err) {return done(); }
            throw new Error('Should generate error!');
        })
    })
    it("can create new user POST /users", (done) => {
        const existing = User.find.length();
        const user = {
            name: 'Derek',
            age: 32,
            hobby: 'fishing',
            surgeon: true
        };

        chai.request(url)
            .post('/sample_users')
            .send(JSON.stringify(user));

        const current = User.find.length();

        expect(existing + 1).to.equal(current);
    });
});