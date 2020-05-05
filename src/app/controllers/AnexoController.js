import * as Yup from 'yup';
import TicketsFile from '../models/TicketsFile';

class AnexoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id_ticket: Yup.number('Formato inválido').required(
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
      const { id_ticket } = req.params;
      const { originalname: nome, filename: path, size: tamanho } = req.file;

      const re = /(?:\.([^.]+))?$/;
      const tipo = re.exec(nome)[1];

      const file = await TicketsFile.create({
        id_ticket,
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

export default new AnexoController();
