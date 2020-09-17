import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamps from 'mongoose-timestamp';

export const kelasValidation = (data) => {
  const schema = {
    nama_kelas: Joi.string()
      .min(6)
      .required(),
    key_kelas: Joi.string().required(),
    id_user: Joi.string(),
    sekolah: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

export const kelasSchema = new mongoose.Schema({
  nama_kelas: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  key_kelas: {
    type: String,
    lowercase: true,
    unique: true,
    required: false,
    index: true,
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  sekolah: {
    type: mongoose.Schema.Types.ObjectId,
    lowercase: true,
    unique: true,
    required: false,
    index: true,
  },
});

kelasSchema.plugin(timestamps);

kelasSchema.index({ createdAt: 1, updatedAt: 1 });

kelasSchema.plugin(uniqueValidator, { message: 'is already taken.' });

export const Kelas = mongoose.model('Kelas', kelasSchema, 'kelas');
