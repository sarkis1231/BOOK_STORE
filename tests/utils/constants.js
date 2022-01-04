require('dotenv').config();

/**
 * @type {{
 *     MONGODB_URI:String,
 *     URL:String,
 *     USER_1_NAME:String,
 *     USER_1_PASSWORD:String,
 *     CLIENT_URL:String
 * }}
 * */
JEST_CONSTANTS = {
    MONGODB_URI: `mongodb://localhost:${process.env.MONGODB_PORT}`,
    USER_1_NAME:process.env.USER_1_NAME,
    USER_1_PASSWORD:process.env.USER_1_PASSWORD,
    CLIENT_URL:process.env.CLIENT_URL
};

module.exports = JEST_CONSTANTS;