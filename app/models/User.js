var mongoose = require('../../app.js').db,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// User Model
var UserSchema = new Schema({
  user_id: ObjectId,
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  permissions: Object
});

UserSchema.pre('save', function (next) {
  var user = this;

  // Only hash password if new or modified
  if (!user.isModified('password')) return next();

  // Generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // Hash password with new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // Override text password with hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);