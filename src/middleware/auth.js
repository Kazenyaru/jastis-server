import jwt from 'jsonwebtoken';

const TOKEN_SECRET = 'asddjasldjalkdasldjas';

export const auth = async (req, res, next) => {
  const token = await req.header('auth_token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = await jwt.verify(token, TOKEN_SECRET);
    req.user = await verified;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};

export const same_user = (req, res, next) => {
  if (req.user._id != req.params.id) {
    return res.status(401).json({ error: 'Access Denied' });
  }
  next();
};
