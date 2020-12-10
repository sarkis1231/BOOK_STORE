const MONGODB_URI = `mongodb://localhost:${process.env.MONGODB_PORT}/${process.env.DB_NAME}`;
const MONGOOSE_OPTIONS = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false};
exports = {MONGOOSE_OPTIONS, MONGODB_URI}