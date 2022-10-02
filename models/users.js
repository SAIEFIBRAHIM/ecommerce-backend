const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const validator = require("validator");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username field is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: [true, "password field is required"],
  },
  first_name: {
    type: String,
    required: [true, "fist_name field is required"],
  },
  last_name: {
    type: String,
    required: [true, "last_name field is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
    required: [true, "gender field is required"],
  },
  phone: {
    type: Number,
    required: [true, "phone field is required"],
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: "Address",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});
UserSchema.pre("save", function (next) {
  var User = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(User.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        User.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
