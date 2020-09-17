import { Event, eventValidation } from '../models/event.model';

export const get_event = (req, res) => {
  const params = [
    { nama_event: req.query.nama_event },
    { tanggal: req.query.tanggal },
    { mapel: req.query.mapel },
    { jam_awal: req.query.jam_awal },
    { jam_akhir: req.query.jam_akhir },
    { semua_kelas: req.query.jam_akhir },
    { kelas: req.query.kelas },
    { jurusan: req.query.jurusan },
    { rombel: req.query.rombel },
    { berulang: req.query.rombel },
    { id_user: req.query.id_user },
    { ruangan: req.query.ruangan },
    { sekolah: req.query.sekolah },
  ];

  const paramsFiltered = params.filter((data) => {
    let type = Object.values(data).toString();
    return type !== '';
  });

  let object = paramsFiltered.reduce(
    (obj, item) => (
      (obj[Object.keys(item)] = Object.values(item).toString()), obj
    ),
    {}
  );

  Event.find(object)
    .then((jadwal) => res.json(jadwal))
    .catch((erroror) => res.status(400).json({ error }));
};

export const get_eventById = (req, res) => {
  Event.findOne({ id_event: req.params.id })
    .then((event) => res.json(event))
    .catch((erroror) => res.status(400).json({ error }));
};

export const create_event = (req, res) => {
  const { error } = eventValidation(req.body); // ? Validation
  if (error) {
    console.log(error.details[0].message);
    return res.status(422).send(error.details[0].message);
  }

  const newEvent = new Event({
    id_event: `${req.body.kelas}
      -${req.body.jurusan}
      -${req.body.rombel}
      -${req.body.tanggal}
      -${req.body.tempat}
      -${req.body.mapel}
      -${req.body.nama_event}`,
    nama_event: req.body.nama_event,
    tanggal: req.body.tanggal,
    mapel: req.body.mapel,
    jam_awal: req.body.jam_awal,
    jam_akhir: req.body.jam_akhir,
    semua_kelas: req.body.semua_kelas,
    tempat: req.body.tempat,
    berulang: req.body.berulang,
    id_user: req.body.id_user,
    kelas: req.body.kelas,
    sekolah: req.body.sekolah,
  });

  newEvent
    .save()
    .then(() => res.json('New Event Added'))
    .catch((erroror) => res.status(400).json({ error }));
};

export const update_event = (req, res) => {
  const { error } = eventValidation(req.body); // ? Validation
  if (error) {
    console.log(error.details[0].message);
    return res.status(422).send(error.details[0].message);
  }

  Event.findOne({ id_event: req.params.id })
    .then((event) => {
      (event.id_event = `${req.body.kelas}
          -${req.body.jurusan}
          -${req.body.rombel}
          -${req.body.tanggal}
          -${req.body.tempat}
          -${req.body.mapel}
          -${req.body.nama_event}`),
        (nama_event = req.body.nama_event),
        (tanggal = req.body.tanggal),
        (mapel = req.body.mapel),
        (jam_awal = req.body.jam_awal),
        (jam_akhir = req.body.jam_akhir),
        (semua_kelas = req.body.semua_kelas),
        (kelas = req.body.kelas),
        (jurusan = req.body.jurusan),
        (rombel = req.body.rombel),
        (tempat = req.body.tempat),
        (berulang = req.body.berulang),
        (id_user = req.body.id_user),
        (sekolah = req.body.sekolah);

      event
        .save()
        .then(() => res.json('Event Updated'))
        .catch((erroror) => res.status(400).json({ error }));
    })
    .catch((erroror) => res.status(400).json({ error }));
};

export const delete_event = (req, res) => {
  Event.findOneAndRemove({ id_event: req.params.id })
    .then((event) => res.json('Event Deleted'))
    .catch((erroror) => res.status(400).json({ error }));
};
