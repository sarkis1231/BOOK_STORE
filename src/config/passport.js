const {SECRET_KEY} =  require("./keys");
const passport_jwt = require("passport-jwt");
const {Users} = require("../models/Users");

const JwtStrategy = passport_jwt.Strategy;
const ExtractJwtStrategy = passport_jwt.ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwtStrategy.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

function passportConfig(passport) {
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await Users.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            done(null, false);
        } catch (e) {
            console.log(e);
        }

    }));
}
module.exports = passportConfig;