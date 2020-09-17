import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    user: User!
    users: [User!]!

    kelas: Kelas!
    kelass: [Kelas!]!

    sekolah: Sekolah!
    sekolahs: [Sekolah!]!

    jadwal: Jadwal!
    jadwals: [Jadwal!]!

    event: Event!
    events: [Event!]!
  }

  type Mutation {
    createUser(
      fullname: String!
      username: String!
      email: String!
      password: String!
      sekolah: String
      kelas: String
      role: String
    ): User!

    createKelas(
      nama_kelas: String!
      key_kelas: String
      id_user: ID!
      sekolah: ID
    ): Kelas!

    createSekolah(
      nama_sekolah: String!
      key_sekolah: String
      email_sekolah: String!
      id_user: ID!
    ): Sekolah!

    createJadwal(
      hari: String!
      mapel: String!
      mapel_ke: Int
      jam_awal: String
      jam_akhir: String
      semua_kelas: Boolean
      kelas: String!
      id_user: String!
      sekolah: String!
    ): Jadwal!

    # createJadwal(
    #     hari: String!
    #     mapel: String!
    #     mapel_ke: Int
    #     jam_awal: String
    #     jam_akhir: String
    #     semua_kelas: Boolean
    #     kelas: String!
    #     id_user: String!
    #     sekolah: String!
    # ): Jadwal!
  }

  type User {
    id: ID!
    fullname: String!
    username: String!
    email: String!
    password: String!
    sekolah: Sekolah
    kelas: Kelas
    role: String
  }

  type Kelas {
    id: ID!
    nama_kelas: String!
    key_kelas: String
    wakel: User
    sekolah: ID!
  }

  type Sekolah {
    id: ID!
    nama_sekolah: String!
    key_sekolah: String
    email_sekolah: String!
    kepsek: User!
  }

  type Jadwal {
    id: ID
    hari: String!
    mapel: String!
    mapel_ke: Int
    jam_awal: String
    jam_akhir: String
    semua_kelas: Boolean
    id_user: String!
    kelas: String!
  }

  type Event {
    id_event: ID
    nama_event: String!
    keterangan: String!
    tanggagal: String!
    mapel: String!
    jam_awal: String
    jam_akhir: String
    berulang: Boolean
    semua_kelas: Boolean
    id_user: String!
    kelas: String
    sekolah: String
  }
`;
