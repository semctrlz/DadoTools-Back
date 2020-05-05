import * as Yup from 'yup';

import { Op } from 'sequelize';
import App from '../models/App';
import UserApp from '../models/UserApp';

class AppController {
  async index(req, res) {
    const apps = await App.findAll({});
    return res.json(apps);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().max(25).required(),
      descricao: Yup.string(255).required(),
      rota: Yup.string().min(3).max(15).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const rotaExiste = await App.findOne({
      where: {
        [Op.or]: [{ nome: req.body.nome }, { rota: req.body.rota }],
      },
    });

    if (rotaExiste) {
      return res.status(400).json({
        error:
          'Impossível criar esta rota. O nome da rota e o caminho da rota devem ser únicos.',
      });
    }

    const { id, nome, descricao, rota } = await App.create(req.body);

    await UserApp.create({
      id_usuario: req.idUsuario,
      id_app: id,
      nivel: { [Op.gte]: 4 },
    });

    return res.json({
      id,
      nome,
      descricao,
      rota,
    });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id_app: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Para deletar um app o nível deve ser maior ou iagual a 4
    const adminApp = await UserApp.findOne({
      where: {
        [Op.and]: [
          { id_usuario: req.idUsuario },
          { id_app: req.body.id_app },
          { nivel: { [Op.gte]: 4 } },
        ],
      },
    });

    if (!adminApp) {
      return res.status(401).json({
        message: 'Você precisa de acesso de administrador para deletar um APP.',
      });
    }

    App.destroy({
      where: {
        id: req.body.id_app,
      },
    });
    return res.json({ message: 'App deletado com sucesso!' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id_app: Yup.number().required(),
      nome: Yup.string().max(25).required(),
      descricao: Yup.string(255).required(),
      rota: Yup.string().min(3).max(15).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Para alterar um app o nível no App deve ser igual ou superior a 4
    const adminApp = await UserApp.findOne({
      where: {
        [Op.and]: [
          { id_usuario: req.idUsuario },
          { id_app: req.body.id_app },
          { nivel: { [Op.gte]: 4 } },
        ],
      },
    });

    if (!adminApp) {
      return res.status(401).json({
        message: 'Você precisa de acesso de administrador para alterar um APP.',
      });
    }

    await App.update(
      {
        nome: req.body.nome,
        descricao: req.body.descricao,
        rota: req.body.rota,
      },
      {
        where: { id: req.body.id_app },
      }
    );

    return res.json({
      id: req.body.id_app,
      nome: req.body.nome,
      descricao: req.body.descricao,
      rota: req.body.rota,
    });
  }
}

export default new AppController();
