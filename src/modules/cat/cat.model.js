const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  color: {
    type: String,
    default: "white",
    validate(value) {
      if (value == " ") throw new Error("A cat must have a color");
    }
  },
  category: {
    type: String,
    enum: ["wild", "domestic"],
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true,
    default: 1,
    validate(value) {
      if (value <= 0) throw new Error("A cat must have an age");
    }
  }
});

module.exports = mongoose.model("Cat", CatSchema);