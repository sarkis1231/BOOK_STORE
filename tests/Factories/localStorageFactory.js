const {sign} = require("jsonwebtoken");
const JEST_CONSTANTS = require("../utils/constants");

/**
 * @description searches user with admin permission if not one creates it
 * @param payload {{
 *     id:String,
 *     name:String,
 *     role:String
 * }}
 * @return Promise<String>
 * */
module.exports = async function localStorageFactory(payload) {
    const token = await sign(payload, JEST_CONSTANTS.SECRET_KEY, {expiresIn: 3600});
    return `Bearer ${token}`;
}