import * as Yup from 'yup';
import Upload from '../schemas/Upload';

class UploadS3Controller {
  async store(req, res) {
    const { originalname: name, size, key, location: url = '' } = req.file;

    const post = await Upload.create({
      name,
      size,
      key,
      url,
    });

    res.json(post);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const upload = await Upload.findById(id);
    if (upload) {
      await upload.remove();
    }

    return res.send();
  }

  async index(req, res) {
    const uploads = await Upload.find({
      _id: [
        '5efb97ddd438fe850c1bf8d3',
        '5efb97bed438fe850c1bf8d2',
        '5efb9f37d438fe850c1bf8d4',
      ],
    });
    return res.json(uploads);
  }
}

export default new UploadS3Controller();
