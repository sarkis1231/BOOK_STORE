const {sign} = require("jsonwebtoken");

/**
 * @description searches user with admin permission if not one creates it
 * @param userInfo {{
 *     id:String,
 *     name:String,
 *     role:String
 * }}
 * */
module.exports = async function localStorageFactory(userInfo) {
    const payload = userInfo;
}