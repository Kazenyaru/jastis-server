import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamps from 'mongoose-timestamp';

export const sekolahValidation = (data) => {
  const schema = {
    nama_sekolah: Joi.string()
      .min(6)
      .required(),
    key_sekolah: Joi.string(),
    email_sekolah: Joi.string().email(),
    id_user: Joi.string(),
  };
  return Joi.validate(data, schema);
};

export const sekolahSchema = new mongoose.Schema({
  nama_sekolah: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  key_sekolah: {
    type: String,
    lowercase: true,
    unique: true,
    required: false,
    index: true,
  },
  email_sekolah: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
});

sekolahSchema.plugin(timestamps);

sekolahSchema.index({ createdAt: 1, updatedAt: 1 });

sekolahSchema.plugin(uniqueValidator, { message: 'is already taken.' });

export const Sekolah = mongoose.model('Sekolah', sekolahSchema, 'sekolah');
