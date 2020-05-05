import * as Yup from 'yup';
import TicketsUpdatesFile from '../models/TicketsUpdatesFile';

class AnexoUpdateController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id_update: Yup.number('Formato inválido').required(
        'O campo é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    if (req.file) {
      const { id_update } = req.params;
      const { originalname: nome, filename: path, size: tamanho } = req.file;

      const re = /(?:\.([^.]+))?$/;
      const tipo = re.exec(nome)[1];

      const file = await TicketsUpdatesFile.create({
        id_update,
        path,
        nome,
        tipo,
        tamanho,
      });
      try {
        return res.json(file);
      } catch (err) {
        return res.status(400).json({
          err: 'Erro ao anexar arquivo. Tente novamente mais tarde',
        });
      }
    }
    return res.status(400).json({
      err: 'Selecione um arquivo para continuar.',
    });
  }
}

export default new AnexoUpdateController();
