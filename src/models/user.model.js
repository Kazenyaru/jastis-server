import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamps from 'mongoose-timestamp';

export const registerValidation = (data) => {
  const schema = {
    username: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    role: Joi.string().default('user'),
  };
  return Joi.validate(data, schema);
};

export const loginValidation = (data) => {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  };
  return Joi.validate(data, schema);
};

export const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [
      /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/,
      'is invalid',
    ],
    index: true,
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  sekolah: {
    type: String,
    required: false,
  },
  kelas: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'user',
  },
});

userSchema.plugin(timestamps);

userSchema.index({ createdAt: 1, updatedAt: 1 });

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

export const User = mongoose.model('Users', userSchema, 'users');
