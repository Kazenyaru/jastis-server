import { Kelas, kelasValidation } from '../models/kelas.model';

export const get_kelas = (req, res) => {
  Kelas.find()
    .then((kelas) => res.json(kelas))
    .catch((error) => res.status(401).json({ error }));
};

export const get_kelasById = (req, res) => {
  Kelas.findById(req.params.id)
    .then((kelas) => res.json(kelas))
    .catch((error) => res.status(401).json({ error }));
};

export const create_kelas = async (req, res) => {
  const { error } = kelasValidation(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  const newKelas = new Kelas({
    nama_kelas: req.body.kelasname,
    key_kelas: req.body.email,
    sekolah: req.body.sekolah,
  });

  try {
    const savedKelas = await newKelas.save();
    res.send({ msg: 'Registered, Login Please', kelas: savedKelas._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const update_kelas = async (req, res) => {
  const kelas = Kelas.findById(req.params.id)
    .then((kelas) => {
      (kelas.nama_kelas = req.body.nama_kelas),
        (kelas.key_kelas = req.body.key_kelas),
        (kelas.sekolah = req.body.sekolah);

      kelas
        .save()
        .then(() => res.json('msg', 'Kelas Updated'))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

export const delete_kelas = (req, res) => {
  Kelas.findByIdAndDelete(req.params.id)
    .then((kelas) => res.json('Kelas Deleted'))
    .catch((error) => res.status(400).json({ error }));
};
