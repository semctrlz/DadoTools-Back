import * as Yup from 'yup';
import { Op } from 'sequelize';

import App from '../models/App';
import UserApp from '../models/UserApp';

class UserAppController {
  async index(req, res) {
    // Com o ID do usuário, listar os apps em que ele está

    const retorno = await UserApp.findAll({
      where: {
        id_usuario: req.idUsuario,
      },
      attributes: ['nivel'],
      include: [
        {
          model: App,
          as: 'Apps',
          attributes: ['rota', 'nome', 'descricao'],
          required: false,
        },
      ],
    });

    return res.json(retorno);
  }

  async NivelApp(req, res) {
    const schema = Yup.object().shape({
      rota: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const retorno = await UserApp.findOne({
      where: {
        id_usuario: req.idUsuario,
      },
      attributes: ['nivel'],
      include: [
        {
          model: App,
          where: { rota: req.params.rota },
          as: 'Apps',
          attributes: ['rota', 'nome', 'descricao'],
          required: true,
        },
      ],
    });
    return res.json(retorno);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id_usuario: Yup.number().required(),
      id_app: Yup.number().required(),
      nivel: Yup.number().default(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verificar se o usuário que está fazendo a solicitação é admin do APP

    const userAdmin = await UserApp.findOne({
      where: {
        [Op.and]: [{ id_usuario: req.idUsuario }, { nivel: { [Op.gte]: 3 } }],
      },
    });

    if (!userAdmin) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para cadastrar usuários.' });
    }

    // Verifica se o usuario já está cadastrado no sistema
    const userToAdd = await UserApp.findOne({
      where: {
        [Op.and]: [
          { id_usuario: req.body.id_usuario },
          { id_app: req.body.id_app },
        ],
      },
    });

    if (userToAdd && userToAdd.nivel >= req.body.nivel) {
      return res.status(200).json({ error: 'Usuário Cadatrado.' });
    }

    if (!userToAdd) {
      // Se não existir, cadastra

      // Verificar se o app e o usuarios são validos
      const existeUser = await UserApp.findOne({
        where: {
          id: req.body.id_usuario,
        },
      });

      if (!existeUser) {
        return res
          .status(401)
          .json({ error: 'Usuário informado não existe. Verifique.' });
      }

      const existeApp = await App.findOne({
        where: {
          id: req.body.id_app,
        },
      });

      if (!existeApp) {
        return res
          .status(401)
          .json({ error: 'App informado não existe. Verifique.' });
      }

      const { id, id_usuario, id_app, nivel } = UserApp.create(req.body);
      return res.json({
        id,
        id_usuario,
        id_app,
        nivel,
      });
    }

    // se existir altera administração
    await UserApp.update(
      {
        nivel: req.body.nivel,
      },
      {
        where: { id_usuario: userToAdd.id },
      }
    );

    const { id_usuario, id_app, nivel } = req.body;
    return res.json({
      id_usuario,
      id_app,
      nivel,
    });
  }
}

export default new UserAppController();
