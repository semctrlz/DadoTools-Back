import { Router } from 'express';
import multer from 'multer';

import UploadS3Controller from '../app/controllers/UploadS3Controller';

import multerS3 from '../config/multerS3';

const uploadS3 = multer(multerS3);
const routes = new Router();

routes.post('/', uploadS3.single('file'), UploadS3Controller.store);
routes.delete('/:id', UploadS3Controller.delete);
routes.get('/', UploadS3Controller.index);

module.exports = routes;
