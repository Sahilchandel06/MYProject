const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Load environment variables at the top
require('dotenv').config();

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// GitHub Strategy Configuration
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
      scope: ['user:email', 'repo']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('GitHub Profile:', profile); // Debug log

        // Check if user already exists in database
        let user = await User.findOne({ githubId: profile.id });
        
        if (user) {
          // Update existing user
          user.lastLogin = Date.now();
          user.accessToken = accessToken;
          await user.save();
          console.log('Existing user logged in:', user.username);
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
          avatarUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
          profileUrl: profile.profileUrl,
          accessToken: accessToken
        });

        console.log('New user created:', user.username);
        done(null, user);
      } catch (error) {
        console.error('Error in GitHub Strategy:', error);
        done(error, null);
      }
    }
  )
);

module.exports = passport;
