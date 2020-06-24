import * as Yup from 'yup';
import { Op } from 'sequelize';

import Ticket from '../models/Ticket';
import TicketsFile from '../models/TicketsFile';
import TicketsFormatado from '../models/TicketsFormatado';
import User from '../models/User';
import File from '../models/File';
import TicketsUpdates from '../models/TicketsUpdates';
import TicketsUpdatesFormatados from '../models/TicketsUpdatesFormatados';
import AvaliacaoTicket from '../models/AvaliacaoTicket';
import EncerramentoTicket from '../models/EncerramentoTicket';
import TicketsUpdatesFile from '../models/TicketsUpdatesFile';
import TicketsGrupos from '../models/TicketsGrupos';
import GrupoUserTicket from '../models/GrupoUserTicket';

class UserTicketsController {
  async inbox(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const idGrupos = await GrupoUserTicket.findAll({
      where: {
        [Op.and]: [{ id_usuario: req.idUsuario }, { nivel: { [Op.gte]: 3 } }],
      },
      attributes: ['id_grupo'],
    });

    const ids = [];
    idGrupos.forEach((idg) => {
      ids.push(idg.id_grupo);
    });

    // Verificar se o usuário que está solicitando é gestor do usuário solicitado

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      where: { id: ids },
      include: [
        {
          where: {
            id_usuario: req.params.id,
          },
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
        },
      ],
    });

    if (grupos.length === 0) {
      return res.json({ error: 'Não tem acesso' });
    }

    // Lista os tickets, anexos, texto formatado, criador e destinatário
    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: [
          {
            id_destinatario: req.params.id,
          },
          {
            status: 'I',
          },
        ],
      },
      order: ['categoria'],
      include: [
        {
          model: User,
          as: 'criador',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
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
          as: 'destinatario',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFormatado,
          as: 'formatado',
          required: false,
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: TicketsUpdates,
          order: [['createdAt', 'DESC']],
          as: 'updates',
          required: true,
          separate: true,
          include: [
            {
              model: User,
              as: 'criador_update',
              required: false,
              attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'nome', 'path', 'url'],
                },
              ],
            },
            {
              model: TicketsUpdatesFormatados,
              as: 'update_formatado',
              required: false,
            },
            {
              model: TicketsUpdatesFile,
              as: 'anexos_update',
              required: false,
            },
          ],
        },
      ],
    });

    const usuario = await User.findByPk(req.params.id, {
      attributes: ['nome', 'sobrenome'],
    });

    return res.json({ tickets, usuario });
  }

  async get_received(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const tickets = await Ticket.findOne({
      where: {
        [Op.and]: [
          {
            id: req.params.id,
          },
          {
            id_destinatario: req.params.id,
          },
          { status: 'I' },
        ],
      },
      include: [
        {
          model: User,
          as: 'criador',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
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
          as: 'destinatario',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFormatado,
          as: 'formatado',
          required: false,
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: TicketsUpdates,
          order: [['createdAt', 'DESC']],
          as: 'updates',
          required: true,
          separate: true,
          include: [
            {
              model: User,
              as: 'criador_update',
              required: false,
              attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'nome', 'path', 'url'],
                },
              ],
            },
            {
              model: TicketsUpdatesFormatados,
              as: 'update_formatado',
              required: false,
            },
            {
              model: TicketsUpdatesFile,
              as: 'anexos_update',
              required: false,
            },
          ],
        },
      ],
    });
    if (tickets) {
      const usuario = await User.findByPk(req.params.id, {
        attributes: ['nome', 'sobrenome'],
      });

      return res.json({ tickets, usuario });
    }
    return res.status(401).json({
      message: 'Não existe ticket com este número. Verifique.',
    });
  }

  async enviados(req, res) {
    // Lista os tickets, anexos, texto formatado, criador e destinatário
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const idGrupos = await GrupoUserTicket.findAll({
      where: {
        [Op.and]: [{ id_usuario: req.idUsuario }, { nivel: { [Op.gte]: 3 } }],
      },
      attributes: ['id_grupo'],
    });

    const ids = [];
    idGrupos.forEach((idg) => {
      ids.push(idg.id_grupo);
    });

    // Verificar se o usuário que está solicitando é gestor do usuário solicitado

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      where: { id: ids },
      include: [
        {
          where: {
            id_usuario: req.params.id,
          },
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
        },
      ],
    });

    if (grupos.length === 0) {
      return res.json({ error: 'Não tem acesso' });
    }

    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: [
          {
            id_usuario: req.params.id,
          },
          {
            status: 'I',
          },
        ],
      },
      order: ['categoria'],
      include: [
        {
          model: User,
          as: 'criador',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
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
          as: 'destinatario',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFormatado,
          as: 'formatado',
          required: false,
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: TicketsUpdates,
          order: [['createdAt', 'DESC']],
          as: 'updates',
          required: true,
          separate: true,
          include: [
            {
              model: User,
              as: 'criador_update',
              required: false,
              attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'nome', 'path', 'url'],
                },
              ],
            },
            {
              model: TicketsUpdatesFormatados,
              as: 'update_formatado',
              required: false,
            },
            {
              model: TicketsUpdatesFile,
              as: 'anexos_update',
              required: false,
            },
          ],
        },
      ],
    });

    const usuario = await User.findByPk(req.params.id, {
      attributes: ['nome', 'sobrenome'],
    });

    return res.json({ tickets, usuario });
  }

  async get_sent(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const ticket = await Ticket.findOne({
      where: {
        [Op.and]: [
          {
            id: req.params.id,
          },
          {
            id_usuario: req.idUsuario,
          },
        ],
      },
      include: [
        {
          model: User,
          as: 'criador',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
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
          as: 'destinatario',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFormatado,
          as: 'formatado',
          required: false,
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: TicketsUpdates,
          order: [['createdAt', 'DESC']],
          as: 'updates',
          required: true,
          separate: true,
          include: [
            {
              model: User,
              as: 'criador_update',
              required: false,
              attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'nome', 'path', 'url'],
                },
              ],
            },
            {
              model: TicketsUpdatesFormatados,
              as: 'update_formatado',
              required: false,
            },
            {
              model: TicketsUpdatesFile,
              as: 'anexos_update',
              required: false,
            },
          ],
        },
      ],
    });
    if (ticket) {
      return res.json(ticket);
    }
    return res.status(401).json({
      message: 'Não existe ticket com este número. Verifique.',
    });
  }

  async get_concluidos(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const ticket = await Ticket.findOne({
      where: {
        [Op.and]: [
          { id: req.params.id },
          {
            [Op.or]: [
              { id_usuario: req.idUsuario },
              { id_destinatario: req.idUsuario },
            ],
          },
          {
            [Op.or]: [{ status: 'F' }, { status: 'S' }],
          },
        ],
      },
      include: [
        {
          model: User,
          as: 'criador',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
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
          as: 'destinatario',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFormatado,
          as: 'formatado',
          required: false,
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: TicketsUpdates,
          order: [['createdAt', 'DESC']],
          as: 'updates',
          required: true,
          separate: true,
          include: [
            {
              model: User,
              as: 'criador_update',
              required: false,
              attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'nome', 'path', 'url'],
                },
              ],
            },
            {
              model: TicketsUpdatesFormatados,
              as: 'update_formatado',
              required: false,
            },
            {
              model: TicketsUpdatesFile,
              as: 'anexos_update',
              required: false,
            },
          ],
        },
      ],
    });
    if (ticket) {
      return res.json(ticket);
    }
    return res.status(401).json({
      message: 'Não existe ticket com este número. Verifique.',
    });
  }

  async concluidos(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const idGrupos = await GrupoUserTicket.findAll({
      where: {
        [Op.and]: [{ id_usuario: req.idUsuario }, { nivel: { [Op.gte]: 3 } }],
      },
      attributes: ['id_grupo'],
    });

    const ids = [];
    idGrupos.forEach((idg) => {
      ids.push(idg.id_grupo);
    });

    // Verificar se o usuário que está solicitando é gestor do usuário solicitado

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      where: { id: ids },
      include: [
        {
          where: {
            id_usuario: req.params.id,
          },
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
        },
      ],
    });

    if (grupos.length === 0) {
      return res.json({ error: 'Não tem acesso' });
    }

    const { page = 1 } = req.query;
    const registrosPorPagina = 20;

    const quantidade = await Ticket.count({
      where: {
        [Op.and]: [
          { id_usuario: req.params.id },
          { [Op.or]: [{ status: 'F' }, { status: 'S' }] },
        ],
      },
    });
    res.header('X-Total-Count', quantidade);

    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: [
          { id_usuario: req.params.id },

          { [Op.or]: [{ status: 'F' }, { status: 'S' }] },
        ],
      },
      limit: registrosPorPagina,
      offset: (page - 1) * registrosPorPagina,
      include: [
        {
          model: AvaliacaoTicket,
          as: 'avaliacao',
        },
        {
          model: User,
          as: 'destinatario',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: EncerramentoTicket,
          separate: true,
          as: 'encerramentos',
          order: [['createdAt', 'DESC']],
        },
      ],
    });

    const usuario = await User.findByPk(req.params.id, {
      attributes: ['nome', 'sobrenome'],
    });

    return res.header('X-Total-Count', quantidade).json({ tickets, usuario });
  }

  async concluidos_filtro(req, res) {
    const {
      page = 1,
      busca = '',
      assunto = 'f',
      corpo = 'f',
      cat = 'f',
      subcat = 'f',
    } = req.query;

    const registrosPorPagina = 20;

    const quantidade = await Ticket.count({
      where: {
        [Op.and]: [
          { id_usuario: req.params.id },
          { [Op.or]: [{ status: 'F' }, { status: 'S' }] },
          {
            [Op.or]: [
              {
                assunto: {
                  [Op.like]: `%${assunto === 't' ? busca : ''}%`,
                },
              },
              {
                texto: {
                  [Op.like]: `%${corpo === 't' ? busca : ''}%`,
                },
              },
              {
                categoria: {
                  [Op.like]: `%${cat === 't' ? busca : ''}%`,
                },
              },
              {
                subcategoria: {
                  [Op.like]: `%${subcat === 't' ? busca : ''}%`,
                },
              },
            ],
          },
        ],
      },
      include: [
        {
          model: User,
          as: 'destinatario',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
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
    res.header('X-Total-Count', quantidade);

    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: [
          { id_usuario: req.params.id },

          { [Op.or]: [{ status: 'F' }, { status: 'S' }] },
          {
            [Op.or]: [
              assunto === 't' && {
                assunto: {
                  [Op.like]: `%${busca}%`,
                },
              },
              corpo === 't' && {
                texto: {
                  [Op.like]: `%${busca}%`,
                },
              },
              cat === 't' && {
                categoria: {
                  [Op.like]: `%${busca}%`,
                },
              },
              subcat === 't' && {
                subcategoria: {
                  [Op.like]: `%${busca}%`,
                },
              },
            ],
          },
        ],
      },
      limit: registrosPorPagina,
      offset: (page - 1) * registrosPorPagina,
      include: [
        {
          model: AvaliacaoTicket,
          as: 'avaliacao',
        },
        {
          model: User,
          as: 'destinatario',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: EncerramentoTicket,
          separate: true,
          as: 'encerramentos',
          order: [['createdAt', 'DESC']],
        },
      ],
    });
    const usuario = await User.findByPk(req.params.id, {
      attributes: ['nome', 'sobrenome'],
    });

    return res.header('X-Total-Count', quantidade).json({ tickets, usuario });
  }

  async historico(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const idGrupos = await GrupoUserTicket.findAll({
      where: {
        [Op.and]: [{ id_usuario: req.idUsuario }, { nivel: { [Op.gte]: 3 } }],
      },
      attributes: ['id_grupo'],
    });

    const ids = [];
    idGrupos.forEach((idg) => {
      ids.push(idg.id_grupo);
    });

    // Verificar se o usuário que está solicitando é gestor do usuário solicitado

    const grupos = await TicketsGrupos.findAll({
      attributes: ['id', 'nome', 'descricao'],
      where: { id: ids },
      include: [
        {
          where: {
            id_usuario: req.params.id,
          },
          model: GrupoUserTicket,
          as: 'componentes',
          attributes: ['nivel'],
          required: false,
        },
      ],
    });

    if (grupos.length === 0) {
      return res.json({ error: 'Não tem acesso' });
    }

    const { page = 1 } = req.query;
    const registrosPorPagina = 20;

    const quantidade = await Ticket.count({
      where: {
        [Op.and]: [
          { id_destinatario: req.params.id },
          { [Op.or]: [{ status: 'F' }, { status: 'S' }] },
        ],
      },
    });

    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: [
          { id_destinatario: req.params.id },

          { [Op.or]: [{ status: 'F' }, { status: 'S' }] },
        ],
      },
      limit: registrosPorPagina,
      offset: (page - 1) * registrosPorPagina,
      include: [
        {
          model: AvaliacaoTicket,
          as: 'avaliacao',
        },
        {
          model: User,
          as: 'criador',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: EncerramentoTicket,
          separate: true,
          as: 'encerramentos',
          order: [['createdAt', 'DESC']],
        },
      ],
    });

    const usuario = await User.findByPk(req.params.id, {
      attributes: ['nome', 'sobrenome'],
    });

    return res.header('X-Total-Count', quantidade).json({ tickets, usuario });
  }

  async historico_filtro(req, res) {
    const {
      page = 1,
      busca = '',
      assunto = 'f',
      corpo = 'f',
      cat = 'f',
      subcat = 'f',
    } = req.query;

    const registrosPorPagina = 20;

    const quantidade = await Ticket.count({
      where: {
        [Op.and]: [
          { id_destinatario: req.params.id },
          { [Op.or]: [{ status: 'F' }, { status: 'S' }] },
          {
            [Op.or]: [
              {
                assunto: {
                  [Op.like]: `%${assunto === 't' ? busca : ''}%`,
                },
              },
              {
                texto: {
                  [Op.like]: `%${corpo === 't' ? busca : ''}%`,
                },
              },
              {
                categoria: {
                  [Op.like]: `%${cat === 't' ? busca : ''}%`,
                },
              },
              {
                subcategoria: {
                  [Op.like]: `%${subcat === 't' ? busca : ''}%`,
                },
              },
            ],
          },
        ],
      },
      include: [
        {
          model: User,
          as: 'criador',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
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

    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: [
          { id_destinatario: req.params.id },

          { [Op.or]: [{ status: 'F' }, { status: 'S' }] },
          {
            [Op.or]: [
              assunto === 't' && {
                assunto: {
                  [Op.like]: `%${busca}%`,
                },
              },
              corpo === 't' && {
                texto: {
                  [Op.like]: `%${busca}%`,
                },
              },
              cat === 't' && {
                categoria: {
                  [Op.like]: `%${busca}%`,
                },
              },
              subcat === 't' && {
                subcategoria: {
                  [Op.like]: `%${busca}%`,
                },
              },
            ],
          },
        ],
      },
      limit: registrosPorPagina,
      offset: (page - 1) * registrosPorPagina,
      include: [
        {
          model: AvaliacaoTicket,
          as: 'avaliacao',
        },
        {
          model: User,
          as: 'criador',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: EncerramentoTicket,
          separate: true,
          as: 'encerramentos',
          order: [['createdAt', 'DESC']],
        },
      ],
    });

    return res.header('X-Total-Count', quantidade).json(tickets);
  }
}

export default new UserTicketsController();
