import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'token not provide.' });
  }

  const [, token] = authHeader.split(' ');
  if (token === process.env.HASH_MASTER) {
    req.idUsuario = 1;
    return next();
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
    req.idUsuario = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }
};
