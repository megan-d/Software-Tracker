const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        //Match user
        try {
          await User.findOne({ email: email }, function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, {
                message: 'This email address is not registered.',
              });
            }
            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Incorrect password.' });
              }
            });
          });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
