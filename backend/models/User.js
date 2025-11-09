const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,  // Fixed typo: was "tyep"
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  profileUrl: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
