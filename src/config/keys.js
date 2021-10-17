const MONGODB_URI = `mongodb://localhost:${process.env.MONGODB_PORT}/${process.env.DB_NAME}`;
const MONGOOSE_OPTIONS = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false};

const SECRET_KEY = process.env.SECRET_KEY;

const REDIS_URI = `redis://localhost:${process.env.REDIS_PORT}`;

module.exports = {MONGOOSE_OPTIONS, MONGODB_URI, SECRET_KEY, REDIS_URI}