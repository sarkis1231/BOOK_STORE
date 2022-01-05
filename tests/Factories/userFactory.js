const JEST_FN = require("../utils/functions");
const JEST_CONSTANTS = require("../utils/constants");
const {Users} = require("../../src/models/Users");
const {USER_ROLES} = require("../../src/roles");

/**
 * @description searches user with admin permission if not one creates it
 * @return Promise<{{
 *     id:String,
 *     name:String,
 *     role:String
 * }}>
 * */
module.exports = async function userFactory() {
    let user = null;
    user = await Users.findOne({role:'admin'});

    if(!user) {
        const name = JEST_FN.getUniqueStr();
        const email = `${name}@testingMail.com`;
        const user = new Users({
            name: name,
            email: email,
            password: JEST_CONSTANTS.USER_TEST_DEFAULT_PASSWORD,
            role: USER_ROLES.Admin
        });
        await user.save();
    }

    return {
        id: user._id,
        name: user.name,
        role: user.role
    };
}