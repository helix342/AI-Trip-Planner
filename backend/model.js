const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    createdTrips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
      },
    ],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

// LOGIN FUNCTION
async function loginUser(email, password) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  return user;
}

// REGISTER FUNCTION
async function regUser(username, email, password) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('Email already registered');
  }

  const newUser = new User({ username, email, password });
  await newUser.save();
  return newUser;
}

module.exports = {
  User,
  loginUser,
  regUser,
};
