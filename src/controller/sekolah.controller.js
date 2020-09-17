import { Sekolah, sekolahValidation } from '../models/sekolah.model'; // ? INFO JWT Validation and Sekolah Model

export const get_sekolah = (req, res) => {
  Sekolah.find()
    .then((sekolah) => res.json(sekolah))
    .catch((error) => res.status(401).json({ error }));
};

export const get_sekolahById = (req, res) => {
  Sekolah.findById(req.params.id)
    .then((sekolah) => res.json(sekolah))
    .catch((error) => res.status(401).json({ error }));
};

export const create_sekolah = async (req, res) => {
  const { error } = sekolahValidation(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  const newSekolah = new Sekolah({
    nama_sekolah: req.body.sekolahname,
    key_sekolah: req.body.email,
    email_sekolah: req.body.email_sekolah,
  });

  try {
    const savedSekolah = await newSekolah.save();
    res.send({ msg: 'Registered, Login Please', sekolah: savedSekolah._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const update_sekolah = async (req, res) => {
  const sekolah = Sekolah.findById(req.params.id)
    .then((sekolah) => {
      (sekolah.nama_sekolah = req.body.nama_sekolah),
        (sekolah.key_sekolah = req.body.key_sekolah),
        (sekolah.sekolah = req.body.email_sekolah);

      sekolah
        .save()
        .then(() => res.json('msg', 'Sekolah Updated'))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

export const delete_sekolah = (req, res) => {
  Sekolah.findByIdAndDelete(req.params.id)
    .then((sekolah) => res.json('Sekolah Deleted'))
    .catch((error) => res.status(400).json({ error }));
};
