import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { statusType, response } from '../helper/response.helper';

const _ = undefined;

import {
  User,
  registerValidation,
  loginValidation,
} from '../models/user.model'; // ? INFO JWT Validation and User Model

export const get_user = (req, res) => {
  User.find({}, { password: 0 })
    .then((user) => res.json(response(statusType.success, _, user)))
    .catch((erroror) => res.status(401).json(response(_, error)));
};

export const get_userById = (req, res) => {
  User.findById(req.params.id, { password: 0 })
    .then((user) => res.json(response(statusType.success, _, user)))
    .catch((error) => res.status(401).json(response(_, error)));
};

export const login_user = async (req, res) => {
  const { error } = loginValidation(req.body); // ? Validation
  console.log(req.body);
  if (error) {
    return res.status(422).send(response(_, error.details[0].message));
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(422).json(response(_, 'Email is not found'));
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(422).json(response(_, 'Invalid Password'));
  } // ? END Validation

  const payload = {
    // ? JWT Token
    _id: user._id,
    username: user.username,
    email: user.email,
    school: user.school,
    level: user.level,
  };
  let token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 3600 * 12,
  });
  res
    .header('auth_token', token)
    .json(response(statusType.success, 'Login Success', token)); // ? END JWT TOKEN
};

export const create_user = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(response(_, error.details[0].message));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });

  try {
    const savedUser = await newUser.save();
    res.send(response(statusType.success, 'Register Success', savedUser._id));
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const update_user = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = User.findById(req.params.id)
    .then((user) => {
      (user.username = req.body.username),
        (user.email = req.body.email),
        (user.password = hashedPassword),
        (user.role = req.body.role);

      user
        .save()
        .then(() => res.json(response(_, 'User Updated')))
        .catch((error) => res.status(400).json(response(_, error)));
    })
    .catch((error) => res.status(400).json(response(_, error)));

  const payload = {
    // ? JWT Token
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  let token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 3600 * 12,
  });
  res
    .header('auth_token', token)
    .json(response(statusType.success, 'Update User Sucess', token));
};

export const delete_user = (req, res) => {
  User.findByIdAndDelete(req.params.id).then((user) =>
    res
      .json(response(statusType.success, 'User Deleted'))
      .catch((error) => res.status(400).json(response(_, error)))
  );
};
