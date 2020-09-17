import moment from 'moment';

import { Jadwal, jadwalValidation } from '../models/jadwal.model';

const _ = undefined;

const arrayIsEmpty = (array) => {
  if (!array || !array.length) {
    return true;
  }
  return false;
};

const removeFalsy = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

const hari = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];

const harify = (data) => {
  let jadwals = [];
  for (let i = 0; i <= 5; i++) {
    let carded = [];
    carded[i] = data.filter((jadwal) => {
      return hari.indexOf(jadwal.hari) === i;
    });
    jadwals[i] = carded[i];
  }
  return jadwals;
};

export const get_jadwal = async (req, res) => {
  const params = removeFalsy({
    hari:
      req.query.hari === 'all'
        ? null
        : req.query.hari ||
          hari[
            moment()
              .utcOffset('+0700')
              .format('d') - 1
          ],
    mapel: req.query.mapel,
    mapel_ke: req.query.mapel,
    jam_awal: req.query.jam_awal,
    jam_akhir: req.query.jam_akhir,
    semua_kelas: req.query.semua_kelas,
    ruangan: req.query.ruangan,
    id_user: req.query.id_user,
    kelas: req.query.kelas,
    sekolah: req.query.sekolah,
  });

  const jam = Object.values(
    removeFalsy({
      jam_awal: req.query.jam_awal,
      jam_akhir: req.query.jam_akhir,
    })
  );
  const kelas = Object.values(
    removeFalsy({
      tingkat: req.query.tingkat,
      jurusan: req.query.jurusan,
      rombel: req.query.rombel,
    })
  );

  const search = {
    ...params,
  };

  if (!arrayIsEmpty(jam)) {
    search.jam = { $all: jam };
  } else if (!arrayIsEmpty(kelas)) {
    search.kelas = { $all: kelas };
  }

  Jadwal.find({
    ...search,
  })
    .then((jadwal) => {
      if (req.query.format === 'true') {
        return res.json(harify(jadwal));
      } else {
        return res.json(jadwal);
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

export const get_jadwalById = (req, res) => {
  Jadwal.findOne({
    id_jadwal: req.params.id,
  })
    .then((jadwal) => res.send(harify(jadwal)))
    .catch((error) => res.status(400).json({ error }));
};

export const create_jadwal = (req, res) => {
  const { error } = jadwalValidation(req.body); // ? Validation
  if (error) {
    console.log(error.details[0].message);
    return res.status(422).send(error.details[0].message);
  }

  const newJadwal = new Jadwal({
    id_jadwal: `${req.body.kelas}
      -${req.body.jurusan}
      -${req.body.rombel}
      -${req.body.hari}
      -${req.body.ruangan}
      -${req.body.mapel}
      -${req.body.mapel_ke}`,
    hari: req.body.hari,
    mapel: req.body.mapel,
    mapel_ke: req.body.mapel_ke,
    jam_awal: req.body.jam_awal,
    jam_akhir: req.body.jam_akhir,
    semua_kelas: req.body.semua_kelas,
    ruangan: req.body.ruangan,
    id_user: req.body.id_user,
    kelas: req.body.kelas,
    sekolah: req.body.sekolah,
  });

  newJadwal
    .save()
    .then(() => res.json('New Jadwal Added'))
    .catch((error) => res.status(400).json({ error }));
};

export const update_jadwal = (req, res) => {
  const { error } = jadwalValidation(req.body); // ? Validation
  if (error) {
    console.log(error.details[0].message);
    return res.status(422).send(error.details[0].message);
  }

  Jadwal.findOne({ id_jadwal: req.params.id })
    .then((jadwal) => {
      (jadwal.hari = req.body.hari),
        (hari = req.body.hari),
        (mapel = req.body.mapel),
        (mapel_ke = req.body.mapel_ke),
        (jam_awal = req.body.jam_awal),
        (jam_akhir = req.body.jam_akhir),
        (semua_kelas = req.body.semua_kelas),
        (ruangan = req.body.ruangan),
        (id_user = req.body.id_user),
        (kelas = req.body.kelas),
        (sekolah = req.body.sekolah);

      jadwal
        .save()
        .then(() => res.json('Jadwal Updated'))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

export const delete_jadwal = (req, res) => {
  Jadwal.findOneAndRemove({ id_jadwal: req.params.id })
    .then((jadwal) => res.json('Jadwal Deleted'))
    .catch((error) => res.status(400).json({ error }));
};
