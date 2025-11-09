const express = require('express');
const passport = require('passport');
const router = express.Router();

// GitHub authentication route
router.get('/github',
  passport.authenticate('github', {
    scope: ['user:email', 'repo']
  })
);

// GitHub callback route with better error handling
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login/failed' }),
  (req, res) => {
    // Successful authentication, redirect to home with success flag
    res.redirect(`${process.env.FRONTEND_URL}/home?login=success`);
  }
);

// Login failed route
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'User failed to authenticate'
  });
});

// Check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        githubId: req.user.githubId,
        username: req.user.username,
        displayName: req.user.displayName,
        email: req.user.email,
        avatarUrl: req.user.avatarUrl,
        profileUrl: req.user.profileUrl
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user data
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
});

module.exports = router;
