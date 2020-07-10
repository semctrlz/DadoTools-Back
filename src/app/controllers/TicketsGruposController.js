import { Op } from 'sequelize';
import * as Yup from 'yup';
import TicketsGrupos from '../models/TicketsGrupos';
import User from '../models/User';
import File from '../models/File';
import UserApp from '../models/UserApp';
import Ticket from '../models/Ticket';
import AvaliacaoTicket from '../models/AvaliacaoTicket';

import GrupoUserTicket from '../models/GrupoUserTicket';

class TicketsGruposController {
  async index(req, res) {
    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      include: [
        {
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
          include: {
            model: User,
            as: 'user_grupo',
            attributes: ['id', 'nome', 'sobrenome', 'email'],
            required: false,
            include: {
              model: File,
              as: 'avatar',
              attributes: ['url', 'nome', 'path'],
              required: false,
            },
          },
        },
      ],
    });

    return res.json(grupos);
  }

  async owner(req, res) {
    const schema = Yup.object().shape({
      data_inicial: Yup.date().required(),
      data_final: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const idGrupos = await GrupoUserTicket.findAll({
      where: {
        [Op.and]: [{ id_usuario: req.idUsuario }, { nivel: 3 }],
      },
      attributes: ['id_grupo'],
    });

    const ids = [];
    idGrupos.forEach((idg) => {
      ids.push(idg.id_grupo);
    });

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      where: { id: ids },
      include: [
        {
          where: {
            [Op.not]: [{ id_usuario: req.idUsuario }],
          },
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
          include: {
            model: User,
            as: 'user_grupo',
            attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],

            required: false,
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['url', 'nome', 'path'],
                required: false,
              },
            ],
          },
        },
      ],
    });

    const idsUsuarios = [];

    grupos.forEach((g) => {
      g.componentes.forEach((c) => {
        if (!idsUsuarios.includes(c.user_grupo.id)) {
          idsUsuarios.push(c.user_grupo.id);
        }
      });
    });

    const abertos = await User.findAll({
      attributes: ['id', 'nome'],
      where: { id: idsUsuarios },
      include: [
        {
          model: Ticket,
          where: { status: 'I' },
          attributes: ['id', 'status', 'prazo', 'vencido'],
          as: 'destinatario',
          required: false,
        },
        {
          model: Ticket,
          where: { status: 'I' },
          attributes: ['id', 'status', 'prazo', 'vencido'],
          as: 'criador',
          required: false,
        },
      ],
    });

    const concludes = await User.findAll({
      attributes: ['id', 'nome'],
      where: { id: idsUsuarios },
      include: [
        {
          model: Ticket,
          where: {
            [Op.and]: [
              {
                updated_at: {
                  [Op.between]: [req.body.data_inicial, req.body.data_final],
                },
              },
              {
                [Op.or]: [{ status: 'F' }, { status: 'S' }],
              },
            ],
          },
          attributes: ['id', 'status', 'prazo'],
          as: 'destinatario',
          required: false,
          include: [
            {
              model: AvaliacaoTicket,
              as: 'avaliacao',
              attributes: ['nota'],
              required: false,
            },
          ],
        },
        {
          model: Ticket,
          where: {
            [Op.or]: [{ status: 'F' }, { status: 'S' }],
          },
          attributes: ['id', 'status', 'prazo'],
          as: 'criador',
          required: false,
        },
      ],
    });

    const agrupamentos = [];

    grupos.forEach((gr) => {
      const comp = [];
      gr.componentes.forEach((com) => {
        comp.push({
          id: com.user_grupo.id,
          nome: com.user_grupo.nome,
          sobrenome: com.user_grupo.sobrenome,
          cargo: com.user_grupo.cargo,
          avatar: com.user_grupo.avatar && com.user_grupo.avatar.url,
          inbox: abertos.filter((a) => {
            return a.id === com.user_grupo.id;
          })[0].destinatario,
          enviados: abertos.filter((a) => {
            return a.id === com.user_grupo.id;
          })[0].criador,
          concluidos: concludes.filter((a) => {
            return a.id === com.user_grupo.id;
          })[0].criador,
          historico: concludes.filter((a) => {
            return a.id === com.user_grupo.id;
          })[0].destinatario,
        });
      });

      agrupamentos.push({
        id: gr.id,
        nome: gr.nome,
        descricao: gr.descricao,
        componentes: comp,
      });
    });
    return res.json(agrupamentos);
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

    await TicketsGrupos.create({
      nome,
      descricao,
      id_usuario: req.idUsuario,
    });

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      include: [
        {
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
          include: {
            model: User,
            as: 'user_grupo',
            attributes: ['id', 'nome', 'sobrenome', 'email'],
            required: false,
            include: {
              model: File,
              as: 'avatar',
              attributes: ['url', 'nome', 'path'],
              required: false,
            },
          },
        },
      ],
    });

    return res.json(grupos);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string('O campo nome deve ser do tipo string').required(
        'O campo nome é obrigatório'
      ),
      descricao: Yup.string('O campo descrição deve ser do tipo string'),
      id: Yup.number('O campo id deve ser do tipo inteiro'),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await TicketsGrupos.update(req.body, { where: { id: req.body.id } });

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      include: [
        {
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
          include: {
            model: User,
            as: 'user_grupo',
            attributes: ['id', 'nome', 'sobrenome', 'email'],
            required: false,
            include: {
              model: File,
              as: 'avatar',
              attributes: ['url', 'nome', 'path'],
              required: false,
            },
          },
        },
      ],
    });

    return res.json(grupos);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number('O campo id deve ser do tipo inteiro'),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await TicketsGrupos.destroy({ where: { id: req.query.id } });

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      include: [
        {
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: true,
        },
      ],
    });

    return res.json(grupos);
  }

  async addMembers(req, res) {
    const schema = Yup.object().shape({
      id_usuario: Yup.number(
        'O campo grupo deve ser do tipo numerico'
      ).required('O campo grupo é pbrigatório'),
      id_grupo: Yup.number('O campo grupo deve ser do tipo numerico').required(
        'O campo grupo é pbrigatório'
      ),
      nivel: Yup.number('O campo grupo deve ser do tipo numerico').required(
        'O campo grupo é pbrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await GrupoUserTicket.create(req.body);

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      include: [
        {
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
          include: {
            model: User,
            as: 'user_grupo',
            attributes: ['id', 'nome', 'sobrenome', 'email'],
            required: false,
            include: {
              model: File,
              as: 'avatar',
              attributes: ['url', 'nome', 'path'],
              required: false,
            },
          },
        },
      ],
    });

    return res.json(grupos);
  }

  async removeMembers(req, res) {
    const schema = Yup.object().shape({
      id_usuario: Yup.number(
        'O campo grupo deve ser do tipo numerico'
      ).required('O campo grupo é pbrigatório'),
      id_grupo: Yup.number('O campo grupo deve ser do tipo numerico').required(
        'O campo grupo é pbrigatório'
      ),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await GrupoUserTicket.destroy({
      where: {
        id_usuario: req.query.id_usuario,
        id_grupo: req.query.id_grupo,
      },
    });

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      include: [
        {
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
          include: {
            model: User,
            as: 'user_grupo',
            attributes: ['id', 'nome', 'sobrenome', 'email'],
            required: false,
            include: {
              model: File,
              as: 'avatar',
              attributes: ['url', 'nome', 'path'],
              required: false,
            },
          },
        },
      ],
    });

    return res.json(grupos);
  }

  async updateMember(req, res) {
    const schema = Yup.object().shape({
      id_usuario: Yup.number(
        'O campo grupo deve ser do tipo numerico'
      ).required('O campo grupo é pbrigatório'),
      id_grupo: Yup.number('O campo grupo deve ser do tipo numerico').required(
        'O campo grupo é pbrigatório'
      ),
      nivel: Yup.number('O campo grupo deve ser do tipo numerico').required(
        'O campo grupo é pbrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await GrupoUserTicket.update(
      { nivel: req.body.nivel },
      {
        where: {
          id_grupo: req.body.id_grupo,
          id_usuario: req.body.id_usuario,
        },
      }
    );

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      include: [
        {
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
          include: {
            model: User,
            as: 'user_grupo',
            attributes: ['id', 'nome', 'sobrenome', 'email'],
            required: false,
            include: {
              model: File,
              as: 'avatar',
              attributes: ['url', 'nome', 'path'],
              required: false,
            },
          },
        },
      ],
    });

    return res.json(grupos);
  }
}

export default new TicketsGruposController();
