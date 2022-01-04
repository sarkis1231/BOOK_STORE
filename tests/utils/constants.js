require('dotenv').config();

/**
 * @type {{
 *     MONGODB_URI:String,
 *     URL:String,
 *     USER_1_NAME:String,
 *     USER_1_PASSWORD:String
 * }}
 * */
JEST_CONSTANTS = {
    MONGODB_URI: `mongodb://localhost:${process.env.MONGODB_PORT}`,
    URL: process.env.CLIENT_URL,
    USER_1_NAME:process.env.USER_1_NAME,
    USER_1_PASSWORD:process.env.USER_1_PASSWORD
};

module.exports = JEST_CONSTANTS;