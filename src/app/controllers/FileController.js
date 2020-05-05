import File from '../models/File';

class FileController {
  async store(req, res) {
    if (req.file) {
      const { originalname: nome, filename: path } = req.file;
      const file = await File.create({
        nome,
        path,
      });
      try {
        return res.json(file);
      } catch (err) {
        return res.status(400).json({
          err: 'Erro ao atualizar imagem. Tente novamente mais tarde',
        });
      }
    }
    return res.status(400).json({
      err: 'Selecione um arquivo para continuar.',
    });
  }
}

export default new FileController();
