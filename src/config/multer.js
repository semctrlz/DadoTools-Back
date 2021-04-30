import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export const destination = resolve(
  __dirname,
  '..',
  '..',
  'temp',
  'uploads',
  'avatar'
);

export default {
  storage: multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
