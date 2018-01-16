const mocha = require('mocha');

const config = require('config');
const mongoose = require('mongoose');

const mongodbUrl = 'mongodb://' + config.get('mongodb.host') + ':' + config.get('mongodb.port') + '/' + config.get('mongodb.name');

describe('Test ending', function () {

    it('should delete the test database', function (done) {
        mongoose.connect(mongodbUrl, { useMongoClient: true }).then(
            () => {
                console.log(`Successfully delete the MongoDB Database at: ${mongodbUrl}`);
                mongoose.connection.db.dropDatabase();
                done();
            },
            err => console.log(`Error when deleting the MongoDB Database at: ${mongodbUrl}`)
        );
    });    

});