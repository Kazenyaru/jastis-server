'use strict';

import { scheduleJob } from 'node-schedule';
import sharedsession from 'express-socket.io-session';
import moment from 'moment';

import { Jadwal } from '../models/jadwal.model';
import * as dataKelas from '../ruang.json';

import { statusType, response } from '../helper/response.helper';

const _ = undefined;
const bookedKelas = {};

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const hari = ['senin', 'selasa', 'rabu', 'kamis', "jum'at"];

const getEmptyClass = async () => {
  console.log('Getting empty class...');
  const hariIni =
    hari[
      moment()
        .utcOffset('+0700')
        .format('d') - 1
    ];
  const jadwalHariIni = await Jadwal.find({ hari: hariIni });
  const kelasBerlangsung = [];
  const jadwalBerlangsung = jadwalHariIni.filter((data) => {
    const sekarang = moment().utcOffset('+0700');
    const jamAwal = moment(data.jam[2], 'HH:mm');
    const jamAkhir = moment(data.jam[3], 'HH:mm');
    const berlangsung =
      sekarang.isAfter(jamAwal, 'minutes') &&
      sekarang.isBefore(jamAkhir, 'minutes');
    if (berlangsung) {
      if (data.ruangan) {
        kelasBerlangsung.push(data.ruangan);
      }
    }
    return berlangsung;
  });
  const semuaKelas = dataKelas.data.map((data) => data.ruang);
  const kelasKosong = semuaKelas.filter(
    (data) => !kelasBerlangsung.includes(data)
  );
  return { kelasKosong, kelasBerlangsung };
};

const kelasKosongCallback = async () => {
  const { kelasKosong, kelasBerlangsung } = await getEmptyClass();
  return {
    kelas_kosong: shuffle(kelasKosong),
    kelas_berlangsung: kelasBerlangsung,
  };
};

export const connectSocket = (app, io, mongoStore) => {
  io.use(sharedsession(mongoStore));

  request_kelas(app, io);

  io.on('connection', (socket) => {
    socket.emit(
      'serverMessage',
      `Connected on server time: ${moment().utcOffset('+0700')}`
    );

    socket.on('requestKelas', (data, callback) => {
      const userId = data.user_id;
      const kelas = data.query.kelas;

      if (true) {
        socket.emit(
          'getRequestKelas',
          response(_, "Can't request the Class, Class has booked")
        );
      } else {
        // { userId, kelas };
        // 1000 * 60 * 45;
        emitKelasKosong(io);
        socket.emit(
          'getRequestKelas',
          response(statusType.success, `Success, Kelas has booked by ${userId}`)
        );
      }
    });
  });

  let j = scheduleJob('*/10 * * * * *', () => {
    emitKelasKosong(io);
  });
};

export const emitKelasKosong = async (io) => {
  io.sockets.emit('listenForEmptyClassRoom', await kelasKosongCallback(io));
};

export const request_kelas = async (app, io) => {
  app.get('/api/v1/kelas/request', async (req, res) => {
    const userId = req.query.user_id;
    const kelas = req.query.kelas;

    if (true) {
      return res
        .status(401)
        .json(response(_, "Can't request the Class, Class has booked"));
    } else {
      // { userId, kelas };
      // 1000 * 60 * 45;
      emitKelasKosong(io);
      return res
        .status(200)
        .json(
          response(statusType.success, `Success, Kelas has booked by ${userId}`)
        );
    }
  });
};
