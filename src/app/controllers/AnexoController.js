import * as Yup from 'yup';
import { resolve } from 'path';

const fs = require('fs');

class AnexoController {
  async store(req, res) {
    const { originalname: nome, filename: path, size: tamanho } = req.file;

    const re = /(?:\.([^.]+))?$/;
    const tipo = re.exec(nome)[1];

    try {
      return res.json({
        sucesso: true,
        file: {
          nome,
          path,
          tamanho,
          tipo,
        },
      });
    } catch (err) {
      return res.json({
        sucesso: false,
        file: {},
      });
    }
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      nome_arquivo: Yup.string().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { nome_arquivo } = req.query;
    const file = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'temp',
      'uploads',
      'files',
      nome_arquivo
    );

    fs.unlink(file, (err) => {
      console.log(err);
    });

    return res.json({ resultado: 'ok' });
  }
}

export default new AnexoController();
