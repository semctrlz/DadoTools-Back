import { Op } from 'sequelize';
import * as Yup from 'yup';
import TicketsGrupos from '../models/TicketsGrupos';
import User from '../models/User';
import UserApp from '../models/UserApp';
import File from '../models/File';

class TicketsGruposController {
  async index(req, res) {
    const nivelNecessario = 1;

    const appUser = await UserApp.findAll({
      where: {
        [Op.and]: [
          { id_usuario: req.idUsuario },
          { id_app: 2 },
          { nivel: { [Op.gte]: nivelNecessario } },
        ],
      },
    });

    if (appUser.length === 0) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para acessar os grupos' });
    }

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao', 'created_at', 'updated_at'],
      include: [
        {
          model: User,
          as: 'criador_grupo',
          attributes: ['id', 'nome', 'sobrenome', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: User,
          as: 'componentes_grupo',
          attributes: ['id', 'nome', 'sobrenome', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(grupos);
  }

  async store(req, res) {
    // Nivel necessário para acessar o cadastro de grupos
    const nivelNecessario = 4;
    const schema = Yup.object().shape({
      nome: Yup.string('O campo nome deve ser do tipo string').required(
        'O campo nome é obrigatório'
      ),
      descricao: Yup.string('O campo descrição deve ser do tipo string'),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const appUser = await UserApp.findAll({
      where: {
        [Op.and]: [
          { id_usuario: req.idUsuario },
          { id_app: 2 },
          { nivel: { [Op.gte]: nivelNecessario } },
        ],
      },
    });

    if (appUser.length === 0) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para acessar esta rota' });
    }
    const { nome, descricao = '' } = req.body;
    const id_usuario = req.idUsuario;

    const { id } = await TicketsGrupos.create({
      nome,
      descricao,
      id_usuario,
    });

    const grupos = await TicketsGrupos.findByPk(id, {
      attributes: ['id', 'nome', 'descricao', 'created_at', 'updated_at'],
      include: [
        {
          model: User,
          as: 'criador_grupo',
          attributes: ['id', 'nome', 'sobrenome', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: User,
          as: 'componentes_grupo',
          attributes: ['id', 'nome', 'sobrenome', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(grupos);
  }
}

export default new TicketsGruposController();
