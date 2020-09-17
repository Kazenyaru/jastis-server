import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export const eventValidation = (data) => {
  const schema = {
    nama_event: Joi.string().required(),
    keterangan: Joi.string()
      .min(6)
      .required(),
    tanggal: Joi.string().required(),
    jam_awal: Joi.string(),
    jam_akhir: Joi.string(),
    tempat: Joi.string().required(),
    berulang: Joi.string().default('none'),
    id_user: Joi.required(),
    semua_kelas: Joi.boolean().default(false),
    kelas: Joi.string(),
    sekolah: Joi.string().default('none'),
  };
  return Joi.validate(data, schema);
};

const eventSchema = new mongoose.Schema(
  {
    id_event: {
      type: String,
      unique: true,
    },
    nama_event: {
      type: String,
      required: true,
    },
    mapel: {
      type: String,
      required: true,
    },
    ket: {
      type: String,
      required: true,
    },
    tanggal: {
      type: String,
      required: true,
    },
    jam_awal: {
      type: String,
    },
    jam_akhir: {
      type: String,
    },
    tempat: {
      type: String,
      required: true,
    },
    berulang: {
      type: String,
      required: true,
    },
    semua_kelas: {
      type: Boolean,
    },
    kelas: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    sekolah: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

eventSchema.plugin(uniqueValidator, { message: 'is already taken.' });

export const Event = mongoose.model('Event', eventSchema, 'events');
