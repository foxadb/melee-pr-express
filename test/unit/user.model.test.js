const chai = require('chai');
const assert = chai.assert;

const User = require('../../models/user.model');

describe('UserModel', function () {

    describe('#comparePassword', async function () {
        
        it('correct password: should return true', async function () {
            let user = new User({
                username: "dolphin",
                password: "abcd1234",
                role: "admin"
            });
            await user.hashPassword();
            let result = await user.comparePassword('abcd1234');
            assert.isTrue(result, "[message]");
        });

        it('wrong password: should return false', async function () {
            let user = new User({
                username: "dolphin",
                password: "abcd1234",
                role: "admin"
            });
            await user.hashPassword();
            let result = await user.comparePassword('fijk5678');
            assert.equal(result, false);
        });
    
    });

});