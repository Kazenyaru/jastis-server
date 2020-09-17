import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import uniqueValidator from 'mongoose-unique-validator';

export const jadwalValidation = (data) => {
  const schema = {
    id_jadwal: Joi.string().required(),
    hari: Joi.string().required(),
    mapel: Joi.string().required(),
    mapel_ke: Joi.number().required(),
    jam_awal: Joi.string().default(-1),
    jam_akhir: Joi.string().default(-2),
    semua_kelas: Joi.boolean().default(false),
    kelas: Joi.string(),
    ruangan: Joi.string().required(),
    keterangan: Joi.string(),
    id_user: Joi.required(),
    kelas: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

const jadwalSchema = new mongoose.Schema(
  {
    id_jadwal: {
      type: String,
      required: true,
      unique: true,
    },
    hari: {
      type: String,
      required: true,
    },
    mapel: {
      type: String,
      required: true,
    },
    mapel_ke: {
      type: Number,
      required: true,
    },
    jam_awal: {
      type: String,
    },
    jam_akhir: {
      type: String,
    },
    ruangan: {
      type: String,
      required: true,
    },
    ket: {
      type: String,
      required: false,
    },
    semua_kelas: {
      type: Boolean,
    },
    jam: {
      type: Array,
    },
    kelas: {
      type: Array,
    },
    guru: {
      type: Array,
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    sekolah: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

jadwalSchema.plugin(uniqueValidator, { message: 'is already taken.' });

export const Jadwal = mongoose.model('Jadwal', jadwalSchema, 'jadwal');
