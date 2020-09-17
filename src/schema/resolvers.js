import { User } from '../models/user.model';
import { Kelas } from '../models/kelas.model';
import { Jadwal } from '../models/jadwal.model';
import { Sekolah } from '../models/sekolah.model';

export const resolvers = {
  Query: {
    user: (_, { id }) => {
      return User.find({ id });
    },
    users: () => {
      return User.find();
    },

    kelas: (_, { id }) => {
      return Kelas.find({ id });
    },
    kelass: () => {
      return Kelas.find();
    },

    sekolah: (_, { id }) => {
      return Sekolah.find({ id });
    },
    sekolah: () => {
      return Sekolah.find();
    },

    jadwal: (_, { id }) => {
      return Jadwal.find({ id });
    },
    jadwals: () => {
      return Jadwal.find({});
    },
  },
  Mutation: {
    createUser: (_, data) => {
      const newUser = new User({ ...data });
      return newUser.save();
    },

    createKelas: (_, data) => {
      const newKelas = new Kelas({ ...data });
      return newKelas.save();
    },

    createSekolah: (_, data) => {
      const newSekolah = new Sekolah({ ...data });
      return newSekolah.save();
    },

    createJadwal: (_, data) => {
      const newJadwal = new Jadwal({
        id_jadwal: `${req.body.kelas}
                    -${req.body.jurusan}
                    -${req.body.rombel}
                    -${req.body.hari}
                    -${req.body.ruangan}
                    -${req.body.mapel}
                    -${req.body.mapel_ke}`,
        ...data,
      });
      return newJadwal.save();
    },
  },
};
